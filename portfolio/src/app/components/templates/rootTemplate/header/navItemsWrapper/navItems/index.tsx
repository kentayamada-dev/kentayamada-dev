import Link from 'next/link';
import { CustomLink } from '@/components/atoms';
import type { NavItemsType } from './types';

const NavItems: NavItemsType = (props) => {
  return (
    <nav>
      <ul className='flex space-x-4'>
        {Object.entries(props.items).map(([key, item]) => {
          return (
            <li key={key}>
              <Link href={`/${props.lang}${item.href}`} legacyBehavior passHref>
                <CustomLink active={props.currentPathname === item.href} title={item.title} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { NavItems };
