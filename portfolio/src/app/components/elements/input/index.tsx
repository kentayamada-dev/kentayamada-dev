import type { InputType } from './types';

const Input: InputType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { label, ...inputProps } = props;

  return (
    <div>
      <label className='block pb-2 text-sm font-medium text-black dark:text-white' htmlFor={inputProps.id}>
        {label}
      </label>
      <div>
        <input
          {...inputProps}
          className='block w-full rounded-lg bg-slate-100 p-2.5 text-sm text-black ring-1 ring-gray-300 dark:bg-slate-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400'
        />
      </div>
    </div>
  );
};

export { Input };
