import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";

export type ActionKind = "donate" | "login" | "ngo" | "volunteer";

const CONFIG: Record<ActionKind, { title: string; desc: string; fields: { name: string; label: string; type?: string; placeholder: string }[]; submit: string; success: string }> = {
  donate: {
    title: "Donate surplus food",
    desc: "Tell us what you have and when it can be picked up.",
    fields: [
      { name: "name", label: "Your name or business", placeholder: "Green Leaf Restaurant" },
      { name: "food", label: "Food available", placeholder: "Vegetable meals, bread…" },
      { name: "qty", label: "Approx. quantity", placeholder: "25 meal portions" },
      { name: "location", label: "Pickup location", placeholder: "Bengaluru" },
    ],
    submit: "Submit donation",
    success: "Your demo donation listing was created. In a live version, nearby NGOs would be notified.",
  },
  login: {
    title: "Welcome back",
    desc: "Log in to manage your donations and pickups.",
    fields: [
      { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    ],
    submit: "Log in",
    success: "Demo login successful. Accounts are not active in this preview.",
  },
  ngo: {
    title: "Become an NGO partner",
    desc: "Register your organisation to receive food donations.",
    fields: [
      { name: "org", label: "Organisation name", placeholder: "Community Care Kitchen" },
      { name: "email", label: "Contact email", type: "email", placeholder: "hello@ngo.org" },
      { name: "city", label: "City", placeholder: "Bengaluru" },
    ],
    submit: "Apply to partner",
    success: "Demo application received. In a live version, our team would verify your organisation.",
  },
  volunteer: {
    title: "Volunteer with us",
    desc: "Help with pickups, sorting and deliveries in your area.",
    fields: [
      { name: "name", label: "Full name", placeholder: "Your name" },
      { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      { name: "city", label: "City", placeholder: "Bengaluru" },
    ],
    submit: "Sign me up",
    success: "Demo sign-up received. Thank you for wanting to help!",
  },
};

const Ctx = createContext<(k: ActionKind) => void>(() => {});
export const useAction = () => useContext(Ctx);

export function ActionProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<ActionKind | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const open = (k: ActionKind) => {
    setKind(k);
    setState("idle");
    setError(null);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const empty = [...data.values()].some((v) => !String(v).trim());
    if (empty) {
      setError("Please fill in every field.");
      return;
    }
    const email = data.get("email");
    if (email && !/^\S+@\S+\.\S+$/.test(String(email))) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  };

  const c = kind ? CONFIG[kind] : null;

  return (
    <Ctx.Provider value={open}>
      {children}
      <Dialog open={!!kind} onOpenChange={(o) => !o && setKind(null)}>
        <DialogContent className="rounded-3xl border-border bg-background sm:max-w-md">
          {c && (
            <>
              <DialogHeader>
                <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  Demo form · Nothing is sent
                </span>
                <DialogTitle className="font-serif text-3xl font-normal">{c.title}</DialogTitle>
                <DialogDescription>{c.desc}</DialogDescription>
              </DialogHeader>
              {state === "done" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                  <CheckCircle2 className="h-12 w-12 text-fresh" />
                  <p className="text-foreground">{c.success}</p>
                  <button className="btn-base btn-primary mt-2" onClick={() => setKind(null)}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  {c.fields.map((f) => (
                    <label key={f.name} className="block text-sm font-medium">
                      {f.label}
                      <input
                        name={f.name}
                        type={f.type ?? "text"}
                        placeholder={f.placeholder}
                        className="mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-fresh focus:ring-2 focus:ring-ring/40"
                      />
                    </label>
                  ))}
                  {error && (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  )}
                  <button type="submit" disabled={state === "loading"} className="btn-base btn-primary w-full">
                    {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {state === "loading" ? "Submitting…" : c.submit}
                  </button>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
