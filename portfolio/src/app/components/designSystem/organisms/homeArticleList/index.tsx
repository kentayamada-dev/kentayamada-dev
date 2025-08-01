'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RightArrowIcon } from '@/components/icons/rightArrowIcon';
import { getDateString } from '@/utils/getDateString';
import type { HomeArticleListType } from './types';

const ANIMATION_DELAY = 1;
const ANIMATION_DURATION = 0.3;

const HomeArticleList: HomeArticleListType = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='flex w-full flex-col gap-y-10'>
      {/* eslint-disable @stylistic/indent */}
      {isMounted
        ? props.articles.map((article, index) => {
            return (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className='flex'
                initial={{ opacity: 0, x: -50 }}
                key={article.href}
                transition={{
                  delay: ANIMATION_DELAY + index * ANIMATION_DURATION,
                  duration: ANIMATION_DURATION,
                  ease: 'easeOut'
                }}
              >
                <Link className='bg-primary hover-primary w-full rounded-lg p-3' href={article.href}>
                  <article className='flex flex-col gap-y-3'>
                    <div className='flex items-center gap-x-2'>
                      <div className='h-3 w-0.5 bg-blue-500' />
                      <time className='text-secondary text-xs' dateTime={article.createdAt.toISOString()} itemProp='datePublished'>
                        {getDateString(article.createdAt, props.locale)}
                      </time>
                    </div>
                    <h2 className='text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>{article.title}</h2>
                    <p className='text-secondary line-clamp-[7] text-sm'>{article.subtitle}</p>
                    <div className='flex items-center'>
                      <span className='text-sm font-semibold text-blue-500'>{props.readArticle}</span>
                      <span className='ml-2 size-5 text-blue-500'>
                        <RightArrowIcon />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })
        : null}
      {/* eslint-enable @stylistic/indent */}
    </div>
  );
};

export { HomeArticleList };
