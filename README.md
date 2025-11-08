This project is a front-end mini dashboard for exploring and filtering federal contract opportunities.
It provides an interactive, responsive UI with full theme support, state persistence, preset filtering, and a slide-in details drawer.

| Feature                             | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| **React + TypeScript Architecture** | Clean component structure with reusable UI primitives.                       |
| **TailwindCSS UI**                  | Fully responsive, mobile-optimized layout.                                   |
| **Filter Panel**                    | Filter by NAICS, Agency, Vehicle, Set-Aside, Date Range, Ceiling & Keywords. |
| **Dynamic Filter Options**          | Drop-down choices are auto-derived from the dataset.                         |
| **Save & Load Presets**             | Store custom filter configurations in `localStorage`.                        |
| **Auto-Persist Filters**            | Reloading the page restores applied filters and results.                     |
| **Dashboard Metrics**               | Donut chart, avg progress, total value, next due date.                       |
| **Results List**                    | Sort by due date, % complete, or fit score.                                  |
| **Details Drawer**                  | Slide-in detail panel with stage timeline and actions.                       |
| **Mark as Submitted Action**        | Updates record and UI state.                                                 |
| **Light/Dark Theme**                | Controlled via `data-theme` attribute + toggle button.                       |
| **Toast Notifications**             | Themed success, warning, info, and error messages.                           |

| Layer             | Tools                                        |
| ----------------- | -------------------------------------------- |
| UI Framework      | React (with Hooks)                           |
| Language          | TypeScript                                   |
| Styling           | TailwindCSS + CSS Variables for theme tokens |
| State Persistence | `localStorage`                               |
| Build System      | Vite                                         |

🚀 Setup & Run

1. Install Dependencies
   npm install

2. Run Dev Server
   npm run dev

3. Open in Browser

Note: If i had more time i will enhance the look and feel of UI . Work on Extra Ponits like - Quick Filter , CSV Export , Multi Select
