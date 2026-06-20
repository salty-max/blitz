import './preview.css'

import type { Preview } from '@storybook/react-vite'

import theme from './theme'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    docs: { theme },
  },
}

export default preview
