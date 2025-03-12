import type { InputType } from './types';

const Input: InputType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { label, ...inputProps } = props;

  return (
    <div>
      <label className='text-primary block pb-2 text-sm font-medium' htmlFor={inputProps.id}>
        {label}
      </label>
      <div className='overflow-hidden rounded-lg ring-1 ring-gray-300 has-[input:focus-within]:ring-2 has-[input:focus-within]:ring-blue-500 dark:ring-gray-600'>
        <input {...inputProps} className='bg-primary w-full p-2.5 text-sm text-black focus:outline-none dark:text-white' />
      </div>
    </div>
  );
};

export { Input };
