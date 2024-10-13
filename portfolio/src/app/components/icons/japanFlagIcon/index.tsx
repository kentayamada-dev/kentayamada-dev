import type { JSXElementType } from '@/types/components';

const JapanFlagIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' viewBox='0 0 16 16' width='100%'>
      <path d='M0.666626 3H15.3333V13H0.666626V3Z' fill='#ECEFF1' />
      <path
        d='M8 5C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8C5 8.79565 5.31607 9.55871 5.87868 10.1213C6.44129 10.6839 7.20435 11 8 11C8.79565 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79565 5 8 5Z'
        fill='#D50000'
      />
    </svg>
  );
};

export { JapanFlagIcon };
