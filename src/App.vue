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
    </div>

    <ModalDialogue
      :is-open="isModalOpen"
      :card="editingCard"
      :mode="modalMode"
      @close="closeModal"
      @save="saveCard"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import ListCard from '@/components/ListCard.vue';
import ModalDialogue from '@/components/ModalDialogue.vue';
import { type Card, type List } from '@/types';

// Modal state and functions
const isModalOpen = ref(false);
const editingCard = ref<Card | null>(null);
const editingListIndex = ref<number | null>(null);
const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'));

const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex;
  editingCard.value = card ?? null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingListIndex.value = null;
  editingCard.value = null;
};

const saveCard = (card: Card) => {
  if (editingListIndex.value === null) return;

  const list = lists[editingListIndex.value];
  if (modalMode.value === 'add') {
    const newId = Math.max(...lists.flatMap(list => list.cards.map(c => c.id))) + 1;
    list.cards.push({ ...card, id: newId });
  } else {
    const cardIndex = list.cards.findIndex(c => c.id === card.id);
    if (cardIndex !== -1) list.cards[cardIndex] = card;
  }
  closeModal();
};

// Default data for the lists
const getRandomDate = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + Math.floor(Math.random() * 15)));
};

const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, title: 'Task 1', description: 'Description for Task 1', date: getRandomDate() },
      { id: 2, title: 'Task 2', description: 'Description for Task 2', date: getRandomDate() }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      { id: 3, title: 'Task 3', description: 'Description for Task 3', date: getRandomDate() },
      { id: 4, title: 'Task 4', description: 'Description for Task 4', date: getRandomDate() }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      { id: 5, title: 'Task 5', description: 'Description for Task 5', date: getRandomDate() }
    ]
  }
]);
</script>
