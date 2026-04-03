import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, UserPlus, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setMobileOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo / brand */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          CodeFlow
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          {loading ? null : user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="cursor-pointer">
                <Link to="/protected/profile">
                  <User className="mr-1.5 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="cursor-pointer text-muted-foreground" onClick={handleSignOut}>
                <LogOut className="mr-1.5 h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="cursor-pointer">
                <Link to="/login">
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Log in
                </Link>
              </Button>
              <Button asChild size="sm" className="cursor-pointer">
                <Link to="/signup">
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 sm:hidden">
          <nav className="flex flex-col gap-2">
            {loading ? null : user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full cursor-pointer justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to="/protected/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full cursor-pointer justify-start text-muted-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full cursor-pointer justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="w-full cursor-pointer justify-start"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
