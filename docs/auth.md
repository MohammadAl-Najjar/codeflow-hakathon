# Authentication System

This document explains the full authentication architecture used in the application.

---

## Overview

Authentication is powered by **Supabase Auth** and managed on the client via a React context (`AuthProvider`) and a custom `useAuth` hook. Session persistence across page refreshes is handled automatically by Supabase's built-in token storage (localStorage).

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Creates and exports the Supabase client |
| `src/lib/createUser.ts` | Signs up a new user with email/password and inserts a row in the `users` table |
| `src/lib/signInUser.ts` | Signs in an existing user with email/password |
| `src/hooks/useAuth.tsx` | `AuthProvider` context + `useAuth` hook |
| `src/components/RouteGuards.tsx` | `ProtectedRoute` and `GuestRoute` layout route guards |
| `src/layouts/ProtectedLayout.tsx` | Layout wrapper for all protected pages (nav bar + `<Outlet />`) |
| `src/main.tsx` | Router configuration with nested route guards |

---

## How It Works

### 1. Supabase Client (`src/lib/supabase.ts`)

A single Supabase client instance is created using environment variables:

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

The client is used everywhere — auth functions, database queries, etc.

### 2. AuthProvider & useAuth (`src/hooks/useAuth.tsx`)

The `AuthProvider` wraps the entire app and manages authentication state:

```
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
```

**What it does on mount:**

1. Calls `supabase.auth.getSession()` to restore any existing session from localStorage (this is what preserves login across refreshes).
2. Subscribes to `supabase.auth.onAuthStateChange()` to react to login, logout, and token refresh events in real time.

**What it exposes via `useAuth()`:**

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | The currently authenticated Supabase user object |
| `session` | `Session \| null` | The current auth session (contains access/refresh tokens) |
| `loading` | `boolean` | `true` while the initial session is being fetched |
| `signOut` | `() => Promise<void>` | Signs the user out and clears the session |

### 3. Route Guards (`src/components/RouteGuards.tsx`)

Two layout route components that wrap groups of routes:

#### `ProtectedRoute`
- Checks `useAuth()` for a logged-in user
- While `loading` is `true`, shows a loading spinner
- If no user → redirects to `/login`
- If user exists → renders `<Outlet />` (the child routes)

#### `GuestRoute`
- Checks `useAuth()` for a logged-in user
- While `loading` is `true`, shows a loading spinner
- If user exists → redirects to `/protected/profile`
- If no user → renders `<Outlet />` (the child routes)

### 4. Protected Layout (`src/layouts/ProtectedLayout.tsx`)

A layout component that wraps all pages under the `/protected` route segment:

- Renders a sticky navigation bar with Home, Profile links, the user's display name, and a Sign Out button
- Renders `<Outlet />` below the nav for the matched child page

### 5. Router Configuration (`src/main.tsx`)

The route tree is structured as follows:

```
/                    → <App />              (public)
/about               → <About />            (public)

/login               → <GuestRoute>         (guest-only, redirects to /protected/profile if logged in)
/signup                  <Login /> or <Signup />

/protected           → <ProtectedRoute>     (auth required, redirects to /login if not logged in)
  /protected/profile     <ProtectedLayout>
                           <Profile />
```

---

## Session Persistence

Supabase automatically stores the session (access token + refresh token) in **localStorage**. When the app loads:

1. `AuthProvider` calls `supabase.auth.getSession()`.
2. Supabase checks localStorage for a stored session.
3. If found and the access token is still valid, the session is restored immediately.
4. If the access token is expired but the refresh token is valid, Supabase automatically refreshes it.
5. The `onAuthStateChange` listener picks up the `TOKEN_REFRESHED` event and updates React state.

**Result:** The user stays logged in across page refreshes and browser restarts (until the refresh token expires or they manually sign out).

---

## Auth Flow Diagrams

### Sign Up

```
User fills form → createUser() → supabase.auth.signUp()
                                       ↓
                               Session stored in localStorage
                                       ↓
                               onAuthStateChange fires
                                       ↓
                               AuthProvider updates user/session state
                                       ↓
                               navigate('/protected/profile')
```

### Sign In

```
User fills form → signInUser() → supabase.auth.signInWithPassword()
                                        ↓
                                Session stored in localStorage
                                        ↓
                                onAuthStateChange fires
                                        ↓
                                AuthProvider updates user/session state
                                        ↓
                                navigate('/protected/profile')
```

### Sign Out

```
User clicks Sign Out → signOut() → supabase.auth.signOut()
                                          ↓
                                  Session cleared from localStorage
                                          ↓
                                  onAuthStateChange fires
                                          ↓
                                  AuthProvider sets user/session to null
                                          ↓
                                  ProtectedRoute detects no user → redirect to /login
```

### Page Refresh

```
App mounts → AuthProvider useEffect runs
                    ↓
           supabase.auth.getSession()
                    ↓
           Session found in localStorage? ──Yes──→ Restore user/session state
                    │                                        ↓
                    No                              Token expired? ──Yes──→ Auto-refresh
                    ↓                                        │
           user = null, loading = false                      No
                    ↓                                        ↓
           ProtectedRoute redirects to /login       User stays logged in
```

---

## Adding New Protected Pages

To add a new page that requires authentication, simply add it as a child of the existing protected route group in `main.tsx`:

```tsx
// In the protected route children array:
{
  path: '/protected',
  element: <ProtectedRoute />,
  children: [
    {
      element: <ProtectedLayout />,
      children: [
        { path: 'profile', element: <Profile /> },
        { path: 'settings', element: <Settings /> },  // ← new page
        { path: 'dashboard', element: <Dashboard /> }, // ← new page
      ],
    },
  ],
},
```

The new page will automatically:
- Be protected by the auth guard
- Have the shared navigation bar from `ProtectedLayout`
- Redirect unauthenticated users to `/login`
