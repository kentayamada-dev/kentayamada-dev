import type { PreType } from './types';

const Pre: PreType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { tabIndex, ...rest } = props;

  return <pre tabIndex={-1} {...rest} />;
};

export { Pre };
