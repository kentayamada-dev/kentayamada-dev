import { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/app/components/**/index.stories.tsx'],
  framework: '@storybook/nextjs-vite',
  core: {
    disableTelemetry: true
  },
  staticDirs: [
    {
      from: './assets',
      to: 'storybook'
    }
  ]
};

export default config;
