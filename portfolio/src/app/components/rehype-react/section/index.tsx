import type { SectionType } from './types';

const Section: SectionType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  if (className === 'footnotes') {
    return <section {...rest} className={`${className} section-footnotes`} />;
  }

  return <section {...rest} className={className} />;
};

export { Section };
