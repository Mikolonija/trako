# Trako

Trako is a habit-tracking app that helps you stay consistent, build routines, and achieve your personal goals. With an intuitive interface, Trako keeps you motivated and improve your daily life.

## Main features

**Habit Management**:

- Supports creating, editing, deleting, and organizing habits for better goal tracking.

**Habit Navigation**:

- Provides a simple and intuitive interface for browsing and managing habits.

**Habit Status Tracking**:

- Offers real-time progress updates and detailed habit completion insights.

**Theme**:

- Supports light and dark mode.

**Language Support**:

- Supports English and Lithuanian languages.

**Habit Repetition**:

- Allows habits to repeat on specific days.

## Libraries Used

**Core Libraries**:

- **vue** – Frontend framework.
- **pinia** – State management for Vue.js.
- **vue-router** – Client-side Routing for Vue.js.
- **vue-i18n** – Internationalization (i18n) for Vue.js.

**Development Tools**:

- **typescript** – A typed superset of JavaScript.
- **vite** – Fast development server and build tool optimized for modern web projects.
- **vue-tsc** – TypeScript type-checking tool for Vue.js .
- **vitest** – A unit testing framework for fast and efficient testing of your code.
- **cypress** – An end-to-end (E2E) testing framework used for testing the functionality and interactions of your application in a real browser environment.

**UI & Utilities**:

- **@vueuse/core** – Collection of Vue composition utilities.
- **vue-uuid** – Generate unique identifiers.
- **@kyvg/vue3-notification** – A notification component for Vue.js.
- **@vuepic/vue-datepicker** – A date picker component for Vue.js.
- **sass** – Sass/SCSS compiler for styling pre-processing.

**Additional Tools & Plugins**:

- **prettier** – This plugin allows to format files.
- **vite-plugin-compression2** – Compression for Vite builds.
- **vite-svg-loader** – Load SVG files as Vue components.

## Website link

https://trako.vercel.app/

## Installation

**Clone the Repository**:

- https://github.com/Mikolonija/trako.git

## Requirements

**Visual studio code**

- Recommended code editor for development.

**Node v22.13.0**

- Required to running the application.

## Running the program

1. **Navigate to the root project directory:**

- `Open terminal and navigate to the project folder.`

2. **Install dependencies:**

- `Run the following command:`

  ```sh
  npm install
  ```

3. **Start the development server:**

- `Run the following command:`

  ```sh
  npm run dev
  ```

4. **Open in the browser:**

- `Click the link provided in the terminal to view the project.`

## Format code

- `Run the following command:`

  ```sh
  npm run format
  ```

## Run Unit test

- `Run the following command:`

  ```sh
  npm run test:unit
  ```

## Run E2E test

- `Run the following command:`

  ```sh
  npm run test:e2e
  ```

## Data Storage

- `Habits are stored in localStorage.`

## Description of folders and files

### `/cypress/e2e/`

- `*`: e2e test.

### `/public`

- `logo.svg`: The project logo.

### `src/`

- `config.ts`:Project configuration file.
- `global.d.ts`: Global definitions.
- `I18n.ts`: Internationalization configuration file.
- `main.ts`: Application initialization and mounting file.

#### `assets/`

- `*`: Project images.

#### `components/`

- `AnimationBubbles.vue`: Animated bubbles component.
- `Header.vue`: Header component.
- `SvgImage.vue`: SVG image rendering component.

#### `components/habit`

- `HabitCard.vue`: Habit details component.
- `HabitCreateCard.vue`: New habit creation card component.
- `HabitFilter.vue`: Habit filtering component by date.
- `HabitForm.vue`: Habit input fields component (text, date picker, range selection).
- `HabitList.vue`: Habit list display component.

#### `components/menu`

- `SettingsPanel.vue`: Theme and language settings component.
- `Sidebar.vue`: Menu component with access to settings.

#### `components/modals`

- `ConfirmModal.vue`:Confirmation modal component.
- `HabitModal.vue`: Modal component for adding or editing habits.
- `MyHabitModal.vue`: Modal component for check habits.

#### `locales/`

- `en.json`: English translations.
- `lt.json`: Lithuanian translations.

#### `router/`

- `index.ts`: Configuration file for routes.

#### `stores/`

- `habit.ts`: Manages habit CRUD operations.
- `habit.test.ts`: Testing CRUD functionality for habits.
- `habitForm.ts`: Manages habit form state and validation for creating and updating habits.
- `language.test.ts`: Testing language settings.
- `language.ts`: Manages language preferences.
- `modal.ts`: Manages modal functionality.
- `sideBar.ts`: Manages sidebar state.
- `theme.test.ts`: Testing theme settings.
- `theme.ts`: Manages theme settings.

#### `styles/`

- `buttons.scss`: Button styles.
- `colors.scss`: Color variables.
- `dataPicker.scss`: Styles for the date picker.
- `fonts.scss`: Typography styles.
- `habitStatus.scss`: Habit status styles.
- `layout.scss`: Layout styles.
- `loader.scss`: Loader styles.
- `mixins.scss`: Stores reusable SCSS mixins.
- `modal.scss`: Modal styles.
- `notification.scss`: Styles for notification pop-ups.
- `reset.scss`: CSS resets.
- `variables.scss`: CSS variables.

#### `types/enums`

- `habit.ts`: Habit related enums.
- `language.ts`: Language related enums.
- `theme.ts`: Theme related enums.

#### `types/interfaces`

- `feature.ts`: Feature related interfaces.
- `habit.ts`: Habit related interfaces.
- `menu.ts`: Menu related interfaces.

#### `/utils`

- `helpers.ts`: Utility functions.

#### `/views`

- `App.vue`: Main page view.

#### `/views/pages`

- `Help.vue`: Help page view.
- `Home.vue`: Home page view.
- `NotFound.vue`: NotFound page view.

### `/`

- `.gitignore`: Specifies files and directories to ignore in Git.
- `.prettierrc`: Configuration file for code format.
- `cypress.config.ts`: Cypress configuration file.
- `index.html`: The main HTML file that serves as the entry point for the web app.
- `LICENSE`: The LICENSE file.
- `package-lock.json`: Locks the exact versions of project dependencies to ensure consistent installations across environments.
- `package.json`: Manages project metadata, dependencies, and scripts used in the project.
- `README.md`: Project documentation.
- `tsconfig.app.json`: TypeScript configuration for the app.
- `tsconfig.json`: The main TypeScript configuration file.
- `tsconfig.node.json`: TypeScript configuration for Node.js.
- `vercel.json`: vercel configuration file.
- `vite.config.ts`: Configuration file for Vite.
