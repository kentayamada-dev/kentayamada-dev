import { CopyRight } from '@/components/designSystem/atoms/copyRight';
import type { FooterType } from './types';

const Footer: FooterType = (props) => {
  return (
    <footer className='border-primary mt-auto border-t p-3 text-center'>
      <CopyRight author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} />
    </footer>
  );
};

export { Footer };
