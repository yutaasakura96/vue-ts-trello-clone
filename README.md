## Vue TS Trello Clone 🗂️

This is  Trello-inspired task management app built with Vue.js and TypeScript. This project uses Vite as the build tool and allows users to organize tasks into different lists, such as "To Do", "In Progress", and "Done". Users can easily add, edit, and drag-and-drop tasks (cards) between lists.

## Features ✨

- **Drag and Drop**: Rearrange tasks within and across lists using a simple drag-and-drop interface (powered by `vuedraggable`).
- **Add/Edit Tasks**: Users can create new tasks or edit existing tasks through a modal dialogue interface.
- **Responsive UI**: Clean and responsive user interface built with Vue 3 and TailwindCSS.
- **Modal Dialogue**: Add or edit tasks using a modal pop-up that focuses on the first input when opened.
- **Dynamic Lists**: Multiple lists with their own set of tasks that can be managed easily.

## Technologies Used 🛠️

- **Vue 3**: The progressive JavaScript framework.
- **TypeScript**: Provides type safety and IDE support.
- **vuedraggable**: For drag-and-drop task management.
- **TailwindCSS**: For responsive and utility-first styling.
- **@vueuse/integrations**: To handle focus trapping within the modal.

---

## vue-ts-trello-clone

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

Compile and Hot-Reload for Development
```sh
npm run dev
```
Type-Check, Compile and Minify for Production
```sh
npm run build
```
Lint with ESLint
```sh
npm run lint
```
## How It Works 🏗️

1.	Task Lists: The app contains predefined lists (To Do, In Progress, and Done), each holding its own set of tasks.
2.	Add/Edit Task: Click on “Add Card” to create a new task or click on an existing task to edit it. The task information is managed through a modal that pops up for input.
3.	Drag and Drop: Tasks (cards) can be dragged and rearranged within or between lists. This allows users to easily track the progress of their tasks.
4.	Modal Management: The modal automatically focuses on the title input when opened, and the task information is updated dynamically based on the selected task.
5.	Data Handling: The task data (lists and cards) is managed reactively using Vue’s reactive and ref.

## Project Structure 📂
```sh
src/
│
├── components/
│   └── ListCard.vue   # Component for displaying List card
│   └── ModalDialogue.vue   # Component for adding/editing tasks in a modal
│   └── TaskCard.vue   # Component for displaying Task card
├── composables/
│   └── useLists.ts   # Composable for functions to manage lists.
│   └── useModal.ts   # Composables for defining the types used in the application
│
│
├── types.ts                # TypeScript interfaces for Card and List
│
├── app.vue                 # Main Vue component with the task board and draggable lists
│
└── main.ts                 # Entry point for the Vue app
```
## Key Files:

•	app.vue: The main task board interface where tasks are displayed and can be dragged between lists.
•	ModalDialogue.vue: Handles adding and editing tasks with a modal pop-up.
•	types.ts: Defines the TypeScript interfaces for the Card and List types.

## License 📄

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you like!
