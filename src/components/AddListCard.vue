<script setup lang="ts">
// Purpose: Display a button to trigger the 'Add New List' modal

// Define the emit event for showing the modal
import { defineEmits } from 'vue';

defineEmits<{
  (e: 'show-modal'): void;
}>();
</script>

<template>
  <!-- Container for the add list button -->
  <div class="bg-gray-100 p-3 rounded-lg min-w-[250px] flex justify-center items-center">
    <!-- Button to add a new list; emits 'show-modal' event on click -->
    <button
      class="w-full bg-transparent rounded hover:bg-white hover:text-gray-500 text-gray-500 p-2 text-center mt-2 text-lg font-medium"
      @click="$emit('show-modal')"
    >
      + Add New List
    </button>
  </div>
</template>
