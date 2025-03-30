import { addons } from '@storybook/manager-api';

function camelToTitle(str: string): string {
  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return result
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

addons.setConfig({
  sidebar: {
    renderLabel: ({ name, type }) => {
      return camelToTitle(name);
    }
  }
});
