// Purpose: Composable function to manage lists.
import { reactive } from 'vue';
import { type List } from '@/types';

export function useLists() {
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

  return {
    lists,
  };
}
