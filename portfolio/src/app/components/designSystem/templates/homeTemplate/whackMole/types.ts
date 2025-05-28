import type { ComponentType } from '@/types/components';

type WhackMoleType = ComponentType;

type MoleStateType = {
  hit: Set<number>;
  visible: Set<number>;
};

export type { MoleStateType, WhackMoleType };
