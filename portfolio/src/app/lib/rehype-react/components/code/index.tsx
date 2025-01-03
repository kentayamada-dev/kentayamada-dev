import type { CodeType } from './types';

const Code: CodeType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  // @ts-expect-error type mismatch
  const hasDataLanguage = Boolean(rest['data-language']);

  return (
    <code
      className={`${className} not-prose ${!hasDataLanguage && 'rounded-md bg-slate-300/50 p-1 dark:bg-slate-700'}`}
      {...rest}
    />
  );
};

export { Code };
