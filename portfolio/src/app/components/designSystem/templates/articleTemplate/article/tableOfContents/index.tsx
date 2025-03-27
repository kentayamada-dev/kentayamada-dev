import { useEffect, useState } from 'react';
import { headingLevels } from '@/constants/toc';
import type { TableOfContentsHeadingType, TableOfContentsType } from './types';

const PLACEHOLDER_COUNT = 20;
const SCROLL_OFFSET = 70;
const MARGIN_LEFT = 2;
const SCROLL_THROTTLE_DELAY = 700;
const HEADING_LEVEL_OFFSET = 2;
const LAST_INDEX_OFFSET = 1;

const TableOfContents: TableOfContentsType = (props) => {
  const [headings, setHeadings] = useState<TableOfContentsHeadingType[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const selectors = headingLevels.join(',');
    const headingElements = Array.from(document.querySelector(`.${props.articleClassName}`)?.querySelectorAll(selectors) ?? []);

    const headingsArray = headingElements.map((heading) => {
      return {
        id: heading.id,
        level: Number(heading.tagName[1]),
        text: heading.textContent ?? ''
      };
    });

    setHeadings(headingsArray);
  }, [props.articleClassName]);

  useEffect(() => {
    let lastActiveId = '';
    let isTicking = false;

    const handleScroll: VoidFunction = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + SCROLL_OFFSET;

          const currentActiveId = headings.reduce((acc, heading) => {
            const element = document.getElementById(heading.id);

            if (element && element.offsetTop <= scrollPosition) {
              return heading.id;
            }

            return acc;
          }, '');

          if (currentActiveId !== lastActiveId) {
            lastActiveId = currentActiveId;
            setActiveId(currentActiveId);
          }

          isTicking = false;
        });

        isTicking = true;
      }
    };

    const throttledHandleScroll: VoidFunction = () => {
      if (!isTicking) {
        setTimeout(handleScroll, SCROLL_THROTTLE_DELAY);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return (): void => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [headings]);

  if (headings.length) {
    return (
      <ul>
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li
              className={`${headings[headings.length - LAST_INDEX_OFFSET]?.id === heading.id ? 'mb-0' : 'mb-2'} ${isActive ? 'font-semibold text-blue-500' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'} text-sm`}
              key={heading.id}
              style={{
                marginLeft: `${(heading.level - HEADING_LEVEL_OFFSET) * MARGIN_LEFT}rem`
              }}
            >
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => {
        return (
          <li
            className={`${index === PLACEHOLDER_COUNT - LAST_INDEX_OFFSET ? 'mb-0' : 'mb-4'} animate-pulse`}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              marginLeft: `${(index % headingLevels.length) * MARGIN_LEFT}rem`
            }}
          >
            <div className='h-3 bg-slate-300 dark:bg-slate-700' />
          </li>
        );
      })}
    </ul>
  );
};

export { TableOfContents };
