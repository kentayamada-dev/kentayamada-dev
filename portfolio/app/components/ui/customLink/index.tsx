import { forwardRef } from 'react';
import type { CustomLinkProps } from './types';

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => {
  return (
    <a
      aria-label={`Go to ${props.title}`}
      className='hover:text-sky-500 dark:hover:text-sky-400'
      href={props.href}
      onClick={props.onClick}
      ref={ref}
    >
      {props.title}
    </a>
  );
});

CustomLink.displayName = 'Custom Link';

export { CustomLink };
