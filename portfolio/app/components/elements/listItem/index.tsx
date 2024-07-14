import type { ListItemType } from './types';

const ListItem: ListItemType = (props) => {
  return (
    <span className='flex items-center space-x-3'>
      <props.icon
        className={`${props.active ? 'text-sky-500 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'} w-6`}
      />
      <span
        className={`${props.active ? 'text-sky-500 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'} text-sm font-semibold`}
      >
        {props.title}
      </span>
    </span>
  );
};

export { ListItem };
