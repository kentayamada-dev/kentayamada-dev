import type { PreType } from './types';

const Pre: PreType = (props) => {
  return <pre tabIndex={-1} {...props} />;
};

export { Pre };
