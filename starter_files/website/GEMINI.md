# TechStack Conference Website

This is the frontend web application for the TechStack Conference. It is built with React, TypeScript, and Vite, designed to be fast, responsive, and visually engaging.

## Project Overview

-   **Type:** Frontend Single Page Application (SPA)
-   **Stack:**
    -   **Framework:** React 19
    -   **Build Tool:** Vite
    -   **Language:** TypeScript
    -   **Styling:** Tailwind CSS
    -   **Routing:** React Router DOM v7
    -   **Animation:** Framer Motion
    -   **Icons:** Lucide React
    -   **Testing:** Vitest, React Testing Library

## Building and Running

### Prerequisites
-   Node.js (latest LTS recommended)
-   npm

### Key Commands

-   **Install Dependencies:**
    ```bash
    npm install
    ```

-   **Start Development Server:**
    ```bash
    npm run dev
    ```
    Starts the local development server with Hot Module Replacement (HMR).

-   **Build for Production:**
    ```bash
    npm run build
    ```
    Runs the TypeScript compiler (`tsc -b`) and bundles the application using Vite.

-   **Run Tests:**
    ```bash
    npm run test
    ```
    Executes unit and integration tests using Vitest.

-   **Lint Code:**
    ```bash
    npm run lint
    ```
    Runs ESLint to check for code quality and style issues.

-   **Preflight Check:**
    ```bash
    npm run preflight
    ```
    Runs linting, tests, and a production build in sequence. Useful before committing changes.

## Development Conventions

### Component Structure
-   **Functional Components:** Use functional components with hooks.
-   **Layout:** The `Layout` component (`src/components/Layout.tsx`) wraps the application and handles the header, footer, and theme toggling (Light/Dark mode).
-   **Pages:** Main views are located in `src/pages/`.

### Routing and Lazy Loading
-   **Lazy Loading:** All page components are lazy-loaded to optimize performance.
-   **Helper:** Use `src/lazyLoad.ts` for defining lazy imports.
-   **Prefetching:** Implement prefetching on link hover (e.g., `onMouseEnter={() => loadCatalog()}`) to improve perceived latency.

### Styling
-   **Tailwind CSS:** Use Tailwind utility classes for all styling.
-   **Dark Mode:** Support dark mode using the `dark:` prefix. The theme state is managed in the `Layout` component.
-   **Animations:** Use `framer-motion` for complex animations (e.g., enter transitions, scroll reveals) and `src/components/ParticleBackground.tsx` for visual flair.

### Testing
-   **Framework:** Vitest with React Testing Library.
-   **Setup:** Global test configuration is in `src/setupTests.ts`.
-   **Location:** Co-locate tests with components (e.g., `MyComponent.test.tsx` next to `MyComponent.tsx`).
