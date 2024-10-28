// Purpose: Composable function to handle the list modal.
import { ref, computed, watch } from 'vue';
import { useLists } from './useLists';
import { useFuse } from '@vueuse/integrations/useFuse';
import type { List } from '@/types';

// Move reactive variables outside the function to share state
const { lists } = useLists();
const isListModalOpen = ref(false);
const currentList = ref<List | null>(null);
const listModalMode = computed(() => (currentList.value === null ? 'add' : 'edit'));

// Fuzzy search setup with useFuse
const searchQuery = ref('');
const { results: searchResults } = useFuse(searchQuery, lists, {
  fuseOptions: {
    keys: ['title', 'cards.title', 'cards.description'],
    threshold: 0.3
  }
});
// Validation errors
const validationErrors = ref({
  title: ''
});

export function useListModal() {
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
  const validateListForm = (list: List) => {
    validationErrors.value.title = list.title ? '' : 'Title is required';
    return !validationErrors.value.title;
  };

  const showListModal = (list?: List) => {
    currentList.value = list ? { ...list } : null;
    isListModalOpen.value = true;
    validationErrors.value = { title: '' };
  };

  const hideListModal = () => {
    isListModalOpen.value = false;
    currentList.value = null;
    validationErrors.value = { title: '' };
  };

  // Save List function, handles both 'add' and 'edit' modes
  const saveList = (list: List) => {
    if (!validateListForm(list)) return;

    if (listModalMode.value === 'add') {
      const newId = lists.length ? Math.max(...lists.map(l => l.id)) + 1 : 1;
      const newList = {
        ...list,
        id: newId,
        cards: []
      };
      lists.push(newList);
    } else {
      const listIndex = lists.findIndex(l => l.id === list.id);
      if (listIndex !== -1) {
        lists[listIndex] = { ...list };
      }
    }

    saveListsToLocalStorage(); // Save to local storage
    hideListModal();
  };

  const deleteList = (listId: number) => {
    // Filter out the list by its ID and update the reactive `lists` array
    lists.splice(0, lists.length, ...lists.filter((list: List) => list.id !== listId));

    saveListsToLocalStorage();
    hideListModal();
  };

  // Watch for changes to lists and save to local storage automatically
  watch(lists, saveListsToLocalStorage, { deep: true });

  // Initialize by loading lists from local storage
  loadLists();

  // Method to open the modal in edit mode
  const editList = (list: List) => {
    showListModal(list);
  };

  return {
    isListModalOpen,
    currentList,
    listModalMode,
    showListModal,
    hideListModal,
    saveList,
    deleteList,
    validationErrors,
    validateListForm,
    editList,
    searchResults,
    searchQuery
  };
}
