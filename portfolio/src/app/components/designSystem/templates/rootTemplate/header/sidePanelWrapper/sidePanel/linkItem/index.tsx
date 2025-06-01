import Link from 'next/link';
import { ListItem } from '@/components/designSystem/atoms';
import type { LinkItemType } from './types';

const LinkItem: LinkItemType = (props) => {
  return (
    <Link className='link-primary block rounded-lg p-2 font-medium hover:bg-slate-100 hover:dark:bg-slate-600/30' href={props.href} target='_blank'>
      <ListItem icon={props.icon} title={props.title} />
    </Link>
  );
};

export { LinkItem };
