import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../libs/personal-voice/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../libs/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '@workspace/shared',
            replacement: path.resolve(__dirname, '../libs/shared')
          }
        ]
      }
    });
  },
};
export default config;