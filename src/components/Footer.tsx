import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-[hsl(218_100%_6%)] text-[hsl(48_60%_90%)] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Top section */}
        <div className="flex flex-col items-center text-center mb-12">
          <h3 className="font-serif text-xl tracking-wide">HERITAGE ARCHIVE</h3>
          <p className="mt-3 max-w-md text-sm text-[hsl(48_20%_65%)] leading-relaxed">
            Preserving the art of hospitality through meticulous curation and
            timeless architecture.
          </p>
        </div>

        <Separator className="bg-[hsl(48_20%_20%)] mb-12" />

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-12">
          <div>
            <h4 className="label-caps text-[hsl(43_80%_42%)] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-sm text-[hsl(48_20%_65%)] hover:text-[hsl(48_60%_90%)] transition-colors"
                >
                  The Property
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms/luxury-suite"
                  className="text-sm text-[hsl(48_20%_65%)] hover:text-[hsl(48_60%_90%)] transition-colors"
                >
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-[hsl(48_20%_65%)] hover:text-[hsl(48_60%_90%)] transition-colors"
                >
                  Dining & Drinks
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-[hsl(48_20%_65%)] hover:text-[hsl(48_60%_90%)] transition-colors"
                >
                  Meetings & Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="label-caps text-[hsl(43_80%_42%)] mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-[hsl(48_20%_65%)] cursor-pointer hover:text-[hsl(48_60%_90%)] transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-[hsl(48_20%_65%)] cursor-pointer hover:text-[hsl(48_60%_90%)] transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-[hsl(48_20%_65%)] cursor-pointer hover:text-[hsl(48_60%_90%)] transition-colors">
                  Sustainability
                </span>
              </li>
              <li>
                <span className="text-sm text-[hsl(48_20%_65%)] cursor-pointer hover:text-[hsl(48_60%_90%)] transition-colors">
                  Accessibility
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="label-caps text-[hsl(43_80%_42%)] mb-4">Contact</h4>
            <div className="space-y-3">
              <div>
                <p className="label-caps text-[hsl(48_20%_55%)] mb-1">
                  Central Reservations
                </p>
                <p className="text-sm text-[hsl(48_60%_90%)]">
                  +1 (800) ARCHIVE
                </p>
              </div>
              <div>
                <p className="label-caps text-[hsl(48_20%_55%)] mb-1">
                  Visit Us
                </p>
                <p className="text-sm text-[hsl(48_20%_65%)] leading-relaxed">
                  12 Heritage Row, Old District
                  <br />
                  Westminster, SW1A 2AA
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="label-caps text-[hsl(43_80%_42%)] mb-4">Journal</h4>
            <p className="text-sm text-[hsl(48_20%_65%)] mb-3 leading-relaxed">
              Subscribe for archival updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border-b border-[hsl(48_20%_20%)] px-0 py-1.5 text-sm text-[hsl(48_60%_90%)] placeholder:text-[hsl(48_20%_40%)] focus:border-[hsl(43_80%_42%)] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-[hsl(48_20%_20%)] mb-8" />

        {/* Copyright */}
        <p className="text-center label-caps text-[hsl(48_20%_45%)]">
          © {new Date().getFullYear()} THE MODERN ARCHIVIST HOTEL GROUP. ALL
          RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
