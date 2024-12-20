// Purpose: Composable function to manage lists.
import { reactive } from 'vue';
import type { List } from '@/types';

const getRandomDate = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + Math.floor(Math.random() * 15)));
};

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let tagColor = '#';
  for (let i = 0; i < 6; i++) {
    tagColor += letters[Math.floor(Math.random() * 16)];
  }
  return tagColor;
}

// Define lists outside of the useLists function to create a singleton instance
const lists = reactive<List[]>([
  {
    id: 1,
    title: 'To Do',
    color: '',
    cards: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        date: getRandomDate(),
        tag: 'work',
        priority: 'High',
        tagColor: getRandomColor(),
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        date: getRandomDate(),
        tag: 'personal',
        priority: 'Medium',
        tagColor: getRandomColor(),
      },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    color: '',
    cards: [
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        date: getRandomDate(),
        tag: 'work',
        priority: 'Low',
        tagColor: getRandomColor(),
      },
      {
        id: 4,
        title: 'Task 4',
        description: 'Description for Task 4',
        date: getRandomDate(),
        tag: 'personal',
        priority: 'High',
        tagColor: getRandomColor(),
      },
    ],
  },
  {
    id: 3,
    title: 'Done',
    color: '',
    cards: [
      {
        id: 5,
        title: 'Task 5',
        description: 'Description for Task 5',
        date: getRandomDate(),
        tag: 'work',
        priority: 'Medium',
        tagColor: getRandomColor(),
      },
    ],
  },
]);

export function useLists() {
  return {
    lists,
  };
}
