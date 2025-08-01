import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/designSystem/atoms/listItem';
import { getEntries } from '@/utils/getEntries';
import type { SwitcherType } from './types';

const Switcher: SwitcherType = (props) => {
  return (
    <Listbox onChange={props.onChange} value={props.value}>
      <div className='relative'>
        <div className='size-10'>
          {props.isMounted ? (
            <ListboxButton
              aria-label={props.buttonLabel}
              className='hover-secondary flex size-full items-center justify-center overflow-hidden rounded-lg p-2 text-blue-500 hover:cursor-pointer'
              title={props.buttonLabel}
            >
              <props.buttonIcon />
            </ListboxButton>
          ) : (
            <div className='size-full animate-pulse'>
              <div className='size-full rounded-lg bg-slate-200 dark:bg-slate-700' />
            </div>
          )}
        </div>
        <ListboxOptions
          aria-label={props.buttonLabel}
          className='shadow-primary absolute right-0 z-10 mt-6 w-max overflow-auto rounded-lg bg-white dark:bg-slate-800'
        >
          {getEntries(props.options).map(([key, { icon, name }]) => {
            return (
              <ListboxOption className='relative' key={key} value={key}>
                {(args) => {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  const { focus, selected } = args;

                  return (
                    <div
                      className={`${focus && 'bg-slate-100 dark:bg-slate-600/30'} ${selected ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'} cursor-pointer px-6 py-2 text-sm font-medium sm:text-base`}
                    >
                      <ListItem icon={icon} title={name} />
                    </div>
                  );
                }}
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export { Switcher };
