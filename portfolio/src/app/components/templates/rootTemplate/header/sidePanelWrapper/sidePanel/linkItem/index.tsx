import Link from 'next/link';
import { ListItem } from '@/components/atoms';
import type { LinkItemType } from './types';

const LinkItem: LinkItemType = (props) => {
  return (
    <Link className='block rounded-lg p-2 text-black hover:bg-slate-100 dark:text-white hover:dark:bg-slate-600/30' href={props.href} target='_blank'>
      <ListItem active={false} icon={props.icon} title={props.title} />
    </Link>
  );
};

export { LinkItem };
