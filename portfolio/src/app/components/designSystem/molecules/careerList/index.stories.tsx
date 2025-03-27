import { CareerList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    careerListTitle: 'Career List',
    careers: [
      {
        endDate: new Date('1000-01-01T00:00:00.000Z'),
        logo: {
          title: 'Logo of Centennial College',
          url: 'storybook/image1.jpg'
        },
        organization: 'Centennial College',
        role: 'Software Engineering',
        startDate: new Date('2023-09-01T00:00:00.000Z')
      },
      {
        endDate: new Date('2023-04-01T00:00:00.000Z'),
        logo: {
          title: 'Logo of CyberAgent, Inc',
          url: 'storybook/image2.jpg'
        },
        organization: 'CyberAgent, Inc.',
        role: 'Front-End Engineer',
        startDate: new Date('2021-04-01T00:00:00.000Z')
      },
      {
        endDate: new Date('2021-03-31T00:00:00.000Z'),
        logo: {
          title: 'Logo of Tokyo Institute of Technology',
          url: 'storybook/image3.jpg'
        },
        organization: 'Tokyo Institute of Technology',
        role: 'Computer Science',
        startDate: new Date('2018-04-01T00:00:00.000Z')
      }
    ],
    labels: {
      organization: 'Organization',
      period: 'Period',
      present: 'Present',
      role: 'Role'
    }
  },
  component: CareerList
} satisfies Meta<typeof CareerList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
