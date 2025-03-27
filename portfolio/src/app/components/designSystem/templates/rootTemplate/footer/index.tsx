import { CopyRight } from '@/components/designSystem/atoms';
import type { FooterType } from './types';

const Footer: FooterType = (props) => {
  return (
    <footer className='border-primary mt-auto border-t p-3'>
      <CopyRight authorName={props.authorName} year={props.year} />
    </footer>
  );
};

export { Footer };
