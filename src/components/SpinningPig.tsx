import { motion, useTime, useTransform } from "motion/react";

interface SpinningPigProps {
  pigSpinSpeed: number;
}

const SpinningPig = ({ pigSpinSpeed }: SpinningPigProps) => {
  const time = useTime();
  const rotate = useTransform(time, [0, pigSpinSpeed], [0, 360], {
    clamp: false,
  });
  return (
    <motion.img
      className="max-w-80 h-80 p-[5%]"
      src="/LargePig.png"
      alt="This piggy went to market"
      style={{ rotate }}
      whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
    />
  );
};

export default SpinningPig;
