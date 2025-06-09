import { motion } from 'motion/react';
import { memo } from 'react';
import { ANIMATION_DURATION, HIT_ANIMATION_DURATION } from '../constants';
import { MoleHead } from './moleHead';
import { MoleHeadHit } from './moleHeadHit';
import type { MoleHoleType } from './types';

const MoleHole = memo<Parameters<MoleHoleType>[0]>((props) => {
  return (
    <div className='relative overflow-hidden rounded-b-[100px_50px]'>
      <div className='absolute bottom-0 h-7 w-full rounded-[50%] bg-black' />
      <motion.div
        animate={props.isHit ? { rotate: [0, -10, 10, 0] } : { y: props.isVisible ? '0%' : '100%' }}
        className='absolute inset-0 flex cursor-pointer items-end justify-center'
        initial={{ y: '100%' }}
        onClick={() => {
          props.onMoleClick(props.index);
        }}
        role='button'
        tabIndex={-1}
        transition={{
          duration: props.isHit ? HIT_ANIMATION_DURATION : ANIMATION_DURATION,
          ease: 'easeInOut'
        }}
      >
        {props.isHit ? <MoleHeadHit /> : <MoleHead />}
      </motion.div>
    </div>
  );
});

MoleHole.displayName = 'MoleHole';

export { MoleHole };
