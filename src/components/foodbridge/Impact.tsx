import { Utensils, Store, HeartHandshake, Leaf, ArrowRight, Sprout, Users, Recycle } from "lucide-react";
import { useCountUp, useInView } from "./hooks";

const METRICS = [
  { icon: Utensils, value: 48000, suffix: "+", label: "Meals rescued" },
  { icon: Store, value: 320, suffix: "", label: "Food donors" },
  { icon: HeartHandshake, value: 85, suffix: "", label: "NGO partners" },
  { icon: Leaf, value: 21, suffix: " t", label: "Food waste prevented" },
];

function Metric({ m, start, i }: { m: (typeof METRICS)[number]; start: boolean; i: number }) {
  const v = useCountUp(m.value, start);
  const I = m.icon;
  return (
    <div
      className="group rounded-3xl bg-primary-foreground/5 p-7 ring-1 ring-primary-foreground/10 transition duration-500 hover:-translate-y-1 hover:bg-primary-foreground/10"
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <I className="h-7 w-7 text-fresh" />
      <p className="mt-8 font-serif text-5xl md:text-6xl">
        {v.toLocaleString("en-IN")}
        <span className="text-accent">{m.suffix}</span>
      </p>
      <p className="mt-2 text-sm opacity-75">{m.label} <span className="opacity-70">(illustrative)</span></p>
    </div>
  );
}

export function Impact() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section id="impact" className="bg-primary px-5 py-24 text-primary-foreground md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl text-4xl md:text-6xl">Every rescued meal tells a story.</h2>
          <p className="w-fit rounded-full border border-primary-foreground/25 px-4 py-2 text-xs font-semibold">
            Illustrative sample metrics, not real data
          </p>
        </div>
        <div ref={ref} className="mt-10 md:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => <Metric key={m.label} m={m} start={inView} i={i} />)}
        </div>

        <div className="reveal mt-14 rounded-3xl bg-primary-foreground/5 p-7 ring-1 ring-primary-foreground/10">
          <p className="text-xs uppercase tracking-widest opacity-70">The ripple effect</p>
          <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            {[
              [Recycle, "Surplus food shared", "instead of thrown away"],
              [Users, "People nourished", "through local NGOs"],
              [Sprout, "Less landfill waste", "and fewer emissions from rotting food"],
            ].map(([Icon, t, d], i, arr) => {
              const I = Icon as typeof Leaf;
              return (
                <div key={t as string} className="flex items-center gap-4 md:flex-1">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fresh text-fresh-foreground"><I className="h-6 w-6" /></span>
                  <div>
                    <p className="font-serif text-xl">{t as string}</p>
                    <p className="text-sm opacity-70">{d as string}</p>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="ml-auto hidden h-5 w-5 opacity-50 md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
