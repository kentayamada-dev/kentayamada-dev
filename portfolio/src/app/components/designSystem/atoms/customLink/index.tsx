import { forwardRef } from 'react';
import type { CustomLinkProps } from './types';

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>((props, ref) => {
  return (
    <a className={`${props.isActive ? 'text-blue-500' : 'link-primary'} text-sm font-semibold`} href={props.href} onClick={props.onClick} ref={ref}>
      {props.title}
    </a>
  );
});

CustomLink.displayName = 'CustomLink';

export { CustomLink };
