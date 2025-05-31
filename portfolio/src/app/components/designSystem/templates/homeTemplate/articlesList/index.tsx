'use client';

import { motion } from 'framer-motion';
import { ArticleLink } from '@/components/designSystem/molecules';
import type { ArticlesListType } from './types';

const ANIMATION_DELAY = 1;
const ANIMATION_DURATION = 0.3;

const ArticlesList: ArticlesListType = (props) => {
  return (
    <div className='flex flex-col gap-y-10'>
      {props.articles.map((article, index) => {
        return (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className='flex'
            initial={{ opacity: 0, x: -50 }}
            key={article.slug}
            transition={{
              delay: ANIMATION_DELAY + index * ANIMATION_DURATION,
              duration: ANIMATION_DURATION,
              ease: 'easeOut'
            }}
          >
            <ArticleLink
              createdAt={article.createdAt}
              description={article.description}
              href={`${props.articlesHref}/${article.slug}`}
              locale={props.locale}
              title={article.title}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export { ArticlesList };
