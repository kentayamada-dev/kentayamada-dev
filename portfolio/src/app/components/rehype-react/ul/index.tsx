import type { UlType } from './types';

const Ul: UlType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  if (className === 'contains-task-list') {
    return <ul className={`${className} p-0`} {...rest} />;
  }

  return <ul className={className} {...rest} />;
};

export { Ul };
