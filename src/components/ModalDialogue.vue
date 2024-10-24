<script lang="ts" setup>
// Purpose: Display a modal dialogue for adding or editing a card
import { nextTick, ref, watch } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { Card } from '@/types';

const props = defineProps<{
  isOpen: boolean;
  card: Card | null;
  mode: 'add' | 'edit';
}>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', card: Card): void;
}>();

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

// Validation errors
const errors = ref({
  title: '',
  description: ''
});

// Validate form before saving
const validateForm = () => {
  errors.value.title = localCard.value.title ? '' : 'Title is required';
  errors.value.description = localCard.value.description ? '' : 'Description is required';

  return !errors.value.title && !errors.value.description;
};

// Focus trap for accessibility
const { activate, deactivate } = useFocusTrap(modalElement);

watch(
  () => props.card,
  newCard => {
    if (newCard) {
      localCard.value = { ...newCard };
    } else {
      localCard.value = {
        id: 0,
        title: '',
        description: '',
        date: new Date(),
        tag: '',
        priority: 'Low',
        tagColor: '#000000'
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
    }
  }
);

// Save card with validation
const handleSave = () => {
  if (validateForm()) {
    emit('save', localCard.value);
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
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'add' ? 'Add New Card' : 'Edit Card' }}
      </h2>

      <label for="titleInput" class="block mb-2 font-medium">Card Title</label>
      <input
        id="titleInput"
        v-model="localCard.title"
        type="text"
        aria-label="Card Title"
        class="w-full p-2 mb-1 border rounded"
        ref="titleInput"
      />
      <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>

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

      <label for="prioritySelect" class="block mb-2 font-medium">Priority</label>
      <select id="prioritySelect" v-model="localCard.priority" class="p-2 mb-4 border rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label for="descriptionTextarea" class="block mb-2 font-medium">Description</label>
      <textarea
        id="descriptionTextarea"
        v-model="localCard.description"
        class="w-full p-2 mb-1 border rounded"
        aria-label="Card Description"
      ></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>

      <label for="dateInput" class="block mb-2 font-medium">Due Date</label>
      <input
        id="dateInput"
        type="date"
        v-model="localCard.date"
        :min="minDate"
        aria-label="Due Date"
        class="border rounded p-2"
      />

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
