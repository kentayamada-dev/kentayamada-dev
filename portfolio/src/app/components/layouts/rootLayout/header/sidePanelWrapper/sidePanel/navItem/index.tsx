import { forwardRef } from 'react';
import { ListItem } from '@/components/elements';
import type { NavItemProps } from './types';

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>((props, ref) => {
  return (
    <a className='block rounded-lg p-2 hover:bg-slate-100 hover:dark:bg-slate-600/30' href={props.href} onClick={props.onClick} ref={ref}>
      <ListItem active={props.active} icon={props.icon} title={props.title} />
    </a>
  );
});

NavItem.displayName = 'NavItem';

export { NavItem };
