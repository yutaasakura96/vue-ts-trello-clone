<script lang="ts" setup>
// Purpose: Display a modal dialogue for adding or editing a list
import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { useListModal } from '@/composables/useListModal';
import type { List } from '@/types';

const props = defineProps<{
  isOpen: boolean;
  list: List | null;
  mode: 'add' | 'edit';
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', list: List): void;
  (e: 'delete', listId: number): void;
}>();

const { validationErrors, validateListForm, hideListModal } = useListModal();

const titleInput = ref<HTMLInputElement | null>(null);
const modalElement = ref<HTMLDivElement | null>(null);
const localList = ref<List>({
  id: 0,
  title: '',
  cards: [],
  color: ''
});

// Focus trap for accessibility
const { activate, deactivate } = useFocusTrap(modalElement);

watch(
  () => props.list,
  newList => {
    if (newList) {
      localList.value = { ...newList };
    } else {
      localList.value = {
        id: 0,
        title: '',
        cards: [],
        color: ''
      };
    }
  },
  { immediate: true }
);

watch(
  () => props.isOpen,
  async isOpen => {
    if (isOpen) {
      await nextTick();
      activate();
      titleInput.value?.focus();
    } else {
      deactivate();
      hideListModal();
    }
  }
);

watch([() => localList.value.title], ([newTitle]) => {
  if (newTitle) validationErrors.value.title = '';
});

const handleSave = () => {
  if (validateListForm(localList.value)) {
    emit('save', localList.value);
  }
};

const handleDelete = () => {
  if (localList.value.id) {
    emit('delete', localList.value.id);
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    @keydown.esc="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    ref="modalElement"
    @click.self="emit('close')"
  >
    <div class="bg-white p-5 rounded max-w-md w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold mb-4">
          {{ mode === 'add' ? 'Add New List' : 'Edit List' }}
        </h2>

        <button
          v-if="mode === 'edit'"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          @click="handleDelete()"
        >
          Delete
        </button>
      </div>
      <label for="titleInput" class="block mb-2 font-medium">List Title</label>
      <input
        id="titleInput"
        v-model="localList.title"
        type="text"
        aria-label="List Title"
        class="w-full p-2 mb-1 border rounded"
        ref="titleInput"
      />
      <p v-if="validationErrors.title" class="text-red-500 text-sm mb-1">
        {{ validationErrors.title }}
      </p>

      <label for="listColor" class="block mb-2 font-medium">List Color (Optional)</label>
      <div class="flex gap-2 mb-4">
        <button
          @click="localList.color = ''"
          class="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-black"
          :class="{ 'border-black': localList.color === null }"
          style="background-color: #f3f4f6"
        ></button>

        <button
          v-for="color in ['#FFCDD2', '#F8BBD0', '#D1C4E9', '#BBDEFB', '#C8E6C9']"
          :key="color"
          :style="{ backgroundColor: color }"
          class="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-black"
          @click="localList.color = color"
          :class="{ 'border-black': localList.color === color }"
        ></button>
      </div>

      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          :disabled="!!validationErrors.title"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          @click="handleSave()"
        >
          {{ mode === 'add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
