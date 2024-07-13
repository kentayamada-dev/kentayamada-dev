import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../app/components/**/index.stories.tsx'],
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
  }
};

export default config;
