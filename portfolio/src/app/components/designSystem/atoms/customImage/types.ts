import type { ImageProps } from 'next/image';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type CustomImageProps = ConditionalPickType<ImageProps, 'alt' | 'sizes' | 'src' | 'style', 'priority'>;

type CustomImageType = ComponentType<CustomImageProps>;

export type { CustomImageType };
