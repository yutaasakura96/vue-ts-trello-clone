## 🗂️ Vue TS Trello Clone

This is a Trello-inspired task management app built with Vue.js and TypeScript. This project uses Vite as the build tool and allows users to organize tasks into different lists, such as “To Do,” “In Progress,” and “Done.” Users can add, edit, and drag-and-drop tasks (cards) between lists, customize list colors, toggle between light and dark modes, and have their data persist using local storage.

## ✨ Features

    📌 Drag and Drop: Rearrange tasks and lists using a drag-and-drop interface powered by vuedraggable.
    📝 Add/Edit/Delete List & Tasks: Create, edit, or delete lists & tasks through a modal interface.
    🎨 Color-Coded Lists and Tasks: Assign colors to lists and apply priority-based color coding to tasks.
    📅 Due Dates: Add and display due dates for tasks, with color-coded warnings for upcoming deadlines.
    💻 Responsive UI: A clean, responsive interface with adaptable layouts.
    🌗 Light/Dark Mode: Toggle between light and dark themes with customized styles.
    💾 Local Storage Persistence: All list and task data is saved in local storage, allowing for data recovery on refresh.
    🔲 Modal Management: Use modals for task and list management with automatic focus on the first input field.

## 🛠️ Technologies Used

    ⚙️ Vue 3: Progressive JavaScript framework.
    💡 TypeScript: Adds type safety and IDE support.
    ⚡️ Vite: Fast, efficient build tool.
    🔄 vuedraggable: Drag-and-drop functionality for tasks and lists.
    🎨 TailwindCSS: For responsive and utility-first styling.
    📦 @vueuse/core: To handle light/dark mode toggle and focus trapping within modals.

## vue-ts-trello-clone

This template should help get you started developing with Vue 3 in Vite.

## 🖥️ Recommended IDE Setup

VSCode + Volar (and disable Vetur).

Type Support for .vue Imports in TS

Replace the tsc CLI with vue-tsc for type checking. Use Volar to make the TypeScript language service aware of .vue types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 🛠️ Project Setup

```sh
npm install
```

Compile and Hot-Reload for Development:

```sh
npm run dev
```

Type-Check, Compile and Minify for Production:

```sh
npm run build
```

Lint with ESLint:

```sh
npm run lint
```

## How It Works 🏗️

```sh
    1.	Task Lists: The app contains predefined lists (To Do, In Progress, Done) and allows for adding custom lists.
    2.	Add/Edit/Delete Task: Click “Add Card” to create a new task or select an existing task to edit or delete it.
    3.	Drag and Drop: Tasks and lists can be dragged and rearranged, making it easy to track task progress.
    4.	Color Customization: Each list can be assigned a color for better visual organization.
    5.	Dark Mode Toggle: A light/dark mode toggle in the UI provides a cohesive experience across themes.
    6.	Data Persistence: Lists and tasks are stored in local storage to maintain data on page refresh.
```

## 📂 Project Structure

```sh
src/
│
├── components/
│   ├── ListCard.vue           # Component for displaying each List
│   ├── ModalDialogue.vue      # Component for adding/editing Tasks in a modal
│   ├── ListModalDialogue.vue  # Component for adding/editing Lists in a modal
│   ├── TaskCard.vue           # Component for displaying each Task
│   └── AddListCard.vue        # Component for adding new Lists
│
├── composables/
│   ├── useListModal.ts        # Composable for functions to handle list modal
│   ├── useLists.ts            # Composable for functions to manage lists
│   └── useModal.ts            # Composable for handling modals and form validation
│
├── types.ts                   # TypeScript interfaces for Card and List
│
├── App.vue                    # Main Vue component managing task board and draggable lists
├── main.ts                    # Entry point for the Vue app
│
├── README.md                  # Contains all the key information about the project
```

## 🔑 Key Files:

    •	📂 App.vue: The main task board interface with draggable lists.
    •	💬 ModalDialogue.vue: Handles task addition, editing, and deletion with a modal pop-up.
    •	🗃️ ListModalDialogue.vue: Allows adding lists, list color customization, and color reset.
    •	📑 TaskCard.vue: Component for displaying each task, including priority and due date.
    •	📝 ListCard.vue: Component for displaying each list and task count.
    •	➕ AddListCard.vue: Component for adding new lists.
    •	📐 types.ts: Defines TypeScript interfaces for Card and List types.
    •	🛠️ useListModal.ts: Composable for managing list modal functions.
    •	🔄 useLists.ts: Composable for managing list data and operations.
    •	💡 useModal.ts: Composable for handling modals and form validation logic.
    •	🚀 main.ts: Entry point for the Vue app.
    •	📜 README.md: Contains all key information about the project.

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you like!
