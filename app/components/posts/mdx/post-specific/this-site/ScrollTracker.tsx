"use client";

import { useState, useEffect } from "react";
import { MDXMeter } from "./MDXPropDemoCard";

export const ScrollTracker = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <MDXMeter
      label="Reading Progress"
      value={progress}
      tone="accent"
      showValue={true}
      compact={true}
    />
  );
};
