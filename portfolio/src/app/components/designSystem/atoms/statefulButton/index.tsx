import { AnimatePresence, motion } from 'motion/react';
import type { JSXElementType } from '@/types/components';
import type { StatefulButtonType } from './types';

const STATEFUL_BUTTON_STATUS = ['idle', 'loading', 'success'] as const;

/* eslint-disable react/no-multi-comp */
const LoaderIcon = (): JSXElementType => {
  return (
    <motion.svg
      animate={{ opacity: 1, rotate: [0, 360] }}
      exit={{ opacity: 0 }}
      fill='none'
      height='24'
      initial={{ opacity: 0 }}
      key='loader'
      stroke='currentColor'
      transition={{
        rotate: { duration: 1, ease: 'linear', repeat: Infinity }
      }}
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M0 0h24v24H0z' fill='none' stroke='none' />
      <path d='M12 3a9 9 0 1 0 9 9' />
    </motion.svg>
  );
};

const CheckIcon = (): JSXElementType => {
  return (
    <motion.svg
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      fill='none'
      height='24'
      initial={{ opacity: 0 }}
      key='check'
      stroke='currentColor'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d='M0 0h24v24H0z' fill='none' stroke='none' />
      <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
      <path d='M9 12l2 2l4 -4' />
    </motion.svg>
  );
};

const StatefulButton: StatefulButtonType = (props) => {
  return (
    <motion.button
      className='w-full cursor-pointer rounded-lg bg-blue-500 px-5 py-2.5 text-center font-semibold text-white hover:brightness-95 disabled:cursor-not-allowed dark:hover:brightness-110'
      disabled={props.status === 'loading' || props.status === 'success'}
      type='submit'
    >
      <motion.div className='flex items-center justify-center'>
        <AnimatePresence mode='wait'>
          {props.status === 'loading' && <LoaderIcon />}
          {props.status === 'success' && <CheckIcon />}
          {props.status === 'idle' && (
            <motion.span animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
              {props.title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

/* eslint-enable react/no-multi-comp */

export { STATEFUL_BUTTON_STATUS, StatefulButton };
