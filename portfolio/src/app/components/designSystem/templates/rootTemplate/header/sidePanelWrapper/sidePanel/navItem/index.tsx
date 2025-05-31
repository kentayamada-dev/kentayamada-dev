import { forwardRef } from 'react';
import { ListItem } from '@/components/designSystem/atoms';
import type { NavItemProps } from './types';

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>((props, ref) => {
  return (
    <a href={props.href} onClick={props.onClick} ref={ref}>
      <ListItem icon={props.icon} title={props.title} />
    </a>
  );
});

NavItem.displayName = 'NavItem';

export { NavItem };
