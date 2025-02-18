import type { ImageProps } from 'next/image';
import type { ReadonlyComponentType } from '@/types/components';

type CustomImageProps = Pick<ImageProps, 'alt' | 'sizes' | 'src' | 'style'>;

type CustomImageType = ReadonlyComponentType<CustomImageProps>;

export type { CustomImageType };
