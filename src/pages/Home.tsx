import { Link } from 'react-router';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Footer from '@/components/Footer';
import mockData from '@/lib/mock.json';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <img
          src="/images/hotel-hero.png"
          alt="Heritage Archive Hotel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.9)] via-[hsl(218_100%_6%/0.3)] to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-sm bg-[hsl(43_80%_42%/0.15)] border border-[hsl(43_80%_42%/0.3)] px-4 py-1.5 mb-6">
              <span className="label-caps text-[hsl(43_80%_42%)]">
                Established 1912
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
              A Legacy of
              <br />
              <span className="text-[hsl(43_80%_55%)]">Elegance</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-white/60 leading-relaxed">
              Born from the vision of the early 20th century's most celebrated
              architects, the Heritage Archive stands as a living testament to
              an era where detail was paramount.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {user ? (
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-12 px-8"
                >
                  <Link to="/protected/reservations">My Reservations</Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm h-12 px-8"
                  >
                    <Link to="/signup">Begin Your Stay</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="cursor-pointer rounded-sm h-12 px-8 border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link to="/rooms/luxury-suite">View Rooms</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage Section */}
      <section className="px-4 py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
            <div>
              <div className="label-caps text-gold mb-4">Archivist's Note</div>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight">
                Our Heritage
              </h2>
              <div className="mt-8 flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gold/30 rounded-full" />
                <p className="font-serif text-lg italic text-muted-foreground leading-relaxed">
                  "Every stone here tells a story of a thousand arrivals."
                </p>
              </div>
              <p className="mt-8 text-muted-foreground leading-relaxed">
                Born from the vision of the early 20th century's most celebrated
                architects, the Heritage Archive stands as a living testament to
                an era where detail was paramount and luxury was silent.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We have meticulously restored every wing, preserving the original
                hand-carved oak panels and the Italian marble flooring that has
                graced the feet of royalty and luminaries for over a century.
              </p>
              <Button
                variant="ghost"
                className="mt-8 cursor-pointer text-foreground hover:text-gold group p-0 h-auto gold-underline"
              >
                View Historical Timeline
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="relative">
              <img
                src="/images/fine-dining.png"
                alt="Heritage dining room"
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
              <div className="absolute -bottom-4 -left-4 bg-card px-6 py-4 rounded-sm shadow-lg max-w-xs">
                <p className="font-serif text-sm italic text-foreground leading-relaxed">
                  "A stay here is not just a booking; it is an entry into our
                  ledger of history."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="px-4 py-24 sm:py-32 bg-[hsl(48_30%_93%)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="label-caps text-gold mb-4">Premier Collection</div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              Accommodations
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockData.rooms.map((room) => (
              <Link
                key={room.id}
                to={`/rooms/${room.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.7)] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {room.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {room.subtitle}
                    </p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[hsl(43_80%_55%)]">
                        ${room.price}
                      </span>
                      <span className="label-caps text-white/50">
                        {room.priceUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-4 py-24 sm:py-32 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="label-caps text-gold mb-4">Curated Experiences</div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-16">
            Experience
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {mockData.facilities.map((facility) => (
              <div key={facility.id} className="group relative overflow-hidden rounded-sm">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(218_100%_6%/0.8)] via-[hsl(218_100%_6%/0.2)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="label-caps text-[hsl(43_80%_55%)] mb-2">
                    {facility.id === 'fine-dining' ? 'FINE DINING' : 'REJUVENATION'}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {facility.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 max-w-md leading-relaxed">
                    {facility.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Memoirs */}
      <section className="px-4 py-24 sm:py-32 bg-[hsl(218_100%_6%)] text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="label-caps text-[hsl(43_80%_55%)] mb-4">
              Guest Memoirs
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {mockData.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative p-8 rounded-sm bg-white/5 border border-white/10"
              >
                <Quote className="h-8 w-8 text-[hsl(43_80%_42%)] mb-4 opacity-50" />
                <p className="font-serif text-base italic text-white/80 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[hsl(43_80%_42%)] text-[hsl(43_80%_42%)]"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-white">
                  {testimonial.author}
                </p>
                <p className="text-xs text-white/50">{testimonial.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-24 sm:py-32 bg-[hsl(48_30%_93%)]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="label-caps text-gold mb-4">The Archive Journal</div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Stay Connected
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Receive seasonal archive reports, exclusive booking windows, and
            historical insights from our curators.
          </p>
          <div className="mt-8 flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border-b-2 border-border px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
            <Button className="cursor-pointer heritage-gradient text-primary-foreground hover:opacity-90 rounded-sm px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
