import type { LiType } from './types';

const Li: LiType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  if (className === 'task-list-item') {
    return <li className={`${className} flex list-none items-center gap-x-2`} {...rest} />;
  }

  return <li className={className} {...rest} />;
};

export { Li };
