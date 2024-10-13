import type { JSXElementType } from '@/types/components';

const ArticleIcon = (): JSXElementType => {
  return (
    <svg className='self-center' fill='none' height='100%' stroke='currentColor' viewBox='0 0 24 24' width='100%'>
      <path
        d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export { ArticleIcon };
