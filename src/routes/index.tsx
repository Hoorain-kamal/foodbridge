import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Heart, Share2, Users, Truck, ClipboardList, Search, PackageCheck, Quote } from "lucide-react";
import hero from "@/assets/hero-food.jpg";
import wasted from "@/assets/food-wasted.jpg";
import needed from "@/assets/food-needed.jpg";
import { ActionProvider, useAction } from "@/components/foodbridge/ActionDialog";
import { Navbar, Footer } from "@/components/foodbridge/Layout";
import { MatchDemo } from "@/components/foodbridge/MatchDemo";
import { Impact } from "@/components/foodbridge/Impact";
import { useRevealAll } from "@/components/foodbridge/hooks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodBridge — Good food deserves a second chance" },
      { name: "description", content: "FoodBridge connects surplus food donors with NGOs and communities in need. Bridging the gap between surplus food and empty plates." },
      { property: "og:title", content: "FoodBridge — Good food deserves a second chance" },
      { property: "og:description", content: "Bridging the gap between surplus food and empty plates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ActionProvider>
      <Page />
    </ActionProvider>
  ),
});

function Page() {
  useRevealAll();
  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <MatchDemo />
        <Impact />
        <Stories />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">{children}</p>;
}

function Hero() {
  const action = useAction();
  return (
    <section className="px-5 pt-8 pb-20 md:px-8 md:pt-14">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-fresh" /> Connecting food donors, NGOs & communities.
          </p>
          <h1 className="mt-7 text-5xl leading-[1.02] sm:text-6xl xl:text-8xl">
            Good food should <em className="text-fresh">never</em> go to waste.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Every day, perfectly good food goes uneaten while communities go hungry. FoodBridge connects surplus food with people who need it, turning everyday excess into meaningful impact.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => action("donate")} className="btn-base btn-accent">
              Donate Surplus Food <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#mission" className="btn-base btn-outline">Explore Our Mission</a>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] rounded-tl-[8rem] shadow-lift">
            <img src={hero} alt="Volunteers handing over a crate of fresh vegetables beside bread and fruit at a food donation table" width={1200} height={1504} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="float-slow absolute -bottom-6 left-4 max-w-[15rem] rounded-3xl bg-card p-5 shadow-lift sm:-left-8">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"><Heart className="h-5 w-5" /></span>
            <p className="mt-3 font-serif text-2xl">Every meal matters.</p>
            <p className="text-sm text-muted-foreground">Small actions. Big impact.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="mission" className="bg-secondary px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-6xl">Too much food. Too many empty plates.</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Restaurants, shops and events often end the day with food that is still fresh and safe. Without an easy way to share it, much of it is thrown out, while just a few streets away, families and shelters struggle to put a meal on the table.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { img: wasted, tag: "Food wasted", alt: "Bags of bread and fresh produce discarded in a waste bin", text: "Edible surplus ends up in bins and landfills." },
            { img: needed, tag: "Food needed", alt: "Volunteers serving warm meals to families at a community kitchen", text: "Community kitchens work every day to feed more people." },
          ].map((c, i) => (
            <figure key={c.tag} className="reveal group relative overflow-hidden rounded-3xl shadow-soft" style={{ transitionDelay: `${i * 120}ms` }}>
              <img src={c.img} alt={c.alt} width={1024} height={768} loading="lazy" className={`aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? "grayscale-[40%]" : ""}`} />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 p-5 backdrop-blur">
                <p className={`font-serif text-2xl ${i === 0 ? "text-accent" : "text-fresh"}`}>{c.tag}</p>
                <p className="text-sm text-muted-foreground">{c.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <blockquote className="reveal mx-auto mt-16 max-w-3xl text-center font-serif text-2xl italic leading-snug md:text-4xl">
          “Food waste is not just an environmental problem. It is a missed opportunity to nourish someone.”
        </blockquote>
      </div>
    </section>
  );
}

function Solution() {
  const items = [
    { icon: Share2, title: "Share Surplus", text: "Restaurants, grocery stores, event organizers, and households can list excess food." },
    { icon: Users, title: "Connect Communities", text: "Verified NGOs and community kitchens can discover available food donations." },
    { icon: Truck, title: "Deliver With Care", text: "Coordinate timely pickups and deliveries to reduce food waste." },
  ];
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <Eyebrow>Our solution</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-6xl">Turning surplus into sustenance.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            FoodBridge creates a simple connection between people who have extra food and organizations that can distribute it safely to those who need it.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <article key={it.title} className="reveal group rounded-3xl bg-card p-8 shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-lift" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-fresh group-hover:text-fresh-foreground">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-8 text-2xl">{it.title}</h3>
              <p className="mt-3 text-muted-foreground">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: ClipboardList, title: "List Your Food", text: "Donors share details about surplus food, quantity, location, and pickup time." },
    { n: "02", icon: Search, title: "Find a Match", text: "FoodBridge helps connect donations with suitable NGOs and recipients." },
    { n: "03", icon: PackageCheck, title: "Deliver & Make an Impact", text: "Coordinate pickup and confirm the donation, helping good food reach people instead of landfills." },
  ];
  return (
    <section id="how" className="bg-secondary px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl md:text-6xl">From surplus to smiles in three simple steps.</h2>
        </div>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <span className="absolute top-8 right-[16%] left-[16%] hidden border-t-2 border-dashed border-fresh/50 md:block" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.n} className="reveal relative flex gap-5 md:flex-col md:items-center md:text-center" style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ring-8 ring-secondary">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-lg text-accent">Step {s.n}</p>
                <h3 className="mt-1 text-2xl">{s.title}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    { who: "Ravi, restaurant owner", role: "Food donor", quote: "At closing we used to scrape trays of good dal and rice into the bin. Now I post it in two minutes, and by evening it's on someone's plate. My staff feel proud of every batch we share." },
    { who: "Meera, NGO volunteer", role: "Community kitchen coordinator", quote: "Knowing exactly what's coming and when changed everything. We plan our menus around real donations and reach more families each week without stretching our budget." },
    { who: "Anand, community member", role: "Meal recipient", quote: "After losing work, a warm, healthy meal felt like someone saying, you matter. It gave me the strength to keep going while I got back on my feet." },
  ];
  return (
    <section id="stories" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Community stories</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-4xl md:text-6xl">Small acts. Extraordinary impact.</h2>
          </div>
          <p className="text-sm text-muted-foreground">Illustrative stories, not real testimonials.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <figure key={s.who} className={`reveal flex flex-col rounded-3xl p-8 shadow-soft transition duration-500 hover:-translate-y-2 ${i === 1 ? "bg-primary text-primary-foreground md:-translate-y-6 md:hover:-translate-y-8" : "bg-card"}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <Quote className={`h-8 w-8 ${i === 1 ? "text-fresh" : "text-accent"}`} />
              <blockquote className="mt-6 flex-1 font-serif text-xl leading-relaxed">{s.quote}</blockquote>
              <figcaption className="mt-8 border-t border-current/15 pt-5">
                <p className="font-semibold">{s.who}</p>
                <p className="text-sm opacity-70">{s.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const action = useAction();
  return (
    <section className="px-5 pb-24 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-20 text-center text-primary-foreground md:px-16 md:py-28">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fresh/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden />
        <div className="relative">
          <ArrowDown className="mx-auto h-6 w-6 text-fresh" />
          <h2 className="reveal mx-auto mt-6 max-w-4xl text-4xl md:text-7xl">Be the reason a meal reaches someone.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-85">
            Your extra food could become someone’s next meal. Join FoodBridge and help build a world where good food finds its way to those who need it.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => action("donate")} className="btn-base btn-accent">Donate Food</button>
            <button onClick={() => action("ngo")} className="btn-base btn-light">Become an NGO Partner</button>
            <button onClick={() => action("volunteer")} className="btn-base btn-outline-light">Volunteer With Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}
