import { useEffect, useRef, useState } from "react";
import { Store, HeartHandshake, MapPin, Clock, Utensils, Package, Sparkles, Check, RotateCcw } from "lucide-react";

const STEPS = [
  "Reading donation details…",
  "Checking nearby verified NGOs…",
  "Matching capacity & pickup time…",
  "Match found!",
];

export function MatchDemo() {
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    setStep(0);
    timers.current = [1, 2, 3].map((i) => window.setTimeout(() => setStep(i), i * 1100));
  };
  const running = step >= 0 && step < 3;
  const done = step === 3;

  return (
    <section className="px-5 py-24 md:px-8" aria-labelledby="demo-h">
      <div className="mx-auto max-w-6xl">
        <div className="reveal text-center">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            Interactive demo · Sample data
          </span>
          <h2 id="demo-h" className="mx-auto mt-5 max-w-2xl text-4xl md:text-6xl">See how FoodBridge connects food.</h2>
        </div>

        <div className="reveal mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-3xl bg-card p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary"><Store className="h-6 w-6" /></span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Donor</p>
                <p className="font-serif text-xl">Green Leaf Restaurant</p>
              </div>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                [Utensils, "Food", "Fresh vegetable meals"],
                [Package, "Quantity", "25 meal portions"],
                [MapPin, "Location", "Bengaluru"],
                [Clock, "Pickup", "Today, 4:30 PM"],
              ].map(([Icon, k, v]) => {
                const I = Icon as typeof Store;
                return (
                  <div key={k as string} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                    <dt className="flex items-center gap-2 text-muted-foreground"><I className="h-4 w-4" />{k as string}</dt>
                    <dd className="font-semibold">{v as string}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative h-1 w-40 overflow-hidden rounded-full bg-secondary lg:w-32" aria-hidden>
              {running && <span className="travel-dot absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />}
              {done && <span className="absolute inset-0 bg-fresh" />}
            </div>
            <div className={`grid h-16 w-16 place-items-center rounded-full transition-all duration-500 ${done ? "scale-110 bg-fresh text-fresh-foreground" : "bg-primary text-primary-foreground"}`}>
              {done ? <Check className="h-8 w-8" /> : <Sparkles className={`h-7 w-7 ${running ? "animate-pulse" : ""}`} />}
            </div>
            <p className="min-h-6 text-center text-sm font-semibold" aria-live="polite">
              {step >= 0 ? STEPS[step] : "Ready to match"}
            </p>
          </div>

          <div className={`rounded-3xl p-7 shadow-soft transition-all duration-700 ${done ? "bg-primary text-primary-foreground" : "bg-card"}`}>
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${done ? "bg-fresh" : "bg-secondary"}`}><HeartHandshake className="h-6 w-6" /></span>
              <div>
                <p className="text-xs uppercase tracking-widest opacity-70">Recipient</p>
                <p className="font-serif text-xl">{done ? "Community Care Kitchen" : "Searching…"}</p>
              </div>
            </div>
            {done ? (
              <div className="mt-6 space-y-3 text-sm">
                <p className="inline-flex items-center gap-2 rounded-full bg-fresh px-3 py-1 font-semibold text-fresh-foreground"><Check className="h-4 w-4" /> Match found!</p>
                <p className="opacity-85">Community Care Kitchen has capacity for 25 portions and can collect at 4:30 PM. In the real platform, both sides would confirm the pickup and the donor would see the delivery status.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-3" aria-hidden>
                {[80, 60, 70].map((w, i) => (
                  <div key={i} className={`h-3 rounded-full bg-secondary ${running ? "animate-pulse" : ""}`} style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <button onClick={run} disabled={running} className="btn-base btn-accent">
            {done ? <RotateCcw className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {done ? "Run it again" : running ? "Matching…" : "Simulate a Food Match"}
          </button>
          <p className="text-xs text-muted-foreground">This is a simulation. No real donation or delivery takes place.</p>
        </div>
      </div>
    </section>
  );
}
