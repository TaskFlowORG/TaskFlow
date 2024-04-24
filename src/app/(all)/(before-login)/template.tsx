"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}