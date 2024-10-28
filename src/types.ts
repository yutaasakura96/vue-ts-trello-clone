// Purpose: Define the types used in the application for cards and lists

// Type definition for a Card
export interface Card {
  id: number;                  // Unique identifier for each card
  title: string;               // Title or name of the card
  description: string;         // Description or details of the card
  date: Date;                  // Due date or target date for the card
  tag: string;                 // Tag or category label for the card
  tagColor: string;            // Color associated with the card's tag
  priority: 'Low' | 'Medium' | 'High'; // Priority level of the card
}

// Type definition for a List, which contains multiple cards
export interface List {
  id: number;                  // Unique identifier for each list
  title: string;               // Title or name of the list
  cards: Card[];               // Array of cards within the list
  color: string;               // Background color for the list
}
