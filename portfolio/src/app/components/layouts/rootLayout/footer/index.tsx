import { CopyRight } from '@/components/elements';
import type { FooterType } from './types';

const Footer: FooterType = (props) => {
  return (
    <footer className='mt-auto border-t border-gray-900/10 p-3 dark:border-white/10'>
      <CopyRight lang={props.lang} />
    </footer>
  );
};

export { Footer };
