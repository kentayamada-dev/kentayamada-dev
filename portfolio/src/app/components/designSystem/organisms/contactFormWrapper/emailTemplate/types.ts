import type { DeepReadonlyType, JSXElementType } from '@/types/components';

type EmailTemplateProps = {
  data: {
    label: string;
    value: string;
  }[];
};

type EmailTemplateType = (props: DeepReadonlyType<EmailTemplateProps>) => JSXElementType | string;

export type { EmailTemplateType };
