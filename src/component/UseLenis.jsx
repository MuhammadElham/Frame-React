// src/hooks/useLenis.js
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,         // Smooth scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing curve
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup when unmount
    };
  }, []);
};

export default useLenis;
