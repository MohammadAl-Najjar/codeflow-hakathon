import { useAuth } from '@/hooks/useAuth';
import { Mail, User, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const displayName = user.user_metadata?.display_name ?? 'User';
  const email = user.email ?? '—';
  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card px-8 py-10 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            {displayName}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your account information
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="text-sm font-medium text-foreground">{createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
