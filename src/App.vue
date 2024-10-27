<script setup lang="ts">
import { useModal } from '@/composables/useModal';
import { useListModal } from '@/composables/useListModal';
import { useLists } from '@/composables/useLists';
import ListCard from '@/components/ListCard.vue';
import ModalDialogue from '@/components/ModalDialogue.vue';
import AddListCard from '@/components/AddListCard.vue';
import ListModalDialogue from './components/ListModalDialogue.vue';

// Use the lists and modal composables
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
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <ListCard
        v-for="(list, listIndex) in lists"
        :key="list.id"
        :list="list"
        :listIndex="listIndex"
        :openModal="openModal"
        @show-modal="editList"
      />

      <AddListCard @show-modal="showListModal" />
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
