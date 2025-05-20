import { StorybookConfig } from '@storybook/nextjs';
import { envClient } from '../src/app/constants/env';

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
    const { NEXT_PUBLIC_IS_PRODUCTION, ...clientEnv } = envClient;

    return {
      ...config,
      ...clientEnv
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
