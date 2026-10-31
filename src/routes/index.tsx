import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, BedSingle, BookOpen, Check, ChefHat, ChevronDown, Home, MapPin, Menu, MessageCircle, Moon, Phone, ShowerHead, Sun, Sunrise, Users, Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyrightNotice, residence, siteName, telHref, whatsappHref, walkingDirectionsHref } from "@/lib/residence";
import roomImageJpg from "@/assets/sample-shared-room.jpg";
import roomImageWebp from "@/assets/sample-shared-room.webp";
import hallImageJpg from "@/assets/sample-hall.jpg";
import hallImageWebp from "@/assets/sample-hall.webp";
import bathroomImageJpg from "@/assets/sample-bathroom.jpg";
import bathroomImageWebp from "@/assets/sample-bathroom.webp";
import foodImageJpg from "@/assets/sample-food.jpg";
import foodImageWebp from "@/assets/sample-food.webp";
import mapRouteImagePng from "@/assets/location.png";
import mapRouteImageWebp from "@/assets/location.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Girls PG near Elims College of Pharmacy | Terrace Suites Villadam"
      },
      {
        name: "description",
        content:
          "Standard terrace-level girls PG accommodation 200m (3 min walk) from Elims College of Pharmacy, Villadam, Thrissur. Non-AC shared rooms, attached bathrooms & home-cooked meals.",
      },
      {
        property: "og:title",
        content: "Girls PG near Elims College of Pharmacy | Terrace Suites"
      },
      {
        property: "og:description",
        content: "Standard terrace-level girls PG accommodation within 200m of Elims College of Pharmacy, Villadam. Non-AC rooms, attached bathrooms & home-cooked meals.",
      },
      { property: "og:image", content: "https://terracesuites.vercel.app/og-card.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },

      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Girls PG near Elims College of Pharmacy | Terrace Suites"
      },
      {
        name: "twitter:description",
        content: "200m walking distance from Elims College of Pharmacy, Villadam, Thrissur."
      },
      { name: "twitter:image", content: "https://terracesuites.vercel.app/og-card.png" },
    ],
  }),
  component: Index,
});

const navigation = [['Overview', '#overview'], ['Facilities', '#facilities'], ['Food', '#food'], ['Room sharing', '#suite-breakdown'], ['FAQs', '#faq']] as const;
const questions = [
  ['How many people share a room?', `There are ${residence.rooms} rooms. Each accommodates ${residence.residentsPerRoom.min}–${residence.residentsPerRoom.max} residents at a time.`],
  ['Are the rooms air-conditioned?', 'No. The rooms are standard non-AC accommodation, not luxury suites.'],
  ['What furniture is provided?', 'Beds, pillows and desks are provided. Please confirm any other items with me before moving in.'],
  ['Are the bathrooms attached?', 'Yes. The residence has two attached bathrooms, one for each room.'],
  ['Where is the accommodation located?', 'The rooms are built on my terrace / penthouse level, with one medium-sized shared hall.'],
  ['Are these photos of the actual property?', 'No. These are illustrative sample images. Original photographs will be added after they are taken.'],
  ['Is food provided?', 'Yes. We provide home-cooked breakfast, lunch and dinner for residents. Food is charged separately from the monthly rent — message me for the current food charge.'],
  ['How do I confirm rent and availability?', 'Message me on WhatsApp — I will confirm current rent, deposit, availability and house rules directly.'],
];

