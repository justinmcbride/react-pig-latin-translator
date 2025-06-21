"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const FlyingPigs = () => {
  const [windowWidth, setWindowWidth] = useState(1920); // Default fallback width
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Set the actual window width on the client side
    setWindowWidth(window.innerWidth);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Don't render flying pigs if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  const pigs = [
    {
      id: 1,
      delay: 0,
      duration: 25,
      direction: "left-to-right",
      startY: "5vh",
      endY: "25vh",
      size: 40,
      wobbleAmount: 8,
    },
    {
      id: 2,
      delay: 10,
      duration: 30,
      direction: "right-to-left",
      startY: "65vh",
      endY: "55vh",
      size: 35,
      wobbleAmount: 12,
    },
    {
      id: 3,
      delay: 18,
      duration: 28,
      direction: "left-to-right",
      startY: "85vh",
      endY: "65vh",
      size: 45,
      wobbleAmount: 6,
    },
    {
      id: 4,
      delay: 5,
      duration: 35,
      direction: "right-to-left",
      startY: "35vh",
      endY: "45vh",
      size: 38,
      wobbleAmount: 10,
    },
    {
      id: 5,
      delay: 22,
      duration: 32,
      direction: "left-to-right",
      startY: "75vh",
      endY: "85vh",
      size: 42,
      wobbleAmount: 7,
    },
    {
      id: 6,
      delay: 15,
      duration: 27,
      direction: "right-to-left",
      startY: "15vh",
      endY: "5vh",
      size: 36,
      wobbleAmount: 9,
    },
    {
      id: 7,
      delay: 30,
      duration: 40,
      direction: "left-to-right",
      startY: "50vh",
      endY: "40vh",
      size: 44,
      wobbleAmount: 5,
    },
    {
      id: 8,
      delay: 8,
      duration: 26,
      direction: "right-to-left",
      startY: "95vh",
      endY: "90vh",
      size: 33,
      wobbleAmount: 11,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pigs.map((pig) => {
        const isLeftToRight = pig.direction === "left-to-right";
        const startX = isLeftToRight ? -100 : windowWidth + 100;
        const endX = isLeftToRight ? windowWidth + 100 : -100;
        
        return (
          <motion.img
            key={pig.id}
            src="/LargePig.png"
            alt=""
            className="absolute opacity-10"
            style={{
              width: pig.size,
              height: pig.size,
            }}
            initial={{ 
              x: startX, 
              y: pig.startY,
              rotate: -pig.wobbleAmount / 2,
              scaleX: isLeftToRight ? 1 : -1, // Face the direction of flight
            }}
            animate={{
              x: endX,
              y: pig.endY,
              rotate: [
                -pig.wobbleAmount / 2, 
                pig.wobbleAmount, 
                -pig.wobbleAmount, 
                pig.wobbleAmount, 
                -pig.wobbleAmount,
                pig.wobbleAmount,
                -pig.wobbleAmount / 2
              ],
            }}
            transition={{
              duration: pig.duration,
              delay: pig.delay,
              repeat: Infinity,
              ease: "easeInOut",
              scaleX: {
                duration: 0, // Don't animate scaleX
              },
              rotate: {
                duration: pig.duration / 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: pig.duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: pig.duration,
                repeat: Infinity,
                ease: "linear",
              }
            }}
          />
        );
      })}
    </div>
  );
};

export { FlyingPigs };
