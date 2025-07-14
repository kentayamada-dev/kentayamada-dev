import type { ComponentType } from '@/types/components';

type JsonLdProps = {
  jsonLd: Record<string, unknown>;
};

type JsonLdType = ComponentType<JsonLdProps>;

export type { JsonLdType };
