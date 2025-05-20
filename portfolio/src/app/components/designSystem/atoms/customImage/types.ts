import type { ImageProps } from 'next/image';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type CustomImageProps = ConditionalPickType<ImageProps, 'alt' | 'src' | 'style', 'priority' | 'sizes'>;

type CustomImageType = ComponentType<CustomImageProps>;

export type { CustomImageType };
