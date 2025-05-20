import type { TextAreaType } from './types';

const TextArea: TextAreaType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { label, name, ...textAreaProps } = props;

  return (
    <div>
      <label className='text-primary block pb-2 text-base font-medium' htmlFor={name}>
        {label}
      </label>
      <textarea
        className='bg-primary placeholder-primary block w-full rounded-lg p-2.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 focus:-outline-offset-2 focus:outline-blue-500 dark:text-white dark:outline-gray-600'
        id={name}
        name={name}
        {...textAreaProps}
      />
    </div>
  );
};

export { TextArea };
