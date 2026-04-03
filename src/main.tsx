import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './hooks/useAuth.tsx';
import { ProtectedRoute, GuestRoute } from './components/RouteGuards.tsx';
import RootLayout from './layouts/RootLayout.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import Home from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import RoomDetail from './pages/RoomDetail.tsx';
import BookingConfirmed from './pages/BookingConfirmed.tsx';
import Reservations from './pages/Reservations.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public routes
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/rooms/:id',
        element: <RoomDetail />,
      },

      // Guest-only routes (redirect to /protected/profile if already logged in)
      {
        element: <GuestRoute />,
        children: [
          {
            path: '/signup',
            element: <Signup />,
          },
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },

      // Protected layout route — requires authentication
      {
        path: '/protected',
        element: <ProtectedRoute />,
        children: [
          {
            element: <ProtectedLayout />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
              {
                path: 'booking-confirmed',
                element: <BookingConfirmed />,
              },
              {
                path: 'reservations',
                element: <Reservations />,
              },
            ],
          },
        ],
      },

      // 404 catch-all
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
