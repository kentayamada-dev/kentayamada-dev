import type { ComponentType } from '@/types/components';

type CodeBlockProps = {
  copyCodeLabel: string;
  html: string;
  lang: string;
  title: string;
};

type CodeBlockType = ComponentType<CodeBlockProps>;

export type { CodeBlockProps, CodeBlockType };
