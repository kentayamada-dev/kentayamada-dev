import type { ListItemType } from './types';

const ListItem: ListItemType = (props) => {
  return (
    <span className='flex items-center gap-x-2'>
      <span className={`${props.isActive ? 'text-blue-500' : 'text-tertiary'} w-5`}>
        <props.icon />
      </span>
      <span className={`${props.isActive ? 'text-blue-500' : 'link-primary'} font-semibold`}>{props.title}</span>
    </span>
  );
};

export { ListItem };
