import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../app/components/**/index.stories.ts'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-outline',
    'storybook-dark-mode',
    '@storybook/addon-themes'
  ],
  framework: '@storybook/nextjs',
  core: {
    disableTelemetry: true
  }
};

export default config;
