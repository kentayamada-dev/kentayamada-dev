import type { ComponentType } from '@/types/components';

type CareerListProps = {
  careerListTitle: string;
  careers: {
    endDate: Date;
    logo: {
      title: string;
      url: string;
    };
    organization: string;
    role: string;
    startDate: Date;
  }[];
  labels: {
    organization: string;
    period: string;
    present: string;
    role: string;
  };
};

type CareerListType = ComponentType<CareerListProps>;

export type { CareerListProps, CareerListType };
