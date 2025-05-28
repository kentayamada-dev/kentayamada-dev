'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';
import type { IntroType } from './types';

const VARIANTS: Variants = {
  // eslint-disable-next-line id-length
  hidden: { opacity: 0, y: 18 },
  // eslint-disable-next-line id-length
  show: { opacity: 1, transition: { type: 'spring' }, y: 0 }
};

const Intro: IntroType = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      animate={isInView ? 'show' : 'hidden'}
      className='space-y-5 sm:space-y-7'
      initial='hidden'
      ref={ref}
      variants={{
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <div className='space-y-3'>
        <motion.div variants={VARIANTS}>
          <h1 className='text-primary text-4xl font-semibold tracking-tight sm:text-6xl'>{props.title}</h1>
        </motion.div>
        <motion.div variants={VARIANTS}>
          <h2 className='text-primary text-2xl font-medium tracking-tight sm:text-4xl'>{props.subtitle}</h2>
        </motion.div>
      </div>
      <motion.div variants={VARIANTS}>
        <p className='text-secondary text-sm font-normal sm:text-lg'>{props.paragraph}</p>
      </motion.div>
    </motion.div>
  );
};

export { Intro };
