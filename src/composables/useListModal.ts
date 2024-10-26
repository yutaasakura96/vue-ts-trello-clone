import { ref, computed } from 'vue';
import { useLists } from './useLists';
import type { List } from '@/types';

export function useListModal() {
  const { lists } = useLists();
  const isListModalOpen = ref(false);
  const currentList = ref<List | null>(null);
  const listModalMode = computed(() => (currentList.value === null ? 'add' : 'edit'));

  // Validation errors
  const validationErrors = ref({
    title: ''
  });

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

    hideListModal();
  };

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
    validationErrors,
    validateListForm,
    editList
  };
}
