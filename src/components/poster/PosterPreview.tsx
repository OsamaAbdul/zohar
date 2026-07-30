import { forwardRef } from 'react';
import logo from "@/assets/ZOHAR-1.png";
import heroBg from "@/assets/hero-bg.jpg";

interface PosterPreviewProps {
  image: string | null;
}

export const PosterPreview = forwardRef<HTMLDivElement, PosterPreviewProps>(
  ({ image }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[1080px] h-[1080px] bg-background relative overflow-hidden flex flex-col items-center justify-between font-display bg-gradient-hero"
        style={{ transformOrigin: 'top left' }}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20 mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,transparent,hsl(var(--background)))] opacity-90" />
          <div className="absolute -inset-4 bg-gradient-mint opacity-20 blur-[100px] rounded-full" />
        </div>

        {/* Top Section */}
        <div className="relative z-10 flex flex-col items-center pt-24 w-full px-20">
          <div className="h-32 w-32 grid place-items-center text-mint-foreground">
            <img src={logo} alt="ZOHAR" className="h-32 w-32" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mt-8 tracking-tight">INSPIRE 1.0</h1>
          <p className="text-2xl text-mint mt-4 font-semibold tracking-widest uppercase">The Economy of Legacy Builders</p>
        </div>

        {/* Center Content: Photo */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full my-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-mint blur-3xl opacity-30 rounded-full" />
            <div className="w-[440px] h-[440px] rounded-full border-4 border-mint/50 overflow-hidden relative shadow-[0_0_50px_rgba(var(--mint),0.3)] bg-card/60 backdrop-blur-md">
              {image ? (
                <img src={image} alt="Attendee" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <span className="text-4xl font-medium">Your Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 flex flex-col items-center pb-24 w-full px-20 text-center">
          <h2 className="text-7xl font-bold text-foreground leading-tight mb-4">
            I AM <span className="text-flame">ATTENDING</span>
          </h2>

          <p className="mt-6 text-3xl text-muted-foreground font-inter">
            Join me at <span className="text-mint font-semibold">INSPIRE 1.0</span>
          </p>
        </div>
      </div>
    );
  }
);
PosterPreview.displayName = "PosterPreview";
