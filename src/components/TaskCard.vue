<script setup lang="ts">
// Purpose: Display a card
import { type Card } from '@/types';

defineProps<{
  card: Card;
}>();

const calculateDaysLeft = (dueDate: Date): number => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  return isNaN(dueDateObj.getTime()) ? 0 : Math.ceil((dueDateObj.getTime() - today.getTime()) / (1000 * 3600 * 24));
};

const dueDateClass = (dueDate: Date) => {
  const daysLeft = calculateDaysLeft(dueDate);
  if (daysLeft >= 10) return 'text-green-500';
  if (daysLeft >= 5) return 'text-yellow-500';
  return 'text-red-500';
};
</script>

<template>
  <div
    class="bg-white p-2 my-2 rounded shadow cursor-pointer"
    @click="$emit('click')"
  >
    <span class="text-sm font-medium">{{ card.title }}</span>
    <p class="text-xs" :class="dueDateClass(card.date)">
      <span>{{ calculateDaysLeft(card.date) < 0 ? 'Overdue' : 'Due Date:' }}</span>
      {{ new Date(card.date).toLocaleDateString() }}
    </p>
    <p class="text-xs text-gray-400">{{ card.description }}</p>
  </div>
</template>
