import { Link } from 'react-router';
import { Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Built with React + Supabase
        </div>

        <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Ship faster with{' '}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            CodeFlow
          </span>
        </h1>

        <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
          A modern starter template with authentication, routing, and a
          beautiful UI — so you can focus on building what matters.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <Button asChild size="lg" className="cursor-pointer">
              <Link to="/protected/profile">Go to Profile</Link>
            </Button>
          ) : (
            <>
              <Button asChild size="lg" className="cursor-pointer">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="cursor-pointer">
                <Link to="/login">Log in</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
            A batteries-included starter so you can skip the boilerplate.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                Auth Baked In
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign up, log in, session persistence, and route protection — all
                wired up and ready to go.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                Blazing Fast
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Powered by Vite and React with hot module replacement for an
                instant development experience.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                Ready to Deploy
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Supabase backend, responsive design, and clean code — deploy
                anywhere with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodeFlow. Built with ❤️
        </p>
      </footer>
    </>
  );
}
