import Link from 'next/link';
import { LinkIcon } from '@/components/icons/linkIcon';
import { dictionaries } from '@/constants/i18n';
import { headingLevels } from '@/constants/toc';
import type { HTMLAttributes } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { HeadingLevelType } from '@/constants/toc/types';
import type { JSXElementType } from '@/types/components';

// eslint-disable-next-line id-length
const H = (heading: HeadingLevelType, locale: LocaleKeyType) => {
  const headings = headingLevels.reduce(
    (acc, level) => {
      return { ...acc, [level]: 0 };
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    {} as Record<HeadingLevelType, number>
  );

  const getHeadingId = (headingLevel: HeadingLevelType): string => {
    headings[headingLevel] += 1;

    return `${heading}-${headings[headingLevel]}`;
  };

  // eslint-disable-next-line react/display-name, func-names
  return function (props: HTMLAttributes<HTMLHeadingElement>): JSXElementType {
    const headingId = getHeadingId(heading);
    const Tag = heading;
    const isFootnotes = props.children === 'Footnotes';
    const { articles } = dictionaries[locale];

    return (
      <Tag className='group relative flex' id={headingId}>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
          aria-label={`${articles.permalink}: ${props.children}`}
          className='absolute top-2 -left-6 block size-5 text-blue-500 opacity-0 group-hover:opacity-100 focus:opacity-100'
          href={`#${headingId}`}
        >
          <LinkIcon />
        </Link>
        {isFootnotes ? articles.footnotes : props.children}
      </Tag>
    );
  };
};

export { H };
