import type { ListItemType } from './types';

const ListItem: ListItemType = (props) => {
  return (
    <div className='flex items-center gap-x-2'>
      <span className='w-5'>
        <props.icon />
      </span>
      <span>{props.title}</span>
    </div>
  );
};

export { ListItem };
