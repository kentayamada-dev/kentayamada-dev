import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/ui/listItem';
import { themeOptions } from '@/constants/themes';
import { getTypedThemeKey } from '@/utils/getTypedThemeKey';
import type { ThemeSwitchType } from './types';

const ThemeSwitch: ThemeSwitchType = (props) => {
  const currentTheme = themeOptions[getTypedThemeKey(props.currentThemeKey)];

  return (
    <Listbox onChange={props.handleTheme} value={props.currentThemeKey}>
      <div className='size-6'>
        {props.isMounted ? (
          <ListboxButton className='size-full text-sky-500 dark:text-sky-400'>
            <currentTheme.icon />
          </ListboxButton>
        ) : (
          <div className='size-full animate-pulse'>
            <div className='size-full rounded-full bg-slate-200 dark:bg-slate-700' />
          </div>
        )}
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

export { ThemeSwitch };
