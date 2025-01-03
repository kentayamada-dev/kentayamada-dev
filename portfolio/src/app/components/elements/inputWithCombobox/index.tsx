import { ChevronDownIcon } from '@/components/icons';
import type { InputWithComboboxType } from './types';

const InputWithCombobox: InputWithComboboxType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { handleOptionChange, label, optionValue, options, ...inputProps } = props;

  return (
    <div>
      <label className='block pb-2 text-sm font-medium text-black dark:text-white' htmlFor='buyPrice'>
        {label}
      </label>
      <div>
        <div className='flex overflow-hidden rounded-lg ring-1 ring-gray-300 has-[input:focus-within]:ring-2 has-[input:focus-within]:ring-blue-500 dark:ring-gray-600'>
          <input
            {...inputProps}
            className='grow bg-slate-100 p-2.5 text-sm text-black focus:outline focus:outline-0 dark:bg-slate-800 dark:text-white'
          />
          <div className='grid shrink-0 grid-cols-1 focus-within:relative'>
            <select
              className='col-start-1 row-start-1 appearance-none rounded-r-lg bg-slate-100 py-1.5 pl-3 pr-7 text-sm text-black hover:cursor-pointer focus:-outline-offset-1 dark:bg-slate-800 dark:text-white'
              onChange={handleOptionChange}
              value={optionValue}
            >
              {options.map((target) => {
                return <option key={target}>{target}</option>;
              })}
            </select>
            <span className='pointer-events-none col-start-1 row-start-1 mr-2 mt-0.5 size-4 self-center justify-self-end bg-slate-100 dark:bg-slate-800'>
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InputWithCombobox };
