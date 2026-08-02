import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import {
  ArrowRight, Sparkles, Users, Lightbulb, Target, Handshake, Award,
  GraduationCap, Briefcase, Rocket, Crown, Palette, Mail, Phone,
  Instagram, Facebook, Youtube, Twitter, MapPin, Calendar, Check,
  ChevronDown, Quote, TrendingUp,
  Linkedin,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import aboutImg from "@/assets/about-youth.jpg";
import logo from "@/assets/ZOHAR-1.png"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INSPIRE 1.0 — The Economy of Legacy Builders | ZOHAR" },
      { name: "description", content: "Join INSPIRE 1.0  by ZOHAR. Learn from leaders who built legacies of excellence and shape the next generation of marketplace influence." },
      { property: "og:title", content: "INSPIRE 1.0 — The Economy of Legacy Builders" },
      { property: "og:description", content: "Reserve your seat at INSPIRE 1.0. Real stories. Practical lessons. Lifelong influence." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <PosterPromoModal /> */}
      <Nav />
      <Hero />
      <About />
      <WhyAttend />
      <Speakers />
      <WhoShouldAttend />
      <Register />
      <Partners />
      <FAQ />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-bold tracking-tight">
          <span className="h-20 w-20  grid place-items-center text-mint-foreground">
            <img src={logo} className="h-20 w-20" />
          </span>

          <span className="text-mint">•</span>
          <span className="text-muted-foreground hidden sm:inline">INSPIRE 1.0</span>
        </a>
        <div className="flex items-center gap-3">
          {/* <Link to="/poster" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-semibold hover:bg-muted transition">
            Generate Poster
          </Link> */}
          <a href="#register" className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-2 text-sm font-semibold text-mint-foreground shadow-mint hover:opacity-90 transition">
            Register <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Coding",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Teamwork",
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Meeting",
  },
  {
    url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Event",
  },
  {
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3",
    title: "Conference",
  },
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero w-full h-screen min-h-[800px] flex flex-col items-center justify-center">
      <img src={heroBg} alt="" width={1536} height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,transparent,var(--background))]" />

      <Floating sensitivity={-0.5} className="h-full z-10">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-mint rounded-xl border border-mint/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-mint rounded-xl border border-mint/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-mint rounded-xl border border-mint/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-mint rotate-[6deg] rounded-xl border border-mint/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-mint rotate-[19deg] rounded-xl border border-mint/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="relative mx-auto max-w-6xl px-5 flex flex-col items-center text-center z-20 pointer-events-auto mt-20 md:mt-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-medium text-mint mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-ring" />
          ZOHAR Presents
        </div>

        <motion.h1
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] flex flex-col md:flex-row items-center justify-center whitespace-pre"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Insp<span className="text-flame">i</span>re </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre mt-2 md:mt-0">
              <TextRotate
                texts={[
                  "2026",
                  "Impact",
                  "Influence",
                  "Legacy",
                ]}
                mainClassName="overflow-hidden px-3 bg-mint text-mint-foreground py-0 pb-1 md:pb-2 rounded-xl text-5xl sm:text-7xl md:text-8xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>

        <div className="mt-8 relative max-w-2xl">
          <span className="absolute -left-3 -top-2 text-mint/40 text-xs italic font-display">Theme:</span>
          <p className="text-xl sm:text-2xl font-display font-medium leading-snug">
            The Economy of Legacy Builders;
            <span className="block text-mint mt-1">Impact &amp; Marketplace Influence</span>
          </p>
        </div>

        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
          Learn from leaders who built legacies of excellence, shaped industries, and transformed communities. Join a generation committed to impact and influence.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a href="#register" className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-base font-semibold text-mint-foreground shadow-mint hover:translate-y-[-1px] transition">
            Register Now <ArrowRight className="h-4 w-4" />
          </a>
          {/* <Link to="/poster" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-base font-semibold hover:bg-muted transition">
            Generate Poster
          </Link> */}
          <TooltipProvider>
            <Tooltip open={true}>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-base font-semibold opacity-50 cursor-not-allowed">
                  Register as a Volunteer
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={-10} className="bg-flame text-white border-flame relative z-10">
                <p>Closed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-8 text-center max-w-md w-full">
          {[
            { k: "1st", v: "Edition" },
            { k: "10+", v: "Speakers" },
            { k: "200+", v: "Attendees" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-border bg-card/40 px-2 py-3 backdrop-blur-md">
              <div className="font-display text-2xl sm:text-3xl font-bold text-mint">{s.k}</div>
              <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-mint opacity-20 blur-3xl rounded-full" />
          <img src={aboutImg} alt="Young leaders collaborating" loading="lazy"
            width={1280} height={896}
            className="relative rounded-3xl border border-border object-cover aspect-[5/4] w-full shadow-soft" />
          <div className="absolute -bottom-5 -right-3 sm:right-6 rounded-2xl bg-card border border-mint/30 px-4 py-3 shadow-mint">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-mint" />
              <span className="text-xs font-semibold">Bridging aspiration &amp; achievement</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <SectionLabel>About INSPIRED</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            A platform built to <span className="text-mint">connect generations</span> of impact.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            INSPIRED is a youth-focused leadership and empowerment platform created by ZOHAR to connect the next generation with accomplished leaders whose journeys have shaped industries, institutions, businesses, and communities.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Through honest conversations and shared experiences, we bridge the gap between aspiration and achievement — exposing youths, students, entrepreneurs and emerging professionals to practical insights from those who have built legacies of influence.
          </p>
          <div className="mt-7 flex items-center gap-2 text-sm">
            <Quote className="h-4 w-4 text-flame" />
            <span className="font-display italic">Learning from Builders. Inspiring the Next Generation.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Why Attend ---------- */
function WhyAttend() {
  const items = [
    { icon: Crown, t: "Learn from Legacy Builders", d: "Real stories from leaders who shaped industries and communities." },
    { icon: Lightbulb, t: "Practical Insights", d: "Lessons you can apply to your career, ventures and calling." },
    { icon: Handshake, t: "Mentors & Network", d: "Connect with mentors and like-minded peers chasing impact." },
    { icon: Target, t: "Marketplace Influence", d: "Discover pathways to leadership and lasting influence." },
    { icon: Sparkles, t: "Purpose & Impact", d: "Be inspired to build a life of meaning, not just success." },
    { icon: Award, t: "Certificate of Attendance", d: "Recognition you can carry into every room you enter." },
  ];
  return (
    <section className="py-20 sm:py-28 bg-deep">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <SectionLabel>Why You Should Attend</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Six reasons this is the <span className="text-mint">room</span> to be in.
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={t}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-mint/40 hover:-translate-y-0.5 transition"
            >
              <div className="h-11 w-11 rounded-xl bg-mint/15 grid place-items-center text-mint group-hover:bg-mint group-hover:text-mint-foreground transition">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Speakers ---------- */
function Speakers() {
  return (
    <section id="speakers" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div className="max-w-xl">
            <SectionLabel>Speakers &amp; Panelists</SectionLabel>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              Voices that <span className="text-mint">built</span> something that lasts.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground italic">More distinguished speakers will be announced soon.</p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={item}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto h-28 w-28 rounded-full bg-gradient-mint/20 border border-mint/30 grid place-items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mint opacity-20" />
                <Sparkles className="h-8 w-8 text-mint relative" />
              </div>
              <h3 className="mt-4 font-display font-semibold">To Be Announced</h3>
              <p className="text-xs text-muted-foreground mt-1">Distinguished Leader</p>
              <p className="text-xs text-mint mt-3">Reveal coming soon</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Who Should Attend ---------- */
function WhoShouldAttend() {
  const groups = [
    { icon: GraduationCap, t: "Students" },
    { icon: Rocket, t: "Entrepreneurs" },
    { icon: Briefcase, t: "Young Professionals" },
    { icon: Crown, t: "Emerging Leaders" },
    { icon: Palette, t: "Creatives & Innovators" },
    { icon: Users, t: "Change-makers" },
  ];
  return (
    <section className="py-20 sm:py-28 bg-deep">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionLabel center>Who Should Attend</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Built for people who refuse to <span className="text-mint">stay average</span>.
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {groups.map(({ icon: Icon, t }, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={t}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex items-center gap-3 hover:border-mint/40 transition"
            >
              <div className="h-10 w-10 shrink-0 rounded-xl bg-mint/15 text-mint grid place-items-center">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-display font-semibold text-sm sm:text-base">{t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Register ---------- */
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorState, setErrorState] = useState<null | "full" | "generic">(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorState(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      gender: String(fd.get("gender") ?? ""),
      age_range: String(fd.get("age") ?? ""),
      occupation: String(fd.get("occupation") ?? ""),
      organization: String(fd.get("org") ?? ""),
      state: String(fd.get("state") ?? ""),
      motivation: String(fd.get("why") ?? ""),
      heard_from: String(fd.get("hear") ?? ""),
    };
    try {
      const res = await fetch("/api/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        setErrorState("full");
      } else if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error || "Could not save your registration. Please try again.");
        setErrorState("generic");
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setErrorState("generic");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionLabel center>Reserve Your Seat</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            One form. <span className="text-mint">One decision.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Only 100 seats. Register to lock yours in.</p>
        </motion.div>

        {errorState === "full" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mt-10 rounded-3xl border border-flame/40 bg-flame/10 p-8 text-center"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-flame grid place-items-center text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold">All 100 spots are filled</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for your interest. Registration for INSPIRE 1.0 is now closed —
              follow us on social media for updates and future opportunities.
            </p>
          </motion.div>
        ) : submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="mt-10 rounded-3xl border border-mint/40 bg-mint/10 p-8 text-center"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-mint grid place-items-center text-mint-foreground animate-pulse-ring">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">Your seat is reserved.</h3>
            <p className="mt-2 text-sm text-muted-foreground">We'll be in touch with event details soon.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5"
          >
            <FormGroup label="Personal Information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" required />
                <Field label="Email Address" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Select label="Gender" name="gender" options={["Male", "Female", "Prefer not to say"]} />
                <Select label="Age Range" name="age" options={["16–20", "21–25", "26–30", "31–35", "36+"]} />
              </div>
            </FormGroup>

            <FormGroup label="Professional Information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Occupation" name="occupation" />
                <Field label="Organization / Institution" name="org" />
                <Field label="State of Residence" name="state" className="sm:col-span-2" />
              </div>
            </FormGroup>

            <FormGroup label="A Few Questions">
              <Textarea label="Why would you like to attend INSPIRED?" name="why" />
              <Select label="How did you hear about this event?" name="hear"
                options={["Social Media", "Friend", "Church", "Mosque", "Instagram", "Facebook", "Twitter", "Other"]} />
            </FormGroup>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border accent-[color:var(--mint)]" />
              <span>I agree to receive updates regarding INSPIRE.</span>
            </label>

            {errorState === "generic" && (
              <p className="text-sm text-flame">{errorMsg}</p>
            )}

            <button type="submit" disabled={submitting}
              className="w-full rounded-full bg-mint py-4 font-semibold text-mint-foreground shadow-mint hover:opacity-95 transition inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {submitting ? "Reserving…" : <>Reserve My Seat <ArrowRight className="h-4 w-4" /></>}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-mint font-semibold mb-3">{label}</p>
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
function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select name={name}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition">
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <textarea name={name} rows={3}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/30 transition resize-none" />
    </label>
  );
}

/* ---------- Partners ---------- */
function Partners() {
  return (
    <section id="partners" className="py-20 sm:py-24 bg-deep">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-5 text-center"
      >
        <SectionLabel center>Partners &amp; Sponsors</SectionLabel>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
          Standing with us to <span className="text-mint">inspire a generation</span>.
        </h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Partner One", "Partner Two", "Partner Three", "Partner Four"].map((p, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={p}
              className="h-20 rounded-2xl border border-border bg-card grid place-items-center text-sm text-muted-foreground"
            >
              {p}
            </motion.div>
          ))}
        </div>
        <a href="mailto:officialzohar7@gmail.com" className="mt-8 inline-flex items-center gap-2 text-sm text-mint hover:underline">
          Become a partner <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "Is registration free?", a: "Yes — INSPIRE 1.0 is free to attend. We just ask that you register so we can plan your seat." },
    { q: "Who can attend?", a: "Students, young professionals, entrepreneurs, emerging leaders, creatives, and anyone passionate about impact." },
    { q: "Will certificates be issued?", a: "Yes. Attendees will receive a certificate of participation after the event." },
    { q: "How will I receive event updates?", a: "Via the email and phone number you provide during registration, and on our social channels." },
    { q: "Can organizations partner with INSPIRE 1.0?", a: "Absolutely. Reach out via officialzohar7@gmail.com to discuss partnership opportunities." },
  ];
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <SectionLabel center>Frequently Asked</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">Questions, answered.</h2>
        </motion.div>
        <div className="mt-10 space-y-3">
          {items.map((f, i) => (
            <motion.details
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={i}
              className="group rounded-2xl border border-border bg-card p-5 open:border-mint/40 transition"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-semibold list-none">
                {f.q}
                <ChevronDown className="h-4 w-4 text-mint transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-deep border-t border-border pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-5"
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <span className="h-20 w-20  grid place-items-center text-mint-foreground">
                <img src={logo} className="h-20 w-20" />
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Learning from Builders. Inspiring the Next Generation. A youth leadership initiative bridging aspiration and achievement.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/official_zohar?igsh=NmJ1dXBoZ2FkenBv" },
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61591420447002&mibextid=ZbWKwL" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/officialzohar/" },
                { Icon: Tiktok, href: "https://vm.tiktok.com/ZS9r65BhNC4ua-Hbb9D/" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} className="h-9 w-9 rounded-full border border-border grid place-items-center hover:border-mint hover:text-mint transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-mint">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-mint" /> officialzohar7@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-mint" /> +234 813 505 4970</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-mint" /> Nasarawa, Nigeria</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-mint">Event</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-mint" /> 2026 — Date TBA</li>
              <li><a href="#register" className="hover:text-mint transition">Register</a></li>
              <li><a href="#partners" className="hover:text-mint transition">Partner with us</a></li>
              <li><a href="#faq" className="hover:text-mint transition">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ZOHAR. All rights reserved.</p>

        </div>
      </motion.div>
    </footer>
  );
}

/* ---------- helpers ---------- */
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint ${center ? "mx-auto" : ""}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-flame" />
      {children}
    </div>
  );
}

export function Tiktok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/*
function PosterPromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenPromo = sessionStorage.getItem("hasSeenPosterPromo");
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("hasSeenPosterPromo", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">Ready for Impact?</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Generate your personalized <span className="text-mint font-semibold">"I am attending"</span> poster and share it with your network!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Link
            to="/poster"
            className="w-full rounded-full bg-mint py-3 font-semibold text-mint-foreground shadow-mint hover:opacity-95 transition inline-flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            Generate My Poster
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-full rounded-full border border-border bg-card/60 py-3 text-sm font-semibold hover:bg-muted transition"
          >
            Maybe Later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
*/
