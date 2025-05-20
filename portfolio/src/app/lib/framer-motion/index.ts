import { useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const INITIAL_SPRING_VALUE = 0;

export const useAnimatedNumber = (): [MotionValue<string>, (v: number) => void] => {
  const spring = useSpring(INITIAL_SPRING_VALUE, { damping: 20, stiffness: 90 });

  const display = useTransform(spring, (val) => {
    return Math.round(val).toLocaleString();
  });

  const set = (val: number): void => {
    spring.set(val);
  };

  return [display, set];
};
