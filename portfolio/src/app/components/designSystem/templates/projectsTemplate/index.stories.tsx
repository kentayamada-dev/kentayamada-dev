import { projectsListStory } from '@/components/designSystem/molecules';
import { ProjectsTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...projectsListStory.argTypes },
  args: {
    ...projectsListStory.args,
    title: 'Projects'
  },
  component: ProjectsTemplate
} satisfies Meta<typeof ProjectsTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
