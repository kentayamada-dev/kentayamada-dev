import type { ListItemType } from './types';

const ListItem: ListItemType = (props) => {
  return (
    <span className='flex items-center space-x-3'>
      <span className={`${props.isActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'} w-5`}>
        <props.icon />
      </span>
      <span className={`${props.isActive ? 'text-blue-500' : 'link-primary'} text-sm font-semibold`}>{props.title}</span>
    </span>
  );
};

export { ListItem };
