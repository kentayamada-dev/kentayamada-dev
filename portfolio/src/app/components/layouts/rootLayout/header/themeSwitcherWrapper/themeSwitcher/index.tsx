import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/elements';
import { defaultTheme, themeOptions } from '@/constants/themes';
import { getTypedKey } from '@/utils';
import type { ThemeSwitcherType } from './types';

const ThemeSwitcher: ThemeSwitcherType = (props) => {
  const currentTheme = themeOptions[getTypedKey(props.currentThemeKey, themeOptions, defaultTheme)];

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

export { ThemeSwitcher };
