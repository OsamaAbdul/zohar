import React from "react";
import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const centerImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    alt: "Global Marketplace Influence",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
    alt: "Building Lasting Legacies",
  },
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000&auto=format&fit=crop",
    alt: "Equipping the Next Generation",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    alt: "Leadership and Strategy",
  },
];

const leftImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000&auto=format&fit=crop",
    alt: "Youth Empowerment",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    alt: "Global Impact",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    alt: "Visionary Leadership",
  },
];

const rightImages: ImageItem[] = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    alt: "Strategic Growth",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
    alt: "Community Building",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    alt: "Business Excellence",
  },
];

export default function PhoneMockupBasic() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:-gap-8 overflow-visible px-4">
      <div className="hidden md:block transform -rotate-12 scale-90 translate-x-12 translate-y-8 opacity-90 blur-[1px] hover:blur-none transition-all duration-500 hover:scale-95 hover:z-20">
        <PhoneCarousel images={leftImages} />
      </div>
      
      <div className="z-10 transform scale-100 shadow-2xl hover:scale-105 transition-all duration-500">
        <PhoneCarousel images={centerImages} />
      </div>
      
      <div className="hidden md:block transform rotate-12 scale-90 -translate-x-12 translate-y-8 opacity-90 blur-[1px] hover:blur-none transition-all duration-500 hover:scale-95 hover:z-20">
        <PhoneCarousel images={rightImages} />
      </div>
    </div>
  );
}
