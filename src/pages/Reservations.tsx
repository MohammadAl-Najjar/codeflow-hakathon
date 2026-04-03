import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  getUserReservations,
  type Reservation,
} from '@/lib/rooms/getUserReservations';
import { getRoomImage } from '@/lib/rooms/roomAssets';
import {
  Calendar,
  User,
  CreditCard,
  Award,
  Settings,
  Loader2,
  CalendarX,
} from 'lucide-react';

export default function Reservations() {
  const { user } = useAuth();
  const displayName =
    user?.user_metadata?.display_name ?? user?.email ?? 'Guest';

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserReservations(user.id)
      .then(setReservations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const now = new Date();
  const activeReservations = reservations.filter(
    (r) =>
      r.status !== 'cancelled' && new Date(r.end_date) >= now
  );
  const pastReservations = reservations.filter(
    (r) =>
      r.status === 'cancelled' || new Date(r.end_date) < now
  );

  const sidebarLinks = [
    { icon: Calendar, label: 'My Bookings', active: true },
    { icon: User, label: 'Personal Details', active: false },
    { icon: CreditCard, label: 'Payment Methods', active: false },
    { icon: Award, label: 'Heritage Rewards', active: false },
    { icon: Settings, label: 'Preferences', active: false },
  ];

  const getNights = (start: string, end: string) =>
    Math.ceil(
      (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'gold';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <section className="px-4 py-12 sm:py-16 bg-background min-h-[calc(100vh-4rem)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <aside className="bg-card rounded-sm p-6 h-fit lg:sticky lg:top-24">
              <div className="text-center mb-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full heritage-gradient mb-3">
                  <span className="text-xl font-serif font-bold text-primary-foreground">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {displayName}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {user?.email}
                </p>
              </div>

              <Separator className="my-4" />

              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors cursor-pointer ${
                      link.active
                        ? 'bg-accent text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div>
              <div className="mb-8">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  My Reservations
                </h1>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Review your journey through our historic properties.
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-20">
                  <CalendarX className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    No Reservations Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Begin your journey with Heritage Archive by booking your first stay.
                  </p>
                  <Button
                    asChild
                    className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm"
                  >
                    <Link to="/">Browse Rooms</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {/* Active & Upcoming */}
                  {activeReservations.length > 0 && (
                    <div className="mb-12">
                      <h2 className="label-caps text-gold mb-4">
                        Active & Upcoming
                      </h2>
                      <div className="space-y-4">
                        {activeReservations.map((reservation) => {
                          const nights = getNights(
                            reservation.start_date,
                            reservation.end_date
                          );
                          const total = reservation.room_type
                            ? reservation.room_type.price * nights
                            : 0;

                          return (
                            <div
                              key={reservation.id}
                              className="flex flex-col sm:flex-row gap-4 bg-card rounded-sm overflow-hidden shadow-[0_0_30px_hsl(218_100%_6%/0.04)]"
                            >
                              <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                                <img
                                  src={getRoomImage(reservation.room_id)}
                                  alt={
                                    reservation.room_type?.label ?? 'Room'
                                  }
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-serif text-xl font-semibold text-foreground">
                                      {reservation.room_type?.label ??
                                        `Room #${reservation.room_id}`}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                                      HA-{reservation.id}
                                    </p>
                                  </div>
                                  <Badge
                                    variant={statusColor(reservation.status) as any}
                                  >
                                    {reservation.status.toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {new Date(
                                    reservation.start_date
                                  ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                  {' – '}
                                  {new Date(
                                    reservation.end_date
                                  ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                  <span className="text-muted-foreground/60">
                                    · {nights}{' '}
                                    {nights === 1 ? 'night' : 'nights'}
                                  </span>
                                </div>
                                {total > 0 && (
                                  <p className="mt-2 text-sm font-medium text-foreground">
                                    ${total.toFixed(2)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Past Archives */}
                  {pastReservations.length > 0 && (
                    <div>
                      <h2 className="label-caps text-muted-foreground mb-4">
                        Past Archives
                      </h2>
                      <div className="space-y-3">
                        {pastReservations.map((reservation) => {
                          const nights = getNights(
                            reservation.start_date,
                            reservation.end_date
                          );
                          return (
                            <div
                              key={reservation.id}
                              className="flex items-center justify-between p-5 bg-card rounded-sm"
                            >
                              <div>
                                <h3 className="font-serif text-base font-semibold text-foreground">
                                  {reservation.room_type?.label ??
                                    `Room #${reservation.room_id}`}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {new Date(
                                    reservation.start_date
                                  ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                  {' – '}
                                  {new Date(
                                    reservation.end_date
                                  ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                  {' · '}
                                  {nights}{' '}
                                  {nights === 1 ? 'night' : 'nights'}
                                </p>
                              </div>
                              <Badge
                                variant={statusColor(reservation.status) as any}
                              >
                                {reservation.status.toUpperCase()}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
