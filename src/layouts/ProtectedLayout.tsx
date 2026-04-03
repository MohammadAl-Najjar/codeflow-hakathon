import { Outlet } from 'react-router';

/**
 * Layout wrapper for all protected routes.
 * The shared Navbar is already rendered by RootLayout,
 * so this layout only adds protected-specific structure if needed.
 */
export default function ProtectedLayout() {
  return <Outlet />;
}
