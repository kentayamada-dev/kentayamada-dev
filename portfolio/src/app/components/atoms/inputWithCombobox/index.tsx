import { ChevronDownIcon } from '@/components/icons';
import type { InputWithComboboxType } from './types';

const InputWithCombobox: InputWithComboboxType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { handleOptionChange, id, label, optionValue, options, ...inputProps } = props;

  return (
    <div>
      <label className='text-primary block pb-2 text-base font-medium' htmlFor={id}>
        {label}
      </label>
      <div>
        <div className='flex overflow-hidden rounded-lg ring-1 ring-gray-300 has-[input:focus-within]:ring-2 has-[input:focus-within]:ring-blue-500 dark:ring-gray-600'>
          <input {...inputProps} className='bg-primary grow p-2.5 text-base text-black focus:outline-hidden dark:text-white' id={id} />
          <div className='grid shrink-0 grid-cols-1'>
            <select
              className='bg-primary col-start-1 row-start-1 appearance-none rounded-l-none rounded-r-lg py-1.5 pr-7 pl-3 text-base text-black hover:cursor-pointer focus:outline-2 focus:-outline-offset-2 dark:text-white'
              onChange={handleOptionChange}
              value={optionValue}
            >
              {options.map((target) => {
                return <option key={target}>{target}</option>;
              })}
            </select>
            <span className='bg-primary pointer-events-none col-start-1 row-start-1 mt-0.5 mr-2 size-4 self-center justify-self-end'>
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InputWithCombobox };
