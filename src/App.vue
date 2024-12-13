<script setup lang="ts">
// Import necessary utilities, components, and composables
import { computed } from 'vue';
import { useModal } from '@/composables/useModal';
import { useListModal } from '@/composables/useListModal';
import { useLists } from '@/composables/useLists';
import Draggable from 'vuedraggable';
import ListCard from '@/components/ListCard.vue';
import ModalDialogue from '@/components/ModalDialogue.vue';
import AddListCard from '@/components/AddListCard.vue';
import ListModalDialogue from './components/ListModalDialogue.vue';
import NavbarComponent from './components/NavbarComponent.vue';

// Access the lists, modals, and search functionality from composables
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
  deleteList,
  searchResults,
  searchQuery
} = useListModal();

// Dynamically compute the lists based on search results or default to all lists
const computedLists = computed(() =>
  searchResults.value.length ? searchResults.value.map(result => result.item) : lists
);
</script>

<template>
  <NavbarComponent class="navbar" />

  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 flex-col xl:flex-row overflow-x-auto">
      <!-- Toggle between draggable and non-draggable lists based on search -->
      <template v-if="!searchQuery">
        <!-- Draggable list view when no search query is active -->
        <Draggable
          v-model="lists"
          group="lists"
          item-key="id"
          class="flex gap-5 flex-col xl:flex-row cursor-pointer"
        >
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
      </template>
      <template v-else>
        <!-- Display non-draggable list cards during search -->
        <div class="flex gap-5 flex-col xl:flex-row cursor-pointer">
          <ListCard
            v-for="(element, index) in computedLists"
            :key="element.id"
            :list="element"
            :listIndex="index"
            :openModal="openModal"
            @show-modal="editList"
            class="list-card"
          />
        </div>
      </template>

      <!-- Button to add a new list card, triggers showListModal -->
      <AddListCard @show-modal="showListModal" class="add-list-card" />
    </div>

    <!-- Modal for adding or editing a card within a list -->
    <ModalDialogue
      :is-open="isModalOpen"
      :card="editingCard"
      :mode="modalMode"
      :lists="lists"
      @close="closeModal"
      @save="saveCard($event)"
      @delete="deleteCard($event)"
    />

    <!-- Modal for adding or editing a list -->
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
/* Dark mode styles for components */

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
  background-color: #273142;
  color: #f3f4f6;
}

body[color-scheme='dark'] button:active {
  color: #1b2431;
  border: #1b2431;
}

body[color-scheme='dark'] .navbar {
  background-color: #273142;
}

body[color-scheme='dark'] .navbar span {
  color: #f3f4f6;
}

body[color-scheme='dark'] .navbar button {
  background-color: #374151;
  color: #f3f4f6;
  border: none;
}

body[color-scheme='dark'] .navbar button:hover {
  color: #1b2431;
  background-color: #f3f4f6;
}

body[color-scheme='dark'] .navbar input {
  color: #f3f4f6;
  background-color: #374151;
}

/* Additional custom dark/light mode styles as needed */
</style>
