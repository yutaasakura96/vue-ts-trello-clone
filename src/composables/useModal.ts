import { ref, computed, watch } from 'vue';
import { type Card, type List } from '@/types';

export function useModal(lists: List[]) {
  const isModalOpen = ref(false);
  const editingCard = ref<Card | null>(null);
  const editingListIndex = ref<number | null>(null);
  const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'));

  // Validation errors
  const errors = ref({
    title: '',
    description: ''
  });

  // Load lists from local storage
  const loadLists = () => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      const parsedLists = JSON.parse(storedLists);
      lists.length = 0;
      lists.push(...parsedLists);
    }
  };

  // Save lists to local storage
  const saveListsToLocalStorage = () => {
    localStorage.setItem('lists', JSON.stringify(lists));
  };

  // Form validation function
  const validateForm = (card: Card) => {
    errors.value.title = card.title ? '' : 'Title is required';
    errors.value.description = card.description ? '' : 'Description is required';

    return !errors.value.title && !errors.value.description;
  };

  const openModal = (listIndex: number, card?: Card) => {
    editingListIndex.value = listIndex;
    editingCard.value = card ?? null;
    isModalOpen.value = true;
    errors.value = { title: '', description: '' };
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingListIndex.value = null;
    editingCard.value = null;
    errors.value = { title: '', description: '' };
  };

  const saveCard = (card: Card) => {
    if (editingListIndex.value === null || !validateForm(card)) return;

    const list = lists[editingListIndex.value];

    if (modalMode.value === 'add') {
      const newId = Math.max(...lists.flatMap(list => list.cards.map(c => c.id))) + 1;
      list.cards.push({ ...card, id: newId });
    } else {
      const cardIndex = list.cards.findIndex(c => c.id === card.id);
      if (cardIndex !== -1) list.cards[cardIndex] = card;
    }

    saveListsToLocalStorage(); 
    closeModal();
  };

  const deleteCard = (cardId: number) => {
    if (editingListIndex.value === null) return;

    const list = lists[editingListIndex.value];
    list.cards = list.cards.filter(card => card.id !== cardId);

    saveListsToLocalStorage();
    closeModal();
  };

  // Watch for changes to lists and save to local storage automatically
  watch(lists, saveListsToLocalStorage, { deep: true });

  // Initialize by loading lists from local storage
  loadLists();

  return {
    isModalOpen,
    editingCard,
    editingListIndex,
    modalMode,
    openModal,
    closeModal,
    saveCard,
    deleteCard,
    errors,
    validateForm
  };
}
