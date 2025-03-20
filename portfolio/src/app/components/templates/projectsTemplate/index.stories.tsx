import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ProjectsTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale,
    projects: [
      {
        description: 'Project 1',
        forkCount: 4,
        name: 'project-1',
        stargazerCount: 11,
        url: '#'
      },
      {
        description: 'Project 2',
        forkCount: 4,
        name: 'project-2',
        stargazerCount: 11,
        url: '#'
      },
      {
        description: 'Project 3',
        forkCount: 4,
        name: 'project-3',
        stargazerCount: 11,
        url: '#'
      }
    ]
  },
  component: ProjectsTemplate
} satisfies Meta<typeof ProjectsTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
