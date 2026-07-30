import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Sparkles, Home } from "lucide-react";
import logo from "@/assets/ZOHAR-1.png";

export const Route = createFileRoute("/volunteer")({
  component: VolunteerRegistration,
  head: () => ({
    meta: [
      { title: "Volunteer Registration | INSPIRE 1.0" },
      { name: "description", content: "Register to volunteer at INSPIRE 1.0." },
    ],
  }),
});

const TEAMS = [
  "Registration & Accreditation",
  "Protocol & Guest Relations",
  "Media & Photography",
  "Videography",
  "Venue Setup",
  "Technical Support",
  "Ushering",
  "Sponsorship & Partnerships",
];

function VolunteerRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const selectedTeams = TEAMS.filter((team) => fd.get(team) === "on");

    if (selectedTeams.length === 0) {
      setErrorMsg("Please select at least one team you would like to serve in.");
      setSubmitting(false);
      return;
    }

    const payload = {
      full_name: String(fd.get("full_name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      gender: String(fd.get("gender") ?? ""),
      age: String(fd.get("age") ?? ""),
      occupation: String(fd.get("occupation") ?? ""),
      state: String(fd.get("state") ?? ""),
      city: String(fd.get("city") ?? ""),
      available_throughout: fd.get("available_throughout") === "Yes",
      commit_meetings: fd.get("commit_meetings") === "Yes",
      teams: selectedTeams,
    };

    try {
      const res = await fetch("/api/public/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error || "Could not save your registration. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="h-20 w-20 grid place-items-center text-mint-foreground">
              <img src={logo} className="h-20 w-20" />
            </span>
          </a>
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
            <Home className="h-4 w-4" /> Back to Home
          </a>
        </div>
      </header>

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-flame" />
              Join the Team
            </div>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
              Volunteer <span className="text-mint">Registration</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Help us build an unforgettable experience at INSPIRE 1.0. Fill out the form below to join our volunteer team.
            </p>
          </div>

          {submitted ? (
            <div className="mt-12 rounded-3xl border border-mint/40 bg-mint/10 p-8 sm:p-12 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-mint grid place-items-center text-mint-foreground animate-pulse-ring">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">Application Received!</h3>
              <p className="mt-3 text-base text-muted-foreground">
                Thank you for offering your time and skills. We will review your application and be in touch soon regarding orientation and meetings.
              </p>
              <a href="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-mint-foreground shadow-mint hover:opacity-95 transition">
                Return to Homepage
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-8">
              <FormGroup label="Personal Information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="full_name" required />
                  <Field label="Email Address" name="email" type="email" required />
                  <Field label="Phone Number (WhatsApp Preferred)" name="phone" type="tel" required className="sm:col-span-2" />
                  <Select label="Gender" name="gender" options={["Male", "Female", "Prefer not to say"]} required />
                  <Select label="Age Range" name="age" options={["16–20", "21–25", "26–30", "31–35", "36+"]} required />
                </div>
              </FormGroup>

              <FormGroup label="Location & Occupation">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Current Occupation"
                    name="occupation"
                    options={["Student", "NYSC Member", "Entrepreneur", "Professional"]}
                    required
                  />
                  <Field label="State" name="state" required />
                  <Field label="City/Town" name="city" required className="sm:col-span-2" />
                </div>
              </FormGroup>

              <FormGroup label="Availability & Commitment">
                <RadioGroup
                  label="Will you be available throughout the event period, including orientation and meetings?"
                  name="available_throughout"
                  options={["Yes", "No"]}
                  required
                />
                <RadioGroup
                  label="Can you commit to attending meetings before the event?"
                  name="commit_meetings"
                  options={["Yes", "No"]}
                  required
                />
              </FormGroup>

              <FormGroup label="Team Selection">
                <p className="text-sm text-muted-foreground mb-4">Which team would you like to serve in? (Select all that apply)</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {TEAMS.map((team) => (
                    <label key={team} className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-input hover:border-mint/50 transition">
                      <input
                        type="checkbox"
                        name={team}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[color:var(--mint)]"
                      />
                      <span className="text-sm select-none">{team}</span>
                    </label>
                  ))}
                </div>
              </FormGroup>

              {errorMsg && (
                <div className="rounded-xl border border-flame/40 bg-flame/10 p-4 text-sm text-flame">
                  {errorMsg}
                </div>
              )}

              <button type="submit" disabled={submitting}
                className="w-full rounded-full bg-mint py-4 font-semibold text-mint-foreground shadow-mint hover:opacity-95 transition inline-flex items-center justify-center gap-2 disabled:opacity-60">
                {submitting ? "Submitting Application…" : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-mint font-semibold mb-4 border-b border-border/50 pb-2">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required, className = "" }:
  { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-muted-foreground">{label}{required && <span className="text-flame"> *</span>}</span>
      <input name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition" />
    </label>
  );
}

function Select({ label, name, options, required }: { label: string; name: string; options: string[], required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}{required && <span className="text-flame"> *</span>}</span>
      <select name={name} required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition">
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function RadioGroup({ label, name, options, required }: { label: string; name: string; options: string[], required?: boolean }) {
  return (
    <div className="block">
      <span className="text-sm text-muted-foreground mb-3 block">{label}{required && <span className="text-flame"> *</span>}</span>
      <div className="flex gap-6">
        {options.map(o => (
          <label key={o} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={name} value={o} required={required} className="h-4 w-4 accent-[color:var(--mint)] border-border" />
            <span className="text-sm">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
