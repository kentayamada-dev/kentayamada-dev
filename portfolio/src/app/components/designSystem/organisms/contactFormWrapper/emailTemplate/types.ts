import type { ContactFormSchemaType } from '@/components/designSystem/molecules';
import type { DeepReadonlyType, JSXElementType } from '@/types/components';

type EmailTemplateProps = ContactFormSchemaType & {
  isPlain?: boolean;
};

type EmailTemplateType = (props: DeepReadonlyType<EmailTemplateProps>) => JSXElementType | string;

export type { EmailTemplateType };
