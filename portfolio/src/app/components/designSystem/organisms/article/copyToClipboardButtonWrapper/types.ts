import type { ComponentType } from '@/types/components';

type CopyToClipboardButtonProps = {
  label: string;
  url: string;
};

type CopyToClipboardButtonType = ComponentType<CopyToClipboardButtonProps>;

export type { CopyToClipboardButtonProps, CopyToClipboardButtonType };
