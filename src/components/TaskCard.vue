<script setup lang="ts">
// Purpose: Display a card with priority, due date, and tag styling

import { type Card } from '@/types';

// Define `card` prop
defineProps<{
  card: Card;
}>();

// Calculate days left until the due date
const calculateDaysLeft = (dueDate: Date): number => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  return isNaN(dueDateObj.getTime())
    ? 0
    : Math.ceil((dueDateObj.getTime() - today.getTime()) / (1000 * 3600 * 24));
};

// Apply different text colors based on days left until the due date
const dueDateClass = (dueDate: Date) => {
  const daysLeft = calculateDaysLeft(dueDate);
  if (daysLeft >= 10) return 'text-green-500'; // Safe time
  if (daysLeft >= 5) return 'text-yellow-500'; // Approaching due
  return 'text-red-500'; // Urgent or overdue
};

// Set background color based on priority level
const priorityClass = (priority: string) => {
  switch (priority) {
    case 'Low':
      return 'text-white bg-green-600';
    case 'Medium':
      return 'text-white bg-yellow-600';
    case 'High':
      return 'text-white bg-red-600';
    default:
      return 'text-white bg-gray-600';
  }
};

// Determine text color (black or white) for optimal contrast with background color
function getTextColor(backgroundColor: string) {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186 ? '#000000' : '#ffffff';
}
</script>

<template>
  <div
    class="task-card bg-white p-2 my-2 rounded shadow cursor-pointer hover:translate-y-[-3px] transform transition-transform"
    @click="$emit('click')"
  >
    <!-- Display priority badge with dynamic background color -->
    <div class="flex justify-between">
      <p class="text-xs w-max px-2 rounded-md mb-2" :class="priorityClass(card.priority)">
        Priority: {{ card.priority }}
      </p>

      <!-- Tag badge with dynamic text and background color -->
      <p
        class="text-xs w-max px-2 rounded-md mb-2"
        :style="{ backgroundColor: card.tagColor, color: getTextColor(card.tagColor) }"
      >
        {{ card.tag }}
      </p>
    </div>

    <!-- Card title -->
    <h3 class="text-sm font-medium">{{ card.title }}</h3>

    <!-- Due date display with color based on urgency -->
    <p class="text-xs mb-2" :class="dueDateClass(card.date)">
      <span>{{ calculateDaysLeft(card.date) < 0 ? 'Overdue' : 'Due Date:' }}</span>
      {{ new Date(card.date).toLocaleDateString() }}
    </p>

    <!-- Card description -->
    <p class="text-xs text-gray-400">{{ card.description }}</p>
  </div>
</template>
