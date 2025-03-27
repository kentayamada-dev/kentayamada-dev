import Link from 'next/link';
import { CustomLink } from '@/components/designSystem/atoms';
import type { NavItemsType } from './types';

const NavItems: NavItemsType = (props) => {
  return (
    <nav>
      <ul className='flex space-x-4'>
        {Object.entries(props.items).map(([key, { href, title }]) => {
          return (
            <li key={key}>
              <Link href={`/${props.locale}${href}`} legacyBehavior passHref>
                <CustomLink isActive={props.currentPathname === href} title={title} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { NavItems };
