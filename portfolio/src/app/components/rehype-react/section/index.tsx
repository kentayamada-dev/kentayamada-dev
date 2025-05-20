import type { SectionType } from './types';

const Section: SectionType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;

  if (className === 'footnotes') {
    return <section className={`${className} section-footnotes`} {...rest} />;
  }

  return <section className={className} {...rest} />;
};

export { Section };
