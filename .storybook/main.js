const { loadConfigFromFile, mergeConfig } = require("vite");
const { resolve } = require('path')


module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(storybookConfig) {
    const { config } = await loadConfigFromFile(
      resolve(__dirname, "../vite.config.ts")
    );
    const plugins = config.plugins.filter((plugin) => plugin.name !== 'vite:vue')
    return mergeConfig(storybookConfig, {
      ...config,
      plugins
    });
  }
}