import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, ConditionalPickType, JSXElementType } from '@/types/components';
import type { LikeButtonWrapperProps } from '../likeButtonWrapper/types';
import type { CopyToClipboardButtonProps } from './copyToClipboardButtonWrapper/types';

type ArticleProps = ConditionalPickType<LikeButtonWrapperProps, 'likeKey' | 'likeCount'> &
  ConditionalPickType<CopyToClipboardButtonProps, 'url'> & {
    articleTitle: string;
    content: JSXElementType;
    createdAt: Date;
    locale: LocaleKeyType;
    tocTitle: string;
    topics: string[];
    updatedAt: Date;
  };

type ArticleType = ComponentType<ArticleProps>;

export type { ArticleType };
