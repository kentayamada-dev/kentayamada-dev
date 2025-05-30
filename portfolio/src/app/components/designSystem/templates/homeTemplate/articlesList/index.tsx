'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Article } from './article';
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
            <Link className='bg-primary hover-primary rounded-lg p-3' href={`${props.articlesHref}/${article.slug}`} key={article.slug}>
              <Article
                createdAt={article.createdAt}
                description={article.description}
                locale={props.locale}
                readArticle={props.readArticle}
                title={article.title}
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export { ArticlesList };
