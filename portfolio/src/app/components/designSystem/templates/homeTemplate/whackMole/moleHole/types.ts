import type { ComponentType } from '@/types/components';

type MoleHoleProps = {
  index: number;
  isHit: boolean;
  isVisible: boolean;
  onMoleClick: (index: number) => void;
};

type MoleHoleType = ComponentType<MoleHoleProps>;

export type { MoleHoleType };
