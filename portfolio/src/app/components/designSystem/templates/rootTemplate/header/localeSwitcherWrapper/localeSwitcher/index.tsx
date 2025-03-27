import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/designSystem/atoms';
import { dictionaries } from '@/constants/i18n';
import type { LocaleSwitcherType } from './types';

const LocaleSwitcher: LocaleSwitcherType = (props) => {
  const currentLocaleObj = props.locales[props.locale];
  const { localeSwitcherLabel } = dictionaries[props.locale].labels;

  return (
    <Listbox onChange={props.handleLocale} value={props.locale}>
      <div className='size-6'>
        <ListboxButton aria-label={localeSwitcherLabel} className='btn-list'>
          <currentLocaleObj.icon />
        </ListboxButton>
      </div>
      <ListboxOptions
        anchor='bottom'
        className='mt-8 rounded-lg bg-white shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-slate-300/10'
      >
        {Object.entries(props.locales).map(([key, { icon, name }]) => {
          return (
            <ListboxOption key={key} value={key}>
              {(args) => {
                return (
                  <div className={`${args.focus && 'bg-slate-100 dark:bg-slate-600/30'} cursor-pointer px-6 py-2`}>
                    <ListItem icon={icon} isActive={args.selected} title={name} />
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
