import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { getRoomTypes, type RoomType } from '@/lib/rooms/getRoomType';
import { findAvailableRoom } from '@/lib/rooms/findAvailableRoom';
import { addReservation } from '@/lib/rooms/addReservation';
import { getRoomImage } from '@/lib/rooms/roomAssets';
import {
  ChevronRight,
  Maximize2,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const typeId = Number(id);
    if (isNaN(typeId)) {
      setLoading(false);
      return;
    }

    getRoomTypes()
      .then((types) => {
        const found = types.find((t) => t.id === typeId);
        setRoomType(found ?? null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleReserve = async () => {
    setBookingError('');

    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setBookingError('Please select both check-in and check-out dates.');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setBookingError('Check-out date must be after check-in date.');
      return;
    }

    if (new Date(checkIn) < new Date(new Date().toDateString())) {
      setBookingError('Check-in date cannot be in the past.');
      return;
    }

    if (!roomType) return;

    setIsBooking(true);
    try {
      const availableRoomId = await findAvailableRoom(roomType.id, checkIn, checkOut);

      if (!availableRoomId) {
        setBookingError(
          'Sorry, all rooms of this type are fully booked for the selected dates. Please try different dates.'
        );
        setIsBooking(false);
        return;
      }

      const reservation = await addReservation(
        availableRoomId,
        user.id,
        checkIn,
        checkOut,
        'confirmed'
      );

      // Navigate to confirmation with the reservation data
      navigate('/protected/booking-confirmed', {
        state: {
          reservation: {
            ...reservation,
            roomLabel: roomType.label,
            roomPrice: roomType.price,
          },
        },
      });
    } catch (err: any) {
      console.error('Booking error:', err);
      setBookingError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Today's date string for min attribute
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!roomType) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Room Not Found
          </h2>
          <p className="mt-2 text-muted-foreground">
            The room you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-4 cursor-pointer">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculate total nights & price
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const totalPrice = nights * roomType.price;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[hsl(48_30%_93%)] px-4 py-3">
        <div className="mx-auto max-w-6xl flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Archive
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Premier Collection</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground font-medium">{roomType.label}</span>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={getRoomImage(roomType.id)}
          alt={roomType.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.6)] to-transparent" />
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="label-caps text-gold mb-3">
                ARCHIVE / PREMIER COLLECTION
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                {roomType.label}
              </h1>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-gold" />
                    <span className="label-caps text-muted-foreground">
                      CAPACITY
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Up to {roomType.capacity}{' '}
                    {roomType.capacity === 1 ? 'Guest' : 'Guests'}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Maximize2 className="h-4 w-4 text-gold" />
                    <span className="label-caps text-muted-foreground">
                      RATE
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ${roomType.price} / night
                  </p>
                </div>
              </div>

              <Separator className="my-10" />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4">
                Experience the timeless elegance of our {roomType.label}. Each
                room has been meticulously restored to preserve its original
                architectural heritage while incorporating modern comforts for
                the discerning traveler.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From hand-carved oak panels to Italian marble appointments,
                every detail has been curated to create an unforgettable stay
                that honors over a century of hospitality excellence.
              </p>
            </div>

            {/* Sidebar - Booking widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-sm p-8 shadow-[0_0_40px_hsl(218_100%_6%/0.06)]">
                <div className="label-caps text-gold mb-1">Rate</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-4xl font-bold text-foreground">
                    ${roomType.price}
                  </span>
                  <span className="label-caps text-muted-foreground">
                    / NIGHT
                  </span>
                </div>

                <div className="space-y-4 mb-6 mt-6">
                  <div>
                    <label className="label-caps text-muted-foreground mb-1 block">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        setBookingError('');
                      }}
                      className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-muted-foreground mb-1 block">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || today}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        setBookingError('');
                      }}
                      className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Price summary */}
                {nights > 0 && (
                  <div className="mb-6 p-4 bg-background rounded-sm">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>
                        ${roomType.price} × {nights}{' '}
                        {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span className="font-medium text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm font-semibold text-foreground">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Error */}
                {bookingError && (
                  <div className="mb-4 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-sm p-3">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{bookingError}</span>
                  </div>
                )}

                <Button
                  onClick={handleReserve}
                  disabled={isBooking}
                  className="w-full cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-12"
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reserving...
                    </>
                  ) : (
                    'Reserve This Room'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
