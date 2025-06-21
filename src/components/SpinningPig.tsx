import { motion, useTime, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface SpinningPigProps {
  pigSpinSpeed: number;
}

const SpinningPig = ({ pigSpinSpeed }: SpinningPigProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const time = useTime();
  const rotate = useTransform(time, [0, pigSpinSpeed], [0, 360], {
    clamp: false,
  });

  return (
    <motion.img
      className="w-80 h-80 p-[5%] object-contain"
      src="/LargePig.png"
      alt="This piggy went to market"
      style={{ 
        rotate: prefersReducedMotion ? 0 : rotate // Don't rotate if reduced motion preferred
      }}
      whileHover={prefersReducedMotion ? undefined : { 
        scale: 1.2, 
        transition: { duration: 0.5 } 
      }}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
    />
  );
};

export { SpinningPig };
