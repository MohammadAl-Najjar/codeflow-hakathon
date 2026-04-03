import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';
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

  const navLinks = [
    { to: '/', label: 'Home' },
  ];

  const protectedLinks = [
    { to: '/protected/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col items-start"
        >
          <span className="font-serif text-lg font-semibold tracking-wide text-foreground">
            localhost:3000
          </span>
          <span className="text-[10px] text-muted-foreground -mt-0.5">
            CodeFlow Hakathon
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {!loading && user && protectedLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-4 flex items-center gap-2">
            {loading ? null : user ? (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-border/50 text-foreground hover:bg-accent"
                >
                  <Link to="/protected/profile">Account</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-muted-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-foreground"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90"
                >
                  <Link to="/signup">Join the Archive</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-sm p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!loading && user && protectedLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
              {loading ? null : user ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full cursor-pointer justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/protected/profile">Account</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full cursor-pointer justify-center text-muted-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-1.5 h-3.5 w-3.5" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full cursor-pointer justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full cursor-pointer justify-center heritage-gradient text-primary-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/signup">Join the Archive</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
