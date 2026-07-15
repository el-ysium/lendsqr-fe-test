# Lendsqr Frontend Engineering Test

A frontend implementation of a snippet of the Lendsqr Admin console, built as part of Lendsqr's frontend engineering assessment. The app includes Login, Dashboard, Users, and User Details pages, built to closely match the provided Figma design while handling real-world states (loading, empty, error) that the design itself doesn't show.

**Live app:** https://angel-ejugh-lendsqr-fe-test.onrender.com/
**Mock API:** https://lendsqr-mock-data.onrender.com/users

## Tech stack

- **React** + **TypeScript**
- **Vite** as the build tool
- **SCSS** for styling
- **json-server**, self-hosted on Render, as the mock API
- **Vitest** + **React Testing Library** for testing

## Features

- **Login** page with simulated authentication (token stored in localStorage)
- **Dashboard** overview page
- **Users** table
  - Fetches all 500 mock user records and maps them into a clean internal `User` type
  - Client-side filtering and search across the full dataset (not just the visible page)
  - Pagination at 10 rows per page, recalculated after filters/search are applied
  - Loading, empty, and error states with retry handling
- **User Details** page
  - Fetches a single user by ID independently of the table
  - Displays personal info, employment details, two guarantors, and social handles
  - Persists last-viewed user details to localStorage

## Why a self-hosted mock API

The original plan was to use mockapi.io, but its free tier caps resources at ~100 records, well short of the 500 required. After also running into limitations with my-json-server.me (likely due to payload size), I generated 500 realistic records locally using `@faker-js/faker` and self-hosted a `json-server` instance on Render instead. This gave full control over the schema and record count, and meant the mock API behaves like a real paginated backend rather than a third-party generator with built-in ceilings.

Since Render's free tier spins down inactive services, [UptimeRobot](https://uptimerobot.com/) pings the API every 5 minutes to prevent cold-start delays.

## Data shape

The mock API schema is flat (no native nested objects), so fields like guarantor and employment details are stored with prefixed keys (e.g. `guarantor1_fullName`, `guarantor2_fullName`, `employment_sector`) and reconstructed into nested objects via a mapping layer (`src/data/users.ts`), keeping the rest of the app working with clean, nested TypeScript types.

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# run tests
npm run test

# build for production
npm run build
```

## Project structure

```
src/
├── components/     # reusable UI components
├── pages/          # route-level pages (Login, Dashboard, Users, UserDetails)
├── hooks/          # custom hooks
├── services/       # API calls (fetchUsers, fetchUserById)
├── data/           # types + mapper (ApiUser -> User)
├── test/           # tests + shared fixtures
└── styles/         # global SCSS
scripts/
└── generateDb.mjs  # generates the 500-record mock dataset using @faker-js/faker
```

## Testing

Core logic is covered with unit tests, including:
- Empty filter/search results
- Account status filtering
- Field mapping (`ApiUser` → `User`)
- Fetching a user by ID

Shared fixtures live in `src/test/fixtures.ts`.

## What I'd do differently

With more time, I'd move filtering and search into server-side query params (`json-server` supports `q`, exact-field filters, `_page`, and `_limit` natively) instead of fetching the full dataset upfront. That would better reflect how this table would need to behave against real production data volumes — hundreds of thousands of records, not 500.