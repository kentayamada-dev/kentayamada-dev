import { forwardRef } from 'react';
import type { CustomLinkProps } from './types';

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => {
  return (
    <a
      className={`${props.active ? 'text-sky-500 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'} text-sm font-semibold`}
      href={props.href}
      onClick={props.onClick}
      ref={ref}
    >
      {props.title}
    </a>
  );
});

CustomLink.displayName = 'CustomLink';

export { CustomLink };
