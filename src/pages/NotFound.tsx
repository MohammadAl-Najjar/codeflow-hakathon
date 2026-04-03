import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Big fun 404 */}
      <div className="relative select-none">
        <h1 className="text-[10rem] font-black tracking-tighter text-primary/10 sm:text-[14rem]">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-7xl">🫠</span>
        </div>
      </div>

      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
        Page not found
      </h2>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Oops! Looks like you wandered into the void. The page you're looking for
        doesn't exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <Button asChild className="cursor-pointer">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
