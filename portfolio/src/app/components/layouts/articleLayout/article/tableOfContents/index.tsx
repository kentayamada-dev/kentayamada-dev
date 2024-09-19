'use client';

import { useEffect, useRef, useState } from 'react';
import { dictionaries } from '@/constants/i18n';
import { isHTMLElement } from '@/typeGuards';
import type { TableOfContentsHeadingType, TableOfContentsType } from './types';

const TableOfContents: TableOfContentsType = (props) => {
  const dict = dictionaries[props.lang];
  const [headings, setHeadings] = useState<TableOfContentsHeadingType[]>([]);
  const [activeId, setActiveId] = useState('');
  const tocContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelector(`.${props.articleClassName}`)?.querySelectorAll('h1, h2, h3, h4, h5, h6') ?? []
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

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + props.offset;
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

    const throttledHandleScroll = (): void => {
      if (!ticking) {
        setTimeout(handleScroll, 700);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return (): void => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [headings, props.offset]);

  useEffect(() => {
    const tocContainer = tocContainerRef.current;

    if (activeId && tocContainer) {
      const activeElement = tocContainer.querySelector(`a[href="#${activeId}"]`);

      if (activeElement) {
        const elementRect = activeElement.getBoundingClientRect();
        const containerRect = tocContainer.getBoundingClientRect();

        if (
          isHTMLElement(activeElement) &&
          (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom)
        ) {
          tocContainer.scrollTop =
            // prettier-ignore
            activeElement.offsetTop - (tocContainer.offsetHeight / 2) + (activeElement.clientHeight / 2);
        }
      }
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    return (event: React.MouseEvent<HTMLAnchorElement>): void => {
      event.preventDefault();

      const targetElement = document.getElementById(id);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - props.offset + 5;

        window.scrollTo({
          behavior: 'smooth',
          top: offsetPosition
        });
      }
    };
  };

  return (
    <div className='p-5'>
      <div className='mb-5 text-lg font-semibold text-slate-900 dark:text-white'>{dict.articles.toc}</div>
      <ul className='max-h-[calc(100vh-12rem)] overflow-auto' ref={tocContainerRef}>
        {/* eslint-disable multiline-ternary, @typescript-eslint/indent */}
        {headings.length > 0
          ? headings.map((heading) => {
              const isActive = heading.id === activeId;

              return (
                <li
                  className={`${isActive ? 'font-bold text-sky-500 dark:text-sky-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'} text-sm`}
                  key={heading.id}
                  style={{
                    marginBottom: headings[headings.length - 1]?.id === heading.id ? '0px' : '0.5rem',
                    marginLeft: `${(heading.level - 1) * 1}rem`
                  }}
                >
                  <a href={`#${heading.id}`} onClick={handleClick(heading.id)}>
                    {heading.text}
                  </a>
                </li>
              );
            })
          : Array.from({ length: 20 }).map((_, index) => {
              return (
                <li
                  className='animate-pulse'
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    marginLeft: `${(index % 5) * 1}rem`
                  }}
                >
                  <div className='h-3 bg-slate-300 dark:bg-slate-700' />
                </li>
              );
            })}
        {/* eslint-enable multiline-ternary, @typescript-eslint/indent */}
      </ul>
    </div>
  );
};

export { TableOfContents };
