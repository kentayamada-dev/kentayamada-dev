import Link from 'next/link';
import { CustomLink } from '@/components/elements';
import type { NavItemsType } from './types';

const NavItems: NavItemsType = (props) => {
  return (
    <nav className='hidden sm:block'>
      <ul className='flex space-x-4'>
        {props.items.map((item) => {
          return (
            <li key={`/${props.lang}/${item.href}`}>
              <Link href={`/${props.lang}/${item.href}`} legacyBehavior passHref prefetch>
                <CustomLink title={item.title} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { NavItems };
