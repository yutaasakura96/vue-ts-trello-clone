export interface Card {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
}
