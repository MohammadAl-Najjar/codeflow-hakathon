import { Outlet } from 'react-router';
import Navbar from '@/components/Navbar';

/**
 * Root layout — wraps every page with the responsive navbar.
 */
export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
