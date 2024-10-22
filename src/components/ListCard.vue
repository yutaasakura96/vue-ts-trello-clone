<template>
  <div class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex flex-col">
    <h2 class="font-medium mb-2">{{ list.title }}</h2>

    <Draggable :list="list.cards" group="cards" item-key="id">
      <template #item="{ element }">
        <CardComponent
          :card="element"
          @click="openModal(listIndex, element)"
        />
      </template>
    </Draggable>

    <button
      class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-left mt-2 text-sm font-medium"
      @click="openModal(listIndex)"
    >
      + Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
// Purpose: Display a list of cards
import Draggable from 'vuedraggable';
import CardComponent from '@/components/TaskCard.vue';
import { type List, type Card } from '@/types';

defineProps<{
  list: List;
  listIndex: number;
  openModal: (listIndex: number, card?: Card) => void;
}>();
</script>
