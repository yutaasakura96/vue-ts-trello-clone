## 🗂️ Vuell: Vue TS Trello Clone

This is a Trello-inspired task management app built with Vue.js and TypeScript. Using Vite as the build tool, the app allows users to organize tasks into customizable lists, such as "To Do," "In Progress," and "Done." Users can add, edit, and delete tasks and lists with ease, utilizing features like drag-and-drop reordering, custom list colors, a light/dark mode toggle, fuzzy search, and persistent data in local storage. These features make task management intuitive and visually appealing.

## ✨ Features

- 📌 **Drag and Drop**: Rearrange tasks and lists using a drag-and-drop interface powered by `vuedraggable`.
- 📝 **Add/Edit/Delete List & Tasks**: Create, edit, or delete lists and tasks through a modal interface.
- 🔍 **Fuzzy Search**: Filter lists dynamically with a Fuse.js-powered search bar in the navbar.
- 🎨 **Color-Coded Lists and Tasks**: Customize list colors and apply priority-based color coding to tasks.
- 📅 **Due Dates**: Add and display due dates for tasks, with color-coded warnings for upcoming deadlines.
- 🌗 **Light/Dark Mode**: Toggle between light and dark themes for a consistent UI experience.
- 💾 **Local Storage Persistence**: All data is saved locally, allowing users to resume where they left off.
- 🔲 **Modal Management**: Use modals for task and list management with automatic focus on the first input field.

## 🛠️ Technologies Used

- **⚙️ [Vue 3](https://vuejs.org/)**: Progressive JavaScript framework.
- **💡 [TypeScript](https://www.typescriptlang.org/)**: Provides type safety and enhanced IDE support.
- **⚡️ [Vite](https://vitejs.dev/)**: Fast, efficient build tool.
- **🔄 [vuedraggable](https://github.com/SortableJS/vue.draggable.next)**: Enables drag-and-drop functionality for tasks and lists.
- **🎨 [TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for responsive and streamlined styling.
- **📦 [@vueuse/core](https://vueuse.org/)**: Integrates features like light/dark mode toggling and focus trapping within modals.
- **🔍 [Fuse.js](https://vueuse.org/integrations/useFuse/)**: Fuzzy search functionality for list filtering, integrated with `useFuse` from VueUse library.

## vue-ts-trello-clone

This template should help get you started developing with Vue 3 in Vite.

## 🖥️ Recommended IDE Setup

- **[VSCode](https://code.visualstudio.com/)** + **[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** (and disable [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur))

For Type Support with `.vue` Imports in TypeScript:

- Replace the `tsc` CLI with **[vue-tsc](https://github.com/johnsoncodehk/vue-tsc)** for type checking.
- Use Volar to make the TypeScript language service aware of `.vue` types.

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
    5.	Dark Mode Toggle: A light/dark mode toggle in the NavbarComponent provides a cohesive experience across themes.
    6.	Data Persistence: Lists and tasks are stored in local storage to maintain data on page refresh.
    7.	Fuzzy Search: Use the search bar in the NavbarComponent to filter lists based on title or content.
```

## 📂 Project Structure

```sh
src/
│
├── components/
│   ├── NavbarComponent.vue    # Contains dark mode toggle and fuzzy search input
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

- **📂 App.vue**: Main task board interface with draggable lists.
- **🔍 NavbarComponent.vue**: Manages dark mode toggle and fuzzy search bar.
- **💬 ModalDialogue.vue**: Handles task addition, editing, and deletion in a modal pop-up.
- **🗃️ ListModalDialogue.vue**: Manages list creation/editing with color customization options.
- **📑 TaskCard.vue**: Displays each task, including priority and due date.
- **📝 ListCard.vue**: Displays each list and task count.
- **➕ AddListCard.vue**: Component for adding new lists.
- **📐 types.ts**: Defines TypeScript interfaces for Card and List types with clear comments.
- **🛠️ useListModal.ts**: Composable for managing list modal functions with Fuse.js integration.
- **🔄 useLists.ts**: Manages list data and related functions.
- **🔍 useFuse.ts**: Fuzzy search functionality for list filtering.
- **💡 useModal.ts**: Handles modals and form validation.
- **🚀 main.ts**: Entry point for the Vue app.
- **📜 README.md**: Documentation for the project.

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you like!
