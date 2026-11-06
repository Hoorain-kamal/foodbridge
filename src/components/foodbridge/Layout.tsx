import { useEffect, useState } from "react";
import { Leaf, Menu, X, Instagram, Linkedin } from "lucide-react";
import { useAction } from "./ActionDialog";

const NAV = [
  { href: "#mission", label: "Our Mission" },
  { href: "#how", label: "How It Works" },
  { href: "#impact", label: "Our Impact" },
  { href: "#stories", label: "Stories" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="FoodBridge home">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${light ? "bg-fresh" : "bg-primary"}`}>
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </span>
      <span className={`font-serif text-2xl ${light ? "text-primary-foreground" : "text-primary"}`}>FoodBridge</span>
    </a>
  );
}

export function Navbar() {
  const action = useAction();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-background"}`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm font-medium text-muted-foreground transition hover:text-primary">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={() => action("login")} className="btn-base px-4 text-primary hover:bg-secondary">
            Log In
          </button>
          <button onClick={() => action("donate")} className="btn-base btn-accent">
            Donate Food
          </button>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-secondary lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-serif text-2xl">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => { setOpen(false); action("login"); }} className="btn-base btn-outline">
              Log In
            </button>
            <button onClick={() => { setOpen(false); action("donate"); }} className="btn-base btn-accent">
              Donate Food
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const action = useAction();
  return (
    <footer className="bg-background px-5 pt-16 pb-8 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-serif text-xl italic text-muted-foreground">Good food deserves a second chance.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3 text-sm font-medium">
            {NAV.slice(0, 3).map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-fresh">{n.label}</a></li>
            ))}
            <li><a href="mailto:hello@foodbridge.org" className="hover:text-fresh">Contact</a></li>
            <li><button onClick={() => action("volunteer")} className="hover:text-fresh">Volunteer</button></li>
          </ul>
        </nav>
        <div className="md:justify-self-end">
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="FoodBridge on Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-secondary transition hover:bg-primary hover:text-primary-foreground">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="FoodBridge on LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-secondary transition hover:bg-primary hover:text-primary-foreground">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Built with purpose for a more sustainable future.</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} FoodBridge. A concept project for the OSCode AI Prompt Battle.
      </div>
    </footer>
  );
}
