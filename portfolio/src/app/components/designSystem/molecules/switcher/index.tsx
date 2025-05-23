import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/designSystem/atoms';
import { getEntries } from '@/utils';
import type { SwitcherType } from './types';

const Switcher: SwitcherType = (props) => {
  return (
    <Listbox onChange={props.onChange} value={props.value}>
      <div className='relative'>
        <div className='size-6'>
          {props.isMounted ? (
            <ListboxButton aria-label={props.buttonLabel} className='btn-list'>
              <props.buttonIcon />
            </ListboxButton>
          ) : (
            <div className='size-full animate-pulse'>
              <div className='size-full rounded-full bg-slate-200 dark:bg-slate-700' />
            </div>
          )}
        </div>
        <ListboxOptions className='shadow-primary absolute right-0 z-10 mt-6 overflow-auto rounded-lg bg-white dark:bg-slate-800'>
          {getEntries(props.options).map(([key, { icon, name }]) => {
            return (
              <ListboxOption className='relative' key={key} value={key}>
                {(args) => {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  const { focus, selected } = args;

                  return (
                    <div className={`${focus && 'bg-slate-100 dark:bg-slate-600/30'} cursor-pointer px-6 py-2 text-sm sm:text-base`}>
                      <ListItem icon={icon} isActive={selected} title={name} />
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
