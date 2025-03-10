import type { PreType } from './types';

const Pre: PreType = (props) => {
  return <pre {...props} tabIndex={-1} />;
};

export { Pre };
