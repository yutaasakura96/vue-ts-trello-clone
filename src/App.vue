<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import Draggable from 'vuedraggable';
import ModalDialogue from '@/components/ModalDialogue.vue';
import { type Card, type List } from '@/types';

// Modal State
const isModalOpen = ref(false);
const editingCard = ref<Card | null>(null);
const editingListIndex = ref<number | null>(null);
const modalMode = computed(() => (editingCard.value === null ? 'add' : 'edit'));

// Modal Functions
const openModal = (listIndex: number, card?: Card) => {
  editingListIndex.value = listIndex;
  editingCard.value = card === undefined ? null : card;
  isModalOpen.value = true;
};
const saveCard = (card: Card) => {
  if (editingListIndex.value === null) {
    return;
  }
  if (modalMode.value === 'add') {
    // Adding
    const newId = Math.max(...lists.flatMap(list => list.cards.map(c => c.id))) + 1; // Increment newId by 1
    lists[editingListIndex.value].cards.push({ ...card, id: newId });
  } else {
    // Modify
    const cardIndex = lists[editingListIndex.value].cards.findIndex(
      cardOnList => cardOnList.id === card.id
    );
    if (cardIndex !== -1) {
      lists[editingListIndex.value].cards[cardIndex] = card;
    }
  }
  closeModal();
};

const closeModal = () => {
  isModalOpen.value = false;
  editingListIndex.value = null;
  editingCard.value = null;
};

// Due Date Color
const calculateDaysLeft = (dueDate: Date): number => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  if (isNaN(dueDateObj.getTime())) {
    return 0;
  }
  const timeDiff = dueDateObj.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const dueDateClass = (dueDate: Date) => {
  const daysLeft = calculateDaysLeft(dueDate);
  if (daysLeft >= 10) {
    return 'text-green-500';
  } else if (daysLeft >= 5 && daysLeft <= 9) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
};

const getRandomDate = () => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 15);
  return new Date(today.setDate(today.getDate() + randomDays));
};

// Default Data For The Lists
const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    cards: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        date: getRandomDate()
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        date: getRandomDate()
      }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    cards: [
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        date: getRandomDate()
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for Task 4',
        date: getRandomDate()
      }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for Task 5',
        date: getRandomDate()
      }
    ]
  }
]);
</script>

<template>
  <main class="p-5 font-sans">
    <div class="flex gap-5 py-5 overflow-x-auto">
      <div
        class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex flex-col"
        v-for="(list, listIndex) in lists"
        :key="list.id"
      >
        <h2 class="font-medium mb-2">{{ list.title }}</h2>

        <Draggable :list="list.cards" group="cards" item-key="id">
          <template #item="{ element }">
            <div
              @click="openModal(listIndex, element)"
              class="bg-white p-2 my-2 rounded shadow cursor-pointer"
            >
              <span class="text-sm font-medium">{{ element.title }}</span>
              <p class="text-xs" :class="dueDateClass(element.date)">
                <span>{{ calculateDaysLeft(element.date) < 0 ? 'Overdue' : 'Due Date:' }}</span>
                {{ new Date(element.date).toLocaleDateString() }}
              </p>
              <p class="text-xs text-gray-400">
                {{ element.description }}
              </p>
            </div>
          </template>
        </Draggable>

        <button
          class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium"
          @click="openModal(listIndex)"
        >
          + Add Card
        </button>
      </div>
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
