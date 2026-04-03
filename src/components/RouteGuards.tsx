import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

/**
 * Wraps routes that require authentication.
 * Redirects to /login if the user is not logged in.
 */
export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/**
 * Wraps routes that should only be accessible to guests (not logged in).
 * Redirects to /profile if the user is already logged in.
 */
export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/protected/profile" replace />;
  }

  return <Outlet />;
}
