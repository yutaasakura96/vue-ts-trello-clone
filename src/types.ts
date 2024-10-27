// Purpose: Define the types used in the application.
export interface Card {
  id: number;
  title: string;
  description: string;
  date: Date;
  tag: string;
  tagColor: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
  color: string;
}
