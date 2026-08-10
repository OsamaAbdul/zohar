import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ImageItem = {
  src: string;
  alt: string;
};

export function PhoneCarousel({ images }: { images: ImageItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-black rounded-[50px] border-[14px] border-black shadow-2xl overflow-hidden ring-1 ring-white/10">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-b-3xl w-40 mx-auto"></div>
      
      {/* Screen Content */}
      <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

        {/* Text / UI overlays inside phone */}
        <div className="absolute bottom-8 inset-x-6 z-20 text-white">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="font-semibold text-lg leading-tight mb-1">
              {images[currentIndex].alt}
            </p>
            <div className="flex gap-1 mt-4">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-4 bg-mint" : "w-1 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
