import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

function camelToTitle(str: string): string {
  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return result
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

addons.setConfig({
  sidebar: {
    renderLabel: ({ name }) => {
      return camelToTitle(name);
    }
  }
});

addons.register('theme-UI', (api) => {
  api.on('globalsUpdated', ({ globals }) => {
    const theme = globals.themeUI === 'dark' ? themes.dark : themes.light;
    addons.setConfig({ theme });
  });
});
