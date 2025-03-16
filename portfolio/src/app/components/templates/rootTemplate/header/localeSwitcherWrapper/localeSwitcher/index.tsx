import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/atoms';
import { dictionaries } from '@/constants/i18n';
import type { LocaleSwitcherType } from './types';

const LocaleSwitcher: LocaleSwitcherType = (props) => {
  const currentLocale = props.items[props.lang];
  const dict = dictionaries[props.lang];

  return (
    <Listbox onChange={props.handleLocale} value={props.lang}>
      <div className='size-6'>
        <ListboxButton aria-label={dict.labels.localeSwitcherLabel} className='btn-list'>
          <currentLocale.icon />
        </ListboxButton>
      </div>
      <ListboxOptions
        anchor='bottom'
        className='mt-8 rounded-lg bg-white shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-slate-300/10'
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
