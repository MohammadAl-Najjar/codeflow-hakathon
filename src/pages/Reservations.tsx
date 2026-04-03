import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import mockData from '@/lib/mock.json';
import {
  Calendar,
  User,
  CreditCard,
  Award,
  Settings,
  MapPin,
  ArrowRight,
  FileText,
} from 'lucide-react';

export default function Reservations() {
  const { user } = useAuth();
  const guest = mockData.guestProfile;
  const displayName = user?.user_metadata?.display_name ?? guest.name;

  const sidebarLinks = [
    { icon: Calendar, label: 'My Bookings', active: true },
    { icon: User, label: 'Personal Details', active: false },
    { icon: CreditCard, label: 'Payment Methods', active: false },
    { icon: Award, label: 'Heritage Rewards', active: false },
    { icon: Settings, label: 'Preferences', active: false },
  ];

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
                    {displayName.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {displayName}
                </h3>
                <Badge variant="gold" className="mt-2">
                  {guest.membership}
                </Badge>
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
                  Review your journey through our historic properties. Here lies
                  the record of your upcoming stays and past experiences with the
                  Archive.
                </p>
              </div>

              {/* Active & Upcoming */}
              <div className="mb-12">
                <h2 className="label-caps text-gold mb-4">
                  Active & Upcoming
                </h2>
                <div className="space-y-4">
                  {mockData.reservations.active.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col sm:flex-row gap-4 bg-card rounded-sm overflow-hidden shadow-[0_0_30px_hsl(218_100%_6%/0.04)]"
                    >
                      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                        <img
                          src={reservation.image}
                          alt={reservation.roomTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {reservation.roomTitle}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              {reservation.location}
                            </div>
                          </div>
                          <Badge variant="gold">{reservation.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(reservation.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {' – '}
                          {new Date(reservation.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Button
                            asChild
                            size="sm"
                            className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm"
                          >
                            <Link to="/protected/booking-confirmed">
                              View Details
                              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Archives */}
              <div>
                <h2 className="label-caps text-muted-foreground mb-4">
                  Past Archives
                </h2>
                <div className="space-y-3">
                  {mockData.reservations.past.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-5 bg-card rounded-sm"
                    >
                      <div>
                        <h3 className="font-serif text-base font-semibold text-foreground">
                          {reservation.roomTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {new Date(reservation.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {' – '}
                          {new Date(reservation.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {' • '}
                          {reservation.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer text-gold hover:text-gold/80 label-caps"
                        >
                          <FileText className="mr-1.5 h-3.5 w-3.5" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
