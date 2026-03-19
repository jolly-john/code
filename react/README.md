# React Wizard App

A small React + TypeScript application demonstrating a 5-step wizard UI.

## Structure

- `src/wizard/steps.ts` defines the wizard step configuration (titles, components, and validation).
- Each step is a separate component under `src/wizard/steps/`.
- `src/wizard/Wizard.tsx` renders the current step and handles navigation.

## Getting Started

This project uses Vite. To run locally:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### Connecting to a REST API

The wizard can load and submit per-step data to a REST API. Set the base URL in an environment file:

```bash
cp .env.example .env
# edit .env and set VITE_API_BASE_URL
```

The wizard will use endpoints like:

- `GET {VITE_API_BASE_URL}/wizard/<step-id>`
- `POST {VITE_API_BASE_URL}/wizard/<step-id>`

If `VITE_API_BASE_URL` is empty, the wizard works locally without calling a server.

## Extending the Wizard

- Add/remove steps by updating `src/wizard/steps.ts`.
- Each step can provide its own validation logic and UI.
- You can switch to a router-based approach (React Router) if you want step-per-route.
