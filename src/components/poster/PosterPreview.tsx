import { forwardRef } from 'react';
import inspirePoster from "@/assets/INSPIRE-II.png";

interface PosterPreviewProps {
  image: string | null;
  name?: string;
}

export const PosterPreview = forwardRef<HTMLDivElement, PosterPreviewProps>(
  ({ image, name }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[1080px] h-[1350px] relative overflow-hidden bg-background"
        style={{ transformOrigin: 'top left' }}
      >
        <img 
          src={inspirePoster} 
          alt="Inspire 1.0 Poster" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />

        {/* User Photo Overlay */}
        {image && (
          <div className="absolute z-10 w-[580px] h-[580px] rounded-full overflow-hidden left-[530px] top-[750px] -translate-x-1/2 -translate-y-1/2">
            <img src={image} alt="Attendee" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Name Overlay */}
        {name && (
          <div className="absolute z-10 w-full left-1/2 bottom-[185px] -translate-x-1/2 text-center px-12 flex flex-col items-center justify-center">
            <h2 className="text-[50px] font-bold text-white uppercase tracking-widest drop-shadow-md font-display leading-none">
              {name}
            </h2>
          </div>
        )}

      </div>
    );
  }
);
PosterPreview.displayName = "PosterPreview";
