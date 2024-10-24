<template>
  <div class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex justify-center items-center">
    <button
      class="w-full bg-transparent rounded hover:bg-white text-gray-500 p-2 text-center mt-2 text-lg font-medium"
    >
      + Add New List
    </button>
  </div>
</template>

<script setup lang="ts">
// Purpose: Display a list of cards
import { type List, type Card } from '@/types';

const props = defineProps<{
  list: List;
  listIndex: number;
  openModal: (listIndex: number, card?: Card) => void;
}>();
</script>
