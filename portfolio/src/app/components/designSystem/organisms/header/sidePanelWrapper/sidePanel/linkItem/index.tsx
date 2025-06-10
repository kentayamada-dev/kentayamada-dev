import { CustomNextLink, ListItem } from '@/components/designSystem/atoms';
import type { LinkItemType } from './types';

const LinkItem: LinkItemType = (props) => {
  return (
    <CustomNextLink className='link-primary hover-secondary block rounded-lg p-2 font-medium' href={props.href} target='_blank'>
      <ListItem icon={props.icon} title={props.title} />
    </CustomNextLink>
  );
};

export { LinkItem };
