<template>
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <ListCard
        v-for="(list, listIndex) in lists"
        :key="list.id"
        :list="list"
        :listIndex="listIndex"
        :openModal="openModal"
      />

      <AddListCard />
    </div>

    <ModalDialogue
      :is-open="isModalOpen"
      :card="editingCard"
      :mode="modalMode"
      :lists="lists"
      @close="closeModal"
      @save="saveCard($event)"
    />
  </main>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal';
import { useLists } from '@/composables/useLists';
import ListCard from '@/components/ListCard.vue';
import ModalDialogue from '@/components/ModalDialogue.vue';
import AddListCard from '@/components/AddListCard.vue';

// Use the lists and modal composables
const { lists } = useLists();
const { isModalOpen, editingCard, modalMode, openModal, closeModal, saveCard } = useModal(lists);
</script>
