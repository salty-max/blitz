import './preview.css'

import type { Preview } from '@storybook/react-vite'

import { initI18n } from '../src/i18n'
import theme from './theme'

// Components like RollTable read their labels through react-i18next, so the
// global instance must exist before any story renders.
initI18n()

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
