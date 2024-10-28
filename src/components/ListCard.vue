<script setup lang="ts">
// Purpose: Display a list of cards with functionality to add and edit cards

import Draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';
import { computed, defineEmits } from 'vue';
import { type List, type Card } from '@/types';

// Define emit event for showing the modal with the selected list
defineEmits<{
  (e: 'show-modal', list: List): void;
}>();

// Define component props for the list, list index, and modal opening function
const props = defineProps<{
  list: List;
  listIndex: number;
  openModal: (listIndex: number, card?: Card) => void;
}>();

// Compute the count of cards in the current list
const cardCount = computed(() => props.list.cards.length);
</script>

<template>
  <!-- Container for the list card -->
  <div
    :style="{ backgroundColor: props.list.color || '' }"
    class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex flex-col hover:translate-y-[-3px] transform transition-transform"
  >
    <!-- Button to show modal for editing the list title -->
    <button
      @click="$emit('show-modal', list)"
      class="flex gap-5 items-center text-black hover:bg-white hover:text-gray-500 bg-transparent rounded-md py-1 px-2 w-max"
    >
      <h2 class="font-medium mb-2">{{ list.title }}:</h2>
      <!-- Display card count if there are any cards -->
      <h2 v-show="cardCount > 0" class="font-medium mb-2">{{ cardCount }}</h2>
    </button>

    <!-- Draggable list of task cards -->
    <Draggable :list="list.cards" group="cards" item-key="id">
      <template #item="{ element }">
        <TaskCard :card="element" @click="openModal(listIndex, element)" />
      </template>
    </Draggable>

    <!-- Button to add a new card to the list -->
    <button
      class="w-full bg-transparent rounded hover:bg-white hover:text-gray-500 text-gray-500 p-2 text-left mt-2 text-sm font-medium"
      @click="openModal(listIndex)"
    >
      + Add Card
    </button>
  </div>
</template>
