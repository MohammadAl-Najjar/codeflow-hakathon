import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import mockData from '@/lib/mock.json';
import { Mail, Calendar, Award, MapPin, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const guest = mockData.guestProfile;

  if (!user) return null;

  const displayName = user.user_metadata?.display_name ?? guest.name;
  const email = user.email ?? '—';
  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats = [
    { label: 'Total Stays', value: guest.totalStays.toString() },
    { label: 'Reward Points', value: guest.rewardPoints.toLocaleString() },
    { label: 'Membership', value: guest.membership },
  ];

  return (
    <>
      <section className="px-4 py-16 sm:py-24 bg-background min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-2xl">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full heritage-gradient mb-4">
              <span className="text-3xl font-serif font-bold text-primary-foreground">
                {displayName.charAt(0)}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {displayName}
            </h1>
            <Badge variant="gold" className="mt-3">
              {guest.membership}
            </Badge>
            <p className="mt-3 text-sm text-muted-foreground">
              Your account information at the Heritage Archive
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-card rounded-sm p-5"
              >
                <p className="font-serif text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="label-caps text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Separator className="mb-10" />

          {/* Account Details */}
          <div className="space-y-4">
            <h2 className="label-caps text-gold mb-4">Account Details</h2>

            <div className="flex items-center gap-4 bg-card rounded-sm px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <Mail className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-sm px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <Calendar className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">
                  {createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-sm px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <Award className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">
                  Reward Points
                </p>
                <p className="text-sm font-medium text-foreground">
                  {guest.rewardPoints.toLocaleString()} points
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-sm px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <MapPin className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">
                  Preferred Property
                </p>
                <p className="text-sm font-medium text-foreground">
                  Heritage Archive London
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-card rounded-sm px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <Shield className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="label-caps text-muted-foreground">
                  Account Status
                </p>
                <p className="text-sm font-medium text-foreground">
                  Active — Verified Member
                </p>
              </div>
            </div>
          </div>

          {/* Heritage quote */}
          <div className="mt-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-px w-16 bg-gold/30" />
            </div>
            <p className="font-serif text-base italic text-muted-foreground">
              "Every guest becomes a chapter in our living archive."
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
