// purpose: Composable function to handle list modal
import { ref, computed } from 'vue';
import { type List } from '@/types';

export function useListModal() {
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
    currentList.value = list ?? null;
    isListModalOpen.value = true;
    validationErrors.value = { title: '' };
  };

  const hideListModal = () => {
    isListModalOpen.value = false;
    currentList.value = null;
    validationErrors.value = { title: '' };
  };

  const saveList = (lists: List[], list: List) => {
    if (!validateListForm(list)) return;

    if (listModalMode.value === 'add') {
      const newId = lists.length ? Math.max(...lists.map(l => l.id)) + 1 : 1;
      lists.push({ ...list, id: newId });
    } else {
      const listIndex = lists.findIndex(l => l.id === list.id);
      if (listIndex !== -1) lists[listIndex] = list;
    }

    hideListModal();
  };

  return {
    isListModalOpen,
    currentList,
    listModalMode,
    showListModal,
    hideListModal,
    saveList,
    validationErrors,
    validateListForm
  };
}
