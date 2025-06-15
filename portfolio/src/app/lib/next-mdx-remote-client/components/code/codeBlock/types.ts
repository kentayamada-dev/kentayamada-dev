import type { ComponentType } from '@/types/components';

type CodeBlockProps = {
  html: string;
  lang: string;
  title: string;
};

type CodeBlockType = ComponentType<CodeBlockProps>;

export type { CodeBlockType };
