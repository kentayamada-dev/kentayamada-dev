import { useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

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
