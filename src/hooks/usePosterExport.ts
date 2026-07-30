import { useCallback, useState } from 'react';
import { toPng } from 'html-to-image';

export function usePosterExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportPoster = useCallback(async (element: HTMLElement | null, filename: string = 'inspired-2026-poster.png') => {
    if (!element) return;
    
    try {
      setIsExporting(true);
      setError(null);
      
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2, 
      });
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating poster', err);
      setError(err instanceof Error ? err : new Error('Failed to generate poster'));
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { exportPoster, isExporting, error };
}
