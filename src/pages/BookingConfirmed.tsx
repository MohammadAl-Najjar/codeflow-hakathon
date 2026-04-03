import { Link, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import { getRoomImage } from '@/lib/rooms/roomAssets';
import {
  CheckCircle2,
  Calendar,
  CreditCard,
  ArrowRight,
  Hash,
} from 'lucide-react';

interface BookingState {
  reservation: {
    id: number;
    room_id: number;
    user_id: string;
    start_date: string;
    end_date: string;
    status: string;
    roomLabel: string;
    roomPrice: number;
  };
}

export default function BookingConfirmed() {
  const location = useLocation();
  const state = location.state as BookingState | null;

  // If user navigates here directly without booking, redirect to home
  if (!state?.reservation) {
    return <Navigate to="/" replace />;
  }

  const { reservation } = state;

  const nights = Math.ceil(
    (new Date(reservation.end_date).getTime() -
      new Date(reservation.start_date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const totalPrice = nights * reservation.roomPrice;

  return (
    <>
      <section className="px-4 py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-secondary/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <div className="label-caps text-gold mb-3">Entry Recorded</div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Reservation Confirmed
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your retreat at the Heritage Archive has been secured. A
              confirmation record has been sent to your registered digital
              ledger.
            </p>
          </div>

          {/* Booking card */}
          <div className="bg-card rounded-sm overflow-hidden shadow-[0_0_40px_hsl(218_100%_6%/0.06)]">
            <div className="relative h-48 overflow-hidden">
              <img
                src={getRoomImage(reservation.room_id)}
                alt={reservation.roomLabel}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.7)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge variant="gold">
                  {reservation.status.toUpperCase()}
                </Badge>
                <h2 className="font-serif text-2xl font-bold text-white mt-2">
                  {reservation.roomLabel}
                </h2>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-gold mt-0.5" />
                  <div>
                    <p className="label-caps text-muted-foreground mb-1">
                      Dates
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(reservation.start_date).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric' }
                      )}
                      {' – '}
                      {new Date(reservation.end_date).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {nights} {nights === 1 ? 'night' : 'nights'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="h-4 w-4 text-gold mt-0.5" />
                  <div>
                    <p className="label-caps text-muted-foreground mb-1">
                      Total
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      ${totalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${reservation.roomPrice}/night × {nights}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="h-4 w-4 text-gold mt-0.5" />
                  <div>
                    <p className="label-caps text-muted-foreground mb-1">
                      Reservation ID
                    </p>
                    <p className="text-sm font-medium text-foreground font-mono">
                      HA-{reservation.id}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <p className="text-sm text-muted-foreground">
                Room #{reservation.room_id} · Status:{' '}
                <span className="font-medium text-foreground capitalize">
                  {reservation.status}
                </span>
              </p>
            </div>
          </div>

          {/* Heritage quote */}
          <div className="mt-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-px w-16 bg-gold/30" />
            </div>
            <p className="font-serif text-lg italic text-muted-foreground max-w-md mx-auto">
              "The archive is not merely a record of the past, but a promise of
              the moments yet to be recorded."
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-11 px-6"
            >
              <Link to="/protected/reservations">
                View All Reservations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="cursor-pointer rounded-sm h-11 px-6"
            >
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
