import { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/app/components/**/index.stories.tsx'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/nextjs-vite',
  env: (config) => {
    return {
      ...config,
      NEXT_PUBLIC_RECAPTCHA_SITEKEY: 'NEXT_PUBLIC_RECAPTCHA_SITEKEY'
    };
  },
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
