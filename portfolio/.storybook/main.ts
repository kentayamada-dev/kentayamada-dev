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
  env: (config) => {
    return {
      ...config,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
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
