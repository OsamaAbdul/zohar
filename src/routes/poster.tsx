import { createFileRoute, Link } from '@tanstack/react-router';
import { PosterGenerator } from '@/components/poster/PosterGenerator';
import { ArrowLeft } from 'lucide-react';
import logo from "@/assets/ZOHAR-1.png";

export const Route = createFileRoute('/poster')({
  component: PosterPage,
});

function PosterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--mint),0.15),transparent_50%)]" />
      </div>

      <header className="relative z-10 mx-auto max-w-6xl px-5 h-20 w-full flex items-center justify-between mt-4">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <div className="h-16 w-16 grid place-items-center text-mint-foreground">
          <img src={logo} alt="ZOHAR" className="h-16 w-16" />
        </div>
      </header>

      <main className="relative z-10 flex-1 mx-auto max-w-6xl w-full px-5 py-8 md:py-12">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            INSPIRE 1.0
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Generate Your Poster</h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Show the world you're ready to build a legacy. Customize and download your personalized "I am attending" poster below.
          </p>
        </div>

        <PosterGenerator />
      </main>
    </div>
  );
}
