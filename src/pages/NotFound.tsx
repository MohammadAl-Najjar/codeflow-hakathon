import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="label-caps text-gold mb-4">Archive Error</div>
      <h1 className="font-serif text-6xl font-bold text-foreground">404</h1>
      <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mt-3 max-w-md text-center text-muted-foreground leading-relaxed">
        The page you are looking for has been removed from the archive, or
        perhaps it was never recorded.
      </p>
      <Button
        asChild
        className="mt-8 cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to the Archive
        </Link>
      </Button>
    </div>
  );
}
