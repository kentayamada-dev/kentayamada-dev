import type { InputType } from './types';

const Input: InputType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { type, ...rest } = props;

  if (type === 'checkbox') {
    return (
      <>
        <input className='peer hidden' type={type} {...rest} />
        <div className="inline-flex size-5 items-center justify-center rounded-md border-2 border-slate-400 text-sm peer-checked:border-none peer-checked:bg-sky-500 peer-checked:before:block peer-checked:before:text-white peer-checked:before:content-['✔']" />
      </>
    );
  }

  return <input type={type} {...rest} />;
};

export { Input };
