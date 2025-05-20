import type { HrType } from './types';

const Hr: HrType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  return <hr className={`${className} my-7`} {...rest} />;
};

export { Hr };
