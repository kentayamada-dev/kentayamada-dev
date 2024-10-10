import { useEffect, useState } from 'react';
import { headingLevels } from '@/constants/toc';
import { isHTMLElement } from '@/typeGuards';
import type { TableOfContentsHeadingType, TableOfContentsType } from './types';

const TableOfContents: TableOfContentsType = (props) => {
  const [headings, setHeadings] = useState<TableOfContentsHeadingType[]>([]);
  const [activeId, setActiveId] = useState('');
  const numberOfPlaceholders = 20;
  const offset = 70;

  useEffect(() => {
    const selectors = headingLevels.join(',');
    const headingElements = Array.from(
      document.querySelector(`.${props.articleClassName}`)?.querySelectorAll(selectors) ?? []
    );

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
    let ticking = false;

    const handleScroll: VoidFunction = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + offset;
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

          ticking = false;
        });

        ticking = true;
      }
    };

    const throttledHandleScroll: VoidFunction = () => {
      if (!ticking) {
        setTimeout(handleScroll, 700);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return (): void => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [headings]);

  useEffect(() => {
    const tocContainer = props.tocContainerRef.current;

    if (activeId && tocContainer) {
      const activeElement = tocContainer.querySelector(`a[href="#${activeId}"]`);

      if (activeElement) {
        const elementRect = activeElement.getBoundingClientRect();
        const containerRect = tocContainer.getBoundingClientRect();

        if (
          isHTMLElement(activeElement) &&
          (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom)
        ) {
          tocContainer.scroll({
            behavior: 'smooth',
            // prettier-ignore
            top: activeElement.offsetTop - (tocContainer.offsetHeight / 2) + (activeElement.clientHeight / 2)
          });
        }
      }
    }
  }, [activeId, props.tocContainerRef]);

  return (
    <ul>
      {/* eslint-disable multiline-ternary, @typescript-eslint/indent */}
      {headings.length > 0
        ? headings.map((heading) => {
            const isActive = heading.id === activeId;

            return (
              <li
                className={`${headings[headings.length - 1]?.id === heading.id ? 'mb-0' : 'mb-2'} ${isActive ? 'font-bold text-sky-500 dark:text-sky-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'} text-sm`}
                key={heading.id}
                style={{
                  marginLeft: `${(heading.level - 1) * 1}rem`
                }}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            );
          })
        : Array.from({ length: numberOfPlaceholders }).map((_, index) => {
            return (
              <li
                className={`${index === numberOfPlaceholders - 1 ? 'mb-0' : 'mb-4'} animate-pulse`}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  marginLeft: `${(index % 6) * 1}rem`
                }}
              >
                <div className='h-3 bg-slate-300 dark:bg-slate-700' />
              </li>
            );
          })}
      {/* eslint-enable multiline-ternary, @typescript-eslint/indent */}
    </ul>
  );
};

export { TableOfContents };
