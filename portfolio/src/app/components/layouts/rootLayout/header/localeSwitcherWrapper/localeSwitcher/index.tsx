import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/elements';
import { defaultLocale, locales } from '@/constants/locales';
import { getTypedKey } from '@/utils';
import type { LocaleSwitcherType } from './types';

const LocaleSwitcher: LocaleSwitcherType = (props) => {
  const currentLocale = locales[getTypedKey(props.currentLocaleKey, locales, defaultLocale)];

  return (
    <Listbox onChange={props.handleLocale} value={props.currentLocaleKey}>
      <div className='size-6'>
        <ListboxButton className='size-full text-sky-500 dark:text-sky-400'>
          <currentLocale.icon />
        </ListboxButton>
      </div>
      <ListboxOptions
        anchor='bottom'
        className='mt-8 rounded-lg bg-white shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5'
      >
        {Object.entries(props.items).map(([key, { icon, name }]) => {
          return (
            <ListboxOption key={key} value={key}>
              {(args) => {
                return (
                  <div className={`${args.focus && 'bg-slate-100 dark:bg-slate-600/30'} cursor-pointer px-6 py-2`}>
                    <ListItem active={args.selected} icon={icon} title={name} />
                  </div>
                );
              }}
            </ListboxOption>
          );
        })}
      </ListboxOptions>
    </Listbox>
  );
};

export { LocaleSwitcher };
