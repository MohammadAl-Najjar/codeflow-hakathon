import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import mockData from '@/lib/mock.json';
import { useAuth } from '@/hooks/useAuth';
import {
  ChevronRight,
  Maximize2,
  Users,
  Eye,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const room = mockData.rooms.find((r) => r.id === id);

  if (!room) {
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

  const handleReserve = () => {
    if (user) {
      navigate('/protected/booking-confirmed');
    } else {
      navigate('/login');
    }
  };

  const specs = [
    { icon: Maximize2, label: 'DIMENSIONS', value: room.dimensions },
    { icon: Users, label: 'OCCUPANCY', value: room.occupancy },
    { icon: Eye, label: 'VIEW', value: room.view },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[hsl(48_30%_93%)] px-4 py-3">
        <div className="mx-auto max-w-6xl flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Archive
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Premier Collection</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground font-medium">{room.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.6)] to-transparent" />
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content - 2 cols */}
            <div className="lg:col-span-2">
              <div className="label-caps text-gold mb-3">
                ARCHIVE / PREMIER COLLECTION
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                {room.title}
              </h1>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <div className="flex items-center gap-2 mb-1">
                      <spec.icon className="h-4 w-4 text-gold" />
                      <span className="label-caps text-muted-foreground">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-10" />

              {/* Quote */}
              <div className="flex gap-4 mb-10">
                <div className="flex-shrink-0 w-1 bg-gold/30 rounded-full" />
                <p className="font-serif text-xl italic text-muted-foreground leading-relaxed">
                  "{room.quote}"
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-4">
                {room.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {room.longDescription}
              </p>

              {/* Amenities */}
              <div className="mt-10">
                <h3 className="label-caps text-foreground mb-4">
                  Suite Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="rounded-sm py-1.5 px-3">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-sm p-8 shadow-[0_0_40px_hsl(218_100%_6%/0.06)]">
                <div className="label-caps text-gold mb-1">
                  Rate Starting At
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-4xl font-bold text-foreground">
                    ${room.price}
                  </span>
                  <span className="label-caps text-muted-foreground">
                    {room.priceUnit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  No charge until check-in
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="label-caps text-muted-foreground mb-1 block">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-muted-foreground mb-1 block">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-muted-foreground mb-1 block">
                      Guests
                    </label>
                    <select className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground focus:border-gold focus:outline-none transition-colors">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={handleReserve}
                  className="w-full cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-12"
                >
                  Reserve This Suite
                </Button>
              </div>

              {/* Archivist's Note */}
              <div className="mt-8 bg-[hsl(48_30%_93%)] rounded-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-gold" />
                  <h4 className="label-caps text-foreground">
                    The Archivist's Note
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {room.archivistNote}
                </p>
                <button className="mt-3 text-sm text-gold hover:underline cursor-pointer flex items-center gap-1 group">
                  Read Full History
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
