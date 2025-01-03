import { LinkIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { headingLevels } from '@/constants/toc';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { HeadingLevelType } from '@/constants/toc/types';
import type { JSXElementType } from '@/types/components';

// eslint-disable-next-line id-length
const H = (heading: HeadingLevelType, locale: LocaleKeyType) => {
  const headings = headingLevels.reduce(
    (acc, level) => {
      return { ...acc, [level]: 0 };
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as Record<HeadingLevelType, number>
  );

  const getHeadingId = (headingLevel: HeadingLevelType): string => {
    headings[headingLevel] += 1;

    return `${heading}-${headings[headingLevel]}`;
  };

  // eslint-disable-next-line react/display-name
  return (props: React.HTMLAttributes<HTMLHeadingElement>): JSXElementType => {
    const headingId = getHeadingId(heading);
    const Tag = heading;
    const isFootnotes = props.children === 'Footnotes';
    const dict = dictionaries[locale];

    return (
      <Tag className='group relative flex items-center' id={headingId}>
        <a
          className='absolute -left-5 block size-5 text-sky-500 opacity-0 focus:opacity-100 group-hover:opacity-100'
          href={`#${headingId}`}
        >
          <LinkIcon />
        </a>
        {isFootnotes ? dict.articles.footnotes : props.children}
      </Tag>
    );
  };
};

export { H };
