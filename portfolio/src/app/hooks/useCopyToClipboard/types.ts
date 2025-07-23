type CopyFnType = (text: string) => Promise<boolean>;

type UseCopyToClipboardType = () => [boolean, CopyFnType];

export type { CopyFnType, UseCopyToClipboardType };
