<script setup lang="ts">
// Purpose: Display a list of cards
import Draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';
import { computed, defineEmits } from 'vue';
import { type List, type Card } from '@/types';

defineEmits<{
  (e: 'show-modal', list: List): void;
}>();

const props = defineProps<{
  list: List;
  listIndex: number;
  openModal: (listIndex: number, card?: Card) => void;
}>();

const cardCount = computed(() => props.list.cards.length);
</script>

<template>
  <div class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex flex-col">
    <div class="flex gap-5">
      <button @click="$emit('show-modal', list)" class="font-medium mb-2">{{ list.title }}:</button>
      <h2 v-show="cardCount > 0" class="font-medium mb-2">{{ cardCount }}</h2>
    </div>

    <Draggable :list="list.cards" group="cards" item-key="id">
      <template #item="{ element }">
        <TaskCard :card="element" @click="openModal(listIndex, element)" />
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
