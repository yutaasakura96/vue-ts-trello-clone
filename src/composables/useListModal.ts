// Purpose: Composable function to handle the list modal.
import { ref, computed, watch } from 'vue';
import { useLists } from './useLists';
import { useFuse } from '@vueuse/integrations/useFuse';
import type { List } from '@/types';

// Access shared list state and initialize modal and search states
const { lists } = useLists();
const isListModalOpen = ref(false);
const currentList = ref<List | null>(null);
const listModalMode = computed(() => (currentList.value === null ? 'add' : 'edit'));

// Set up fuzzy search with Fuse.js for filtering lists and cards by title or description
const searchQuery = ref('');
const { results: searchResults } = useFuse(searchQuery, lists, {
  fuseOptions: {
    keys: ['title', 'cards.title', 'cards.description'],
    threshold: 0.3
  }
});

// Validation error tracking
const validationErrors = ref({
  title: ''
});

export function useListModal() {
  // Load lists from local storage
  const loadLists = () => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      lists.splice(0, lists.length, ...JSON.parse(storedLists));
    }
  };

  // Save lists to local storage
  const saveListsToLocalStorage = () => {
    localStorage.setItem('lists', JSON.stringify(lists));
  };

  // Validate list title (required field)
  const validateListForm = (list: List) => {
    validationErrors.value.title = list.title ? '' : 'Title is required';
    return !validationErrors.value.title;
  };

  // Show and hide modal with optional list for editing
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

  // Save new or edited list and close modal
  const saveList = (list: List) => {
    if (!validateListForm(list)) return;

    if (listModalMode.value === 'add') {
      const newId = lists.length ? Math.max(...lists.map(l => l.id)) + 1 : 1;
      lists.push({ ...list, id: newId, cards: [] });
    } else {
      const listIndex = lists.findIndex(l => l.id === list.id);
      if (listIndex !== -1) lists[listIndex] = { ...list };
    }

    saveListsToLocalStorage();
    hideListModal();
  };

  // Delete list by ID and close modal
  const deleteList = (listId: number) => {
    lists.splice(0, lists.length, ...lists.filter(list => list.id !== listId));
    saveListsToLocalStorage();
    hideListModal();
  };

  // Watch for changes to lists and save automatically
  watch(lists, saveListsToLocalStorage, { deep: true });

  // Load lists from storage on initialization
  loadLists();

  // Return all functions and reactive values
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
    editList: showListModal,
    searchResults,
    searchQuery
  };
}
