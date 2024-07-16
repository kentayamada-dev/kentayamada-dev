import { HomeIcon, MoonIcon } from '@heroicons/react/24/outline';
import type { NavigationItemsType } from './types';

const navigationItems = [
  { href: '/dashboard', icon: MoonIcon, title: 'Dashboard' },
  { href: '/', icon: HomeIcon, title: 'Home' }
] as const satisfies NavigationItemsType;

export { navigationItems };
