// Purpose: Composable function to manage the modal state and actions.
import { ref, computed } from 'vue';
import { type Card, type List } from '@/types';

export function useModal(lists: List[]) {
  const isModalOpen = ref(false);
  const editingCard = ref<Card | null>(null);
  const editingListIndex = ref<number | null>(null);
  const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'));

  const openModal = (listIndex: number, card?: Card) => {
    editingListIndex.value = listIndex;
    editingCard.value = card ?? null;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    editingListIndex.value = null;
    editingCard.value = null;
  };

  const saveCard = (card: Card) => {
    if (editingListIndex.value === null) return;

    const list = lists[editingListIndex.value];
    if (modalMode.value === 'add') {
      const newId = Math.max(...lists.flatMap(list => list.cards.map(c => c.id))) + 1;
      list.cards.push({ ...card, id: newId });
    } else {
      const cardIndex = list.cards.findIndex(c => c.id === card.id);
      if (cardIndex !== -1) list.cards[cardIndex] = card;
    }
    closeModal();
  };

  return {
    isModalOpen,
    editingCard,
    editingListIndex,
    modalMode,
    openModal,
    closeModal,
    saveCard,
  };
}
