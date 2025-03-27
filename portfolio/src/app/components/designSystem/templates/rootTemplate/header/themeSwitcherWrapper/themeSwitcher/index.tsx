import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ListItem } from '@/components/designSystem/atoms';
import { dictionaries } from '@/constants/i18n';
import { defaultTheme, themeOptions } from '@/constants/themes';
import { getTypedKey } from '@/utils';
import type { ThemeSwitcherType } from './types';

const ThemeSwitcher: ThemeSwitcherType = (props) => {
  const currentTheme = themeOptions[getTypedKey(props.currentThemeKey, themeOptions, defaultTheme)];
  const { themeSwitcherLabel } = dictionaries[props.locale].labels;

  return (
    <Listbox onChange={props.handleTheme} value={props.currentThemeKey}>
      <div className='size-6'>
        {props.isMounted ? (
          <ListboxButton aria-label={themeSwitcherLabel} className='btn-list'>
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
        {Object.entries(props.themes).map(([key, { icon, name }]) => {
          return (
            <ListboxOption key={key} value={key}>
              {(args) => {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { focus, selected } = args;

                return (
                  <div className={`${focus && 'bg-slate-100 dark:bg-slate-600/30'} cursor-pointer px-6 py-2`}>
                    <ListItem icon={icon} isActive={selected} title={name} />
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
