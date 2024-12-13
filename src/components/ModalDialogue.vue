<script lang="ts" setup>
// Purpose: Display a modal dialogue for adding or editing a card

import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { useModal } from '@/composables/useModal';
import type { Card, List } from '@/types';

// Define component props and emit events
const props = defineProps<{
  isOpen: boolean;
  card: Card | null;
  mode: 'add' | 'edit';
  lists: List[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', card: Card): void;
  (e: 'delete', cardId: number): void;
}>();

// Import validation and modal control functions from useModal
const { errors, validateForm, closeModal } = useModal(props.lists);

// Refs for modal elements and card data
const titleInput = ref<HTMLInputElement | null>(null);
const modalElement = ref<HTMLDivElement | null>(null);
const today = new Date();
const minDate = today.toISOString().split('T')[0];
const localCard = ref<Card>({
  id: 0,
  title: '',
  description: '',
  date: new Date(),
  tag: '',
  tagColor: '',
  priority: 'Low'
});

// Initialize focus trap for accessibility, activated when modal opens
const { activate, deactivate } = useFocusTrap(modalElement);

// Watch for changes in `props.card` to update `localCard`
watch(
  () => props.card,
  newCard => {
    localCard.value = newCard ? { ...newCard } : {
      id: 0,
      title: '',
      description: '',
      date: new Date(),
      tag: '',
      priority: 'Low',
      tagColor: '#000000'
    };
  },
  { immediate: true }
);

// Watch `isOpen` to control modal visibility, focusing title input when opened
watch(
  () => props.isOpen,
  async isOpen => {
    if (isOpen) {
      await nextTick();
      activate();
      titleInput.value?.focus();
    } else {
      deactivate();
      closeModal();
    }
  }
);

// Clear validation errors when title or description changes
watch(
  [() => localCard.value.title, () => localCard.value.description],
  ([newTitle, newDescription]) => {
    if (newTitle) errors.value.title = '';
    if (newDescription) errors.value.description = '';
  }
);

// Save card after validation
const handleSave = () => {
  if (validateForm(localCard.value)) {
    emit('save', localCard.value);
  }
};

// Emit delete event for the card
const handleDelete = () => {
  if (localCard.value.id) {
    emit('delete', localCard.value.id);
  }
};
</script>

<template>
  <!-- Modal container, closes on Esc key or background click -->
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
      <!-- Modal header with title and delete button (only in edit mode) -->
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold mb-4">
          {{ mode === 'add' ? 'Add New Card' : 'Edit Card' }}
        </h2>

        <button
          v-if="mode === 'edit'"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          @click="handleDelete"
        >
          Delete
        </button>
      </div>

      <!-- Card title input with validation error display -->
      <label for="titleInput" class="block mb-2 font-medium">Card Title</label>
      <input
        id="titleInput"
        v-model="localCard.title"
        type="text"
        aria-label="Card Title"
        class="w-full p-2 mb-1 border rounded"
        ref="titleInput"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mb-1">{{ errors.title }}</p>

      <!-- Card description input with validation error display -->
      <label for="descriptionTextarea" class="block mb-2 font-medium">Description</label>
      <textarea
        id="descriptionTextarea"
        v-model="localCard.description"
        class="w-full p-2 mb-1 border rounded"
        aria-label="Card Description"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm mb-1">{{ errors.description }}</p>

      <!-- Priority selection -->
      <label for="prioritySelect" class="block mb-2 font-medium">Priority</label>
      <select id="prioritySelect" v-model="localCard.priority" class="p-2 mb-4 border rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <!-- Card tag input and color selection -->
      <label for="tagInput" class="block mb-2 font-medium">Card Tag</label>
      <input
        id="tagInput"
        v-model="localCard.tag"
        type="text"
        aria-label="Card Tag"
        class="w-3/4 p-2 mb-4 border rounded"
      />

      <label for="tagColorInput" class="block mb-2 font-medium">Card Tag Color</label>
      <input
        id="tagColorInput"
        v-model="localCard.tagColor"
        type="color"
        aria-label="Card Color"
        class="w-1/4 mb-4 border rounded"
      />

      <!-- Due date selection with minimum date set to today -->
      <label for="dateInput" class="block mb-2 font-medium">Due Date</label>
      <input
        id="dateInput"
        type="date"
        v-model="localCard.date"
        :min="minDate"
        aria-label="Due Date"
        class="border rounded p-2"
      />

      <!-- Action buttons: Cancel and Save -->
      <div class="flex justify-end gap-2">
        <button
          class="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          :disabled="!!errors.title || !!errors.description"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          @click="handleSave"
        >
          {{ mode === 'add' ? 'Add' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
