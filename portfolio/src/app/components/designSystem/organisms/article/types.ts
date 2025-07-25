import type { ShareProps } from '@/components/designSystem/molecules';
import type { ComponentType, ConditionalPickType, JSXElementType, StrictOmitType } from '@/types/components';
import type { LikeButtonWrapperProps } from '../likeButtonWrapper/types';

type ArticleProps = ConditionalPickType<LikeButtonWrapperProps, 'onCountLike' | 'likeCount'> &
  StrictOmitType<ShareProps, 'title'> & {
    articleTitle: string;
    content: JSXElementType;
    createdAt: Date;
    tocTitle: string;
    topics: string[];
    updatedAt: Date;
  };

type ArticleType = ComponentType<ArticleProps>;

export type { ArticleType };