// Keeps the footer copyright on the live year: it re-checks while the page stays open
// and flips over on its own the moment a new year begins.
function CopyrightLine() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    let timer = 0;
    const sync = () => {
      const now = new Date();
      setYear(now.getFullYear());
      const nextYearStart = new Date(now.getFullYear() + 1, 0, 1).getTime();
      // Clamped so a long-lived tab keeps re-checking without overflowing the timer limit.
      timer = window.setTimeout(sync, Math.min(nextYearStart - now.getTime(), 86_400_000));
    };
    sync();
    return () => window.clearTimeout(timer);
  }, []);
  return <>{copyrightNotice(year)}</>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 350);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="residence-page bg-background text-on-surface font-body-md">
    <header className="sticky top-0 z-40 border-b border-outline-variant/40 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-5 lg:px-0">
        <a href="#overview" aria-label="Terrace Suites home" className="flex items-center gap-3">
          <Home className="size-8 text-primary" strokeWidth={1.4} />
          <span><span className="block font-title text-base font-semibold">{siteName}</span><span className="block text-[10px] text-primary">GIRLS RESIDENCE</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">{navigation.map(([label, href]) => <Button asChild variant="ghost" key={href}><a href={href}>{label}</a></Button>)}</nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden lg:inline-flex">
            <a href="#book-tour">Plan a visit <ArrowUpRight /></a>
          </Button>
          <Button asChild size="icon" variant="ghost" className="size-10" title="Chat on WhatsApp" aria-label="Chat on WhatsApp"><a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle /></a></Button>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="grid border-t border-outline-variant/40 px-5 pb-3 md:hidden">{[...navigation, ['Plan a visit', '#book-tour']].map(([label, href]) => <Button asChild variant="ghost" className="justify-start" key={href}><a href={href} onClick={() => setMenuOpen(false)}>{label}</a></Button>)}</nav>}
    </header>

    <main>
      <section id="overview" className="residence-hero relative isolate flex flex-col justify-center overflow-hidden text-inverse-on-surface">
        <picture>
          <source srcSet={roomImageWebp} type="image/webp"/>
          <img src={roomImageJpg} width={1536} height={1024} alt="Sample shared room with simple beds, pillows and desks; not the actual residence" className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover" />
        </picture>
        <div className="hero-shade absolute inset-0 -z-10" />
        <div className="hero-content mx-auto w-full max-w-6xl px-5 lg:px-0">
          <p className="hero-eyebrow flex items-center gap-3 text-xs font-medium uppercase"><span className="h-px w-8 bg-hero-accent" /> Girls residence · Terrace living</p>
          <h1 className="hero-title mt-5 font-editorial">Terrace <span className="block italic">Suites</span></h1>
          <p className="hero-tagline mt-5 text-lg font-medium">Your own little place above it all.</p>
          <p className="hero-description mt-3 max-w-sm text-sm leading-6 text-inverse-on-surface/85">Simple, shared non-AC rooms. Attached bathrooms.<br className="hidden sm:block" /> Everyday essentials, on our terrace.</p>
          <div className="hero-actions mt-7 flex flex-wrap items-center gap-5"><Button asChild size="lg" className="h-12 rounded-sm bg-hero-accent px-6 text-hero-accent-foreground shadow-none hover:bg-hero-accent/90"><a href="#book-tour">Plan a visit <ArrowUpRight /></a></Button><Button asChild variant="ghost" className="h-12 rounded-full border border-inverse-on-surface/40 px-5 text-inverse-on-surface hover:bg-inverse-on-surface/10"><a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> WhatsApp me</a></Button><Button asChild variant="ghost" className="h-12 rounded-none border-b border-inverse-on-surface/50 px-0 text-inverse-on-surface hover:bg-transparent hover:text-hero-accent"><a href="#facilities">Explore the residence <ArrowUpRight /></a></Button></div>
        </div>
        <div className="hero-footer mx-auto flex w-full max-w-6xl items-end justify-between gap-5 px-5 lg:px-0">
          <p className="max-w-xs text-[10px] leading-4 text-inverse-on-surface/80">Illustrative sample photo · Not the actual property</p>
          <Button asChild size="icon" variant="ghost" className="size-10 shrink-0 rounded-full border border-inverse-on-surface/40 text-inverse-on-surface hover:bg-inverse-on-surface/10" title="Explore the residence"><a href="#facilities" aria-label="Scroll to facilities"><ChevronDown className="size-5" /></a></Button>
        </div>
      </section>

      <section aria-label="Residence at a glance" className="border-b border-outline-variant/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-7 px-5 py-9 md:grid-cols-5 lg:px-0">{[
          [BedSingle, `${residence.rooms} rooms`, 'Standard shared rooms'],
          [Users, '2–3 residents', 'Per room'],
          [ShowerHead, `${residence.attachedBathrooms} attached bathrooms`, 'One for each room'],
          [Wind, 'Non-AC', 'Everyday accommodation'],
          [ChefHat, 'Home-cooked food', 'Breakfast, lunch & dinner'],
        ].map(([Icon, title, subtitle], i, all) => { const MetricIcon = Icon as typeof Home; return <div key={String(title)} className={`flex items-start gap-3 pr-3 ${i === all.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}><MetricIcon className="mt-1 size-5 shrink-0 text-primary" strokeWidth={1.5} /><div><p className="font-title text-base font-semibold">{String(title)}</p><p className="mt-1 text-xs text-on-surface-variant">{String(subtitle)}</p></div></div>; })}</div>
      </section>

      <section id="facilities" className="mx-auto max-w-6xl px-5 py-16 lg:px-0">
        <p className="text-xs font-semibold uppercase text-primary">Our facilities</p><h2 className="mt-3 font-title text-3xl font-semibold">A practical place to stay.</h2><p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">A small residence with the essentials for daily living and study. Standard rooms and simple facilities — without luxury extras.</p>
        <div className="mt-9 grid gap-7 md:grid-cols-3">{[
          { imageJpg: roomImageJpg, imageWebp: roomImageWebp, title: 'Two shared rooms', description: 'Two to three residents per room. Beds, pillows and desks are provided in these standard non-AC rooms.', alt: 'Illustrative standard bedroom with basic beds and desks' },
          { imageJpg: hallImageJpg, imageWebp: hallImageWebp, title: 'One medium-sized hall', description: 'A shared hall with a medium amount of space for spending time together outside the bedrooms.', alt: 'Illustrative medium-sized common hall with simple furnishings' },
          { imageJpg: bathroomImageJpg, imageWebp: bathroomImageWebp, title: 'Two attached bathrooms', description: 'An attached bathroom for each room, with standard everyday facilities rather than luxury fittings.', alt: 'Illustrative small bathroom with basic fittings' },
        ].map(item =>
          <figure key={item.title}>
            <div className="relative overflow-hidden rounded-lg">
              <picture>
                <source srcSet={item.imageWebp} type="image/webp" />
                <img loading="lazy"
                  src={item.imageJpg}
                  alt={`${item.alt};
                  sample photo, not the actual property`}
                  width={1024} height={768} className="aspect-4/3 w-full object-cover" />
              </picture>
              <span className="absolute bottom-3 left-3 bg-surface/95 px-2 py-1 text-[11px] text-on-surface">Sample photo</span></div>
            <figcaption className="pt-5">
              <h3 className="font-title text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
            </figcaption></figure>)}</div>
        <p className="mt-7 border-t border-outline-variant/40 pt-5 text-sm text-on-surface-variant">All photos shown are samples, not photographs of our residence. Actual rooms and furnishings may differ.</p>
      </section>

      <section id="food" className="border-t border-outline-variant/40">
        <div className="mx-auto grid max-w-6xl items-center gap-9 px-5 py-16 md:grid-cols-2 lg:px-0">
          <figure className="relative order-2 overflow-hidden rounded-lg md:order-1">
            <picture>
              <source srcSet={foodImageWebp} type="image/webp" />
              <img loading="lazy"
                src={foodImageJpg}
                alt="Illustrative home-cooked meals served to residents; sample photo, not an actual meal served here"
                width={1024} height={768}
                className="aspect-4/3 w-full object-cover" />
            </picture>
            <span className="absolute bottom-3 left-3 bg-surface/95 px-2 py-1 text-[11px] text-on-surface">Sample photo</span>
          </figure>
          <div className="order-1 md:order-2">
            <p className="text-xs font-semibold uppercase text-primary">Food</p>
            <h2 className="mt-3 font-title text-3xl font-semibold">Home-cooked meals, every day.</h2>
            <p className="mt-4 max-w-md leading-7 text-on-surface-variant">We provide home-cooked food for the residents staying with us: {residence.food.meals.join(', ')}.</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-3">{[
              [Sunrise, 'Breakfast', 'Every morning'], [Sun, 'Lunch', 'Every midday'], [Moon, 'Dinner', 'Every evening'],
            ].map(([Icon, title, subtitle]) => {
              const MealIcon = Icon as typeof Home;
              return <li key={String(title)} className="rounded-lg border border-outline-variant/50 px-4 py-4">
                <MealIcon className="size-5 text-primary" strokeWidth={1.5} />
                <p className="mt-3 font-title text-sm font-semibold">{String(title)}</p>
                <p className="mt-1 text-xs text-on-surface-variant">{String(subtitle)}</p>
              </li>;
            })}
            </ul>
            <p className="mt-6 border-t border-outline-variant/40 pt-5 text-sm text-on-surface-variant">Food is charged separately from the monthly rent. Message me for the current food charge.</p>
          </div>
        </div>
      </section>

      <section id="suite-breakdown" className="bg-surface-container-low">
        <div className="mx-auto grid max-w-6xl gap-9 px-5 py-16 md:grid-cols-2 lg:px-0"><div><p className="text-xs font-semibold uppercase text-primary">Room sharing</p><h2 className="mt-3 font-title text-3xl font-semibold">Space for two or three.</h2><p className="mt-4 max-w-md leading-7 text-on-surface-variant">Both rooms offer small-group shared accommodation on the terrace / penthouse level. Choose your stay after seeing the room and confirming availability.</p><Button asChild className="mt-6"><a href="#book-tour">Discuss your stay <ArrowUpRight /></a></Button></div><div className="border-y border-outline-variant/60">{[
          [Users, '2–3 people per room', 'Two rooms in total'], [BedSingle, 'Beds & pillows provided', 'Simple everyday furnishings'], [BookOpen, 'Desks provided', 'Space for your study essentials'], [Wind, 'Standard non-AC rooms', 'No luxury or biometric access facilities'],
        ].map(([Icon, title, subtitle]) => { const ItemIcon = Icon as typeof Home; return <div className="flex gap-4 border-b border-outline-variant/40 py-5 last:border-0" key={String(title)}><ItemIcon className="size-5 shrink-0 text-primary" /><div><p className="font-semibold">{String(title)}</p><p className="mt-1 text-sm text-on-surface-variant">{String(subtitle)}</p></div></div>; })}</div></div>
      </section>


      <section id="location" className="border-t border-outline-variant/40 bg-surface-container-low">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-0">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase text-primary">Location & Proximity</p>
            <h2 className="mt-3 font-title text-3xl font-semibold">Just 3 minutes from Elims Pharmacy College.</h2>
            <p className="mt-4 leading-7 text-on-surface-variant">
              Located right next to the campus, offering students an ultra-short and convenient daily walk.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="mt-9 grid gap-9 lg:grid-cols-3 items-start">
            {/* Nearby College Distance Cards & Action */}
            <div className="space-y-4 lg:col-span-1">
              <h3 className="font-title text-lg font-semibold">Campus distance</h3>

              {/* Elims College Card */}
              <div className="rounded-lg border border-outline-variant/60 bg-surface p-4 shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">ELIMS College of Pharmacy</p>
                  <p className="mt-1 text-xs text-on-surface-variant">Walking route</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-primary">200m</span>
                  <p className="mt-0.5 text-[11px] text-on-surface-variant">~3 mins walk</p>
                </div>
              </div>

              {/* Direct Directions Action Button */}
              <Button asChild variant="outline" className="w-full justify-center items-center gap-2">
                <a
                  href={walkingDirectionsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open Live Route in Maps</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>

            {/* Custom Map Route Image Preview */}

            <div className="relative lg:col-span-2 overflow-hidden rounded-lg border border-outline-variant/60 shadow-sm bg-surface-container-high/40">
              <picture>
                <source srcSet={mapRouteImageWebp} type="image/webp" />
                <img
                  src={mapRouteImagePng}
                  alt="Map showing 200m walking route from ELIMS College of Pharmacy to residence"
                  className="w-full h-auto max-h-87.5 sm:max-h-105 object-contain sm:object-cover mx-auto"
                />
              </picture>
              <div className="absolute bottom-3 left-3 bg-surface/95 px-2.5 py-1 rounded text-[11px] text-on-surface shadow-sm font-medium">
                📍 Verified Route: 200m (3 min walk)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase text-primary">Good to know</p>
        <h2 className="mt-3 mb-7 font-title text-3xl font-semibold">Your questions, answered.</h2>
        <div>{questions.map(([question, answer], i) => <div className="border-b border-outline-variant/50" key={question}>
          <Button variant="ghost" className="h-auto w-full justify-between gap-5 whitespace-normal rounded-none px-0 py-5 text-left text-base hover:bg-transparent" aria-expanded={openFaq === i} aria-controls={`answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <span>{question}</span>
            <ChevronDown className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
          </Button>
          {openFaq === i && <p id={`answer-${i}`} className="pb-5 text-sm leading-7 text-on-surface-variant">{answer}</p>}
        </div>)}
        </div>
      </section>

      <section id="book-tour" className="border-t border-outline-variant/40 bg-surface-container-low">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 lg:px-0">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Visit the residence</p>
            <h2 className="mt-3 font-title text-3xl font-semibold">See the rooms for yourself.</h2>
            <p className="mt-4 max-w-lg leading-7 text-on-surface-variant">Come over and look around the rooms, attached bathrooms and shared hall before deciding on your stay.</p>
          </div>
          <div>
            <h3 className="font-title text-lg font-semibold">Ask me directly</h3>
            <ul className="mt-4 space-y-4 text-sm text-on-surface-variant">
              {['Current room availability and sharing arrangement', 'Monthly rent, deposit and what is included', 'Visiting time, move-in date and house rules'].map(text => <li className="flex items-start gap-3" key={text}><Check className="size-4 shrink-0 text-primary" />{text}</li>)}</ul>
            <div className="mt-7">
              <Button asChild size="lg" className="h-12 rounded-sm px-6">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Message me on WhatsApp</a>
              </Button>
              <p className="mt-3 text-xs text-on-surface-variant">A short message is prefilled — edit it however you like before sending.</p>
            </div>
          </div>
        </div>
      </section>

    </main>


    <footer className="mt-8 border-t border-outline-variant/50 bg-surface-container-low">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-0">
        <div>
          <div className="flex items-center gap-3">
            <Home className="size-7 text-primary" strokeWidth={1.4} />
            <span><span className="block font-title text-sm font-semibold tracking-wide">TERRACE SUITES</span><span className="block text-[10px] uppercase text-primary">Girls residence</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-on-surface-variant">Standard terrace-level accommodation run by me: {residence.rooms} rooms for {residence.residentsPerRoom.min}–{residence.residentsPerRoom.max} residents each, {residence.attachedBathrooms} attached bathrooms and one medium-sized hall.</p>
        </div>
        <div>
          <h2 className="font-title text-sm font-semibold uppercase tracking-wide">Contact me</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={telHref()} className="inline-flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary"><Phone className="size-4 shrink-0 text-primary" strokeWidth={1.6} /><span className="font-semibold">{residence.contact.phone}</span></a></li>
            <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary"><MessageCircle className="size-4 shrink-0 text-primary" strokeWidth={1.6} />Message me on WhatsApp</a></li>
            <li className="flex items-start gap-2 text-on-surface-variant"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.6} /><span>{residence.contact.address || 'Full address shared when you message me on WhatsApp.'}</span></li>
          </ul>
        </div>
        <div>
          <h2 className="font-title text-sm font-semibold uppercase tracking-wide">On this page</h2>
          <ul className="mt-4 grid gap-2 text-sm">{[...navigation, ['Plan a visit', '#book-tour']].map(([label, href]) => <li key={href}><a href={href} className="text-on-surface-variant transition-colors hover:text-primary">{label}</a></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-outline-variant/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-on-surface-variant lg:px-0">
          <p><CopyrightLine /></p>
          <p>Photographs on this site are samples, not images of the property.</p>
        </div>
      </div>
    </footer>
    {showTop && <Button size="icon" className="fixed bottom-6 right-5 z-50 size-12 rounded-full shadow-lg" aria-label="Back to top" title="Back to top" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); setMenuOpen(false); }}><ArrowUp className="size-5" /></Button>}
  </div>;
}
