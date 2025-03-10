import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/app/components/**/index.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/nextjs',
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
