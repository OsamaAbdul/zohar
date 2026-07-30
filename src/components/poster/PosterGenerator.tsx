import { useState, useRef } from 'react';
import { usePosterExport } from '@/hooks/usePosterExport';
import { PosterPreview } from './PosterPreview';
import { ImagePlus, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function PosterGenerator() {
  const [image, setImage] = useState<string | null>(null);
  
  const posterRef = useRef<HTMLDivElement>(null);
  const { exportPoster, isExporting } = usePosterExport();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleGenerate = async () => {
    
    await exportPoster(posterRef.current);
    if (!isExporting) {
       toast.success("Poster downloaded successfully!");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
      {/* Form Section */}
      <div className="space-y-8 bg-card/40 border border-border p-6 sm:p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Personalize Your Poster</h2>
          <p className="text-sm text-muted-foreground mt-2">Upload a photo for your personalized poster.</p>
        </div>

        <div className="space-y-5">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-mint font-semibold">Profile Photo (Optional)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 hover:border-mint/50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-mint">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            {image && (
               <p className="text-xs text-mint">Image selected successfully!</p>
            )}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isExporting}
          className="w-full rounded-full bg-mint py-4 font-semibold text-mint-foreground shadow-mint hover:opacity-95 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isExporting ? (
             <><Loader2 className="h-5 w-5 animate-spin" /> Generating...</>
          ) : (
             <><Download className="h-5 w-5" /> Download Poster</>
          )}
        </button>
      </div>

      {/* Preview Section */}
      <div className="flex flex-col items-center w-full">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest self-start lg:self-center">Live Preview</h3>
        <div className="w-full max-w-[400px] aspect-square relative rounded-3xl overflow-hidden border border-border shadow-soft bg-background">
           <div className="absolute top-0 left-0 origin-top-left" style={{ transform: 'scale(0.37037)' }}>
                 <PosterPreview ref={posterRef} image={image} />
           </div>
        </div>
      </div>
    </div>
  );
}
