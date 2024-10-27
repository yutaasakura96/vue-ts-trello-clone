<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { useModal } from '@/composables/useModal';
import { useListModal } from '@/composables/useListModal';
import { useLists } from '@/composables/useLists';
import Draggable from 'vuedraggable';
import ListCard from '@/components/ListCard.vue';
import ModalDialogue from '@/components/ModalDialogue.vue';
import AddListCard from '@/components/AddListCard.vue';
import ListModalDialogue from './components/ListModalDialogue.vue';

// Initialize dark mode composables
// const isDark = useDark(); // reactive variable for dark mode status
const isDark = useDark({
  selector: 'body', // Apply dark mode to the body instead of html
  attribute: 'color-scheme', // Custom attribute name
  valueDark: 'dark', // Dark mode attribute value
  valueLight: 'light' // Light mode attribute value
});
const toggleDark = useToggle(isDark); // toggle function for switching modes

const { lists } = useLists();
const { isModalOpen, editingCard, modalMode, openModal, closeModal, saveCard, deleteCard } =
  useModal(lists);
const {
  isListModalOpen,
  listModalMode,
  showListModal,
  hideListModal,
  saveList,
  currentList,
  editList,
  deleteList
} = useListModal();
</script>

<template>
  <main :class="{ dark: isDark }" class="p-5 font-sans">
    <button
      @click="() => toggleDark()"
      class="mode-button mb-5 px-4 py-2 rounded-md border text-xl hover:bg-gray-100 active:translate-y-2 transition-transform"
    >
      {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>
    <div class="flex gap-5 py-5 overflow-x-auto">
      <Draggable v-model="lists" group="lists" item-key="id" class="flex gap-5 cursor-pointer">
        <template #item="{ element, index }">
          <ListCard
            :key="element.id"
            :list="element"
            :listIndex="index"
            :openModal="openModal"
            @show-modal="editList"
            class="list-card"
          />
        </template>
      </Draggable>

      <AddListCard @show-modal="showListModal" class="add-list-card" />
    </div>

    <ModalDialogue
      :is-open="isModalOpen"
      :card="editingCard"
      :mode="modalMode"
      :lists="lists"
      @close="closeModal"
      @save="saveCard($event)"
      @delete="deleteCard($event)"
    />

    <ListModalDialogue
      :is-open="isListModalOpen"
      :list="currentList"
      :mode="listModalMode"
      @close="hideListModal"
      @save="saveList($event)"
      @delete="deleteList($event)"
    />
  </main>
</template>

<style>
/* Default dark mode for body-based configuration */

body[color-scheme='dark'] {
  background-color: #1b2431;
}

body[color-scheme='dark'] .list-card,
body[color-scheme='dark'] .add-list-card {
  background-color: #273142;
}

body[color-scheme='dark'] .task-card {
  background-color: #374151;
  color: #f3f4f6;
}

body[color-scheme='dark'] button {
  background-color: #374151;
  color: #f3f4f6;
}

body[color-scheme='dark'] button:active {
  color: #1b2431;
  border: #1b2431;
}

body[color-scheme='dark'] .mode-button {
  color: #f3f4f6;
  border: none;
}

body[color-scheme='dark'] .mode-button:hover {
  color: #1b2431;
  background-color: #f3f4f6;
}

/* Add other custom dark/light mode styles as needed */
</style>
