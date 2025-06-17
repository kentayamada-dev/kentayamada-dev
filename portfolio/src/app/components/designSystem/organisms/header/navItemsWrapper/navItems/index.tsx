import Link from 'next/link';
import { CustomLink } from '@/components/designSystem/atoms';
import type { NavItemsType } from './types';

const NavItems: NavItemsType = (props) => {
  return (
    <nav aria-label={props.navLabel}>
      <ul className='flex gap-x-4'>
        {Object.entries(props.items).map(([key, { href, title }]) => {
          return (
            <li className={`${props.currentPathname === href ? 'text-blue-500' : 'link-primary'} font-medium`} key={key}>
              <Link href={href} legacyBehavior passHref>
                <CustomLink title={title} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { NavItems };
