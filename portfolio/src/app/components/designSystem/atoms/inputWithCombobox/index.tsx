import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@/components/icons';
import type { InputWithComboboxType } from './types';

const InputWithCombobox: InputWithComboboxType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { handleChangeInput, label, name, optionValue, options, title, ...inputProps } = props;

  return (
    <div className='relative'>
      <label className='text-primary block pb-2 text-base font-medium' htmlFor={name}>
        {label}
      </label>
      <div className='flex overflow-hidden rounded-lg outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-500 dark:outline-gray-600'>
        <input
          className='placeholder-primary bg-primary grow p-2.5 text-base text-black focus:outline-hidden dark:text-white'
          id={name}
          name={name}
          {...inputProps}
        />
        <div>
          <Listbox onChange={handleChangeInput} value={optionValue}>
            <ListboxButton
              aria-label={title}
              className='bg-primary flex h-full w-full items-center justify-center rounded-l-none rounded-r-lg pr-2 pl-3 focus-within:relative hover:cursor-pointer focus:outline-2 focus:-outline-offset-2'
              title={title}
            >
              <div className='mr-1.5 text-black dark:text-white'>{optionValue}</div>
              <div className='text-tertiary size-5'>
                <ChevronDownIcon />
              </div>
            </ListboxButton>
            <ListboxOptions className='absolute top-20 right-0 z-10 h-44 overflow-auto rounded-lg bg-white ring-1 ring-gray-300 dark:bg-slate-800 dark:ring-gray-600'>
              {options.map((option) => {
                return (
                  <ListboxOption
                    className='group relative cursor-pointer px-5 py-3 select-none data-[focus]:bg-slate-100 data-[focus]:text-white data-[focus]:dark:bg-slate-600/30'
                    key={option}
                    value={option}
                  >
                    <span className='text-black dark:text-white'>{option}</span>
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export { InputWithCombobox };
