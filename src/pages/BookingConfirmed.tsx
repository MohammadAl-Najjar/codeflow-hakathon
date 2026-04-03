import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import mockData from '@/lib/mock.json';
import { CheckCircle2, Calendar, MapPin, CreditCard, ArrowRight } from 'lucide-react';

export default function BookingConfirmed() {
  const latestBooking = mockData.reservations.active[0];

  return (
    <>
      <section className="px-4 py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-secondary/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <div className="label-caps text-gold mb-3">
              Entry Recorded
            </div>
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
                src={latestBooking.image}
                alt={latestBooking.roomTitle}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.7)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge variant="gold">CONFIRMED</Badge>
                <h2 className="font-serif text-2xl font-bold text-white mt-2">
                  {latestBooking.roomTitle}
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
                      {new Date(latestBooking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {' – '}
                      {new Date(latestBooking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gold mt-0.5" />
                  <div>
                    <p className="label-caps text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {latestBooking.location}
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
                      ${latestBooking.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="label-caps text-muted-foreground mb-1">
                    Confirmation
                  </p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    {latestBooking.confirmationNumber}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <p className="text-sm text-muted-foreground mb-1">
                {latestBooking.floor}
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
