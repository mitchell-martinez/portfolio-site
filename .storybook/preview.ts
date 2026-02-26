import type { Preview } from '@storybook/react-vite';
import '../app/styles/global.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a0a' }],
    },
  },
};

export default preview;
