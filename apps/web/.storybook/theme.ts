import { create } from 'storybook/theming/create'

/**
 * The Spike! theme for Storybook's chrome and docs — newsprint paper, ink text,
 * an ink toolbar with a gold selection, and blood as the primary accent. Sharp
 * corners throughout, to match the components.
 */
export default create({
  base: 'light',
  brandTitle: 'Blitz UI',
  brandTarget: '_self',

  colorPrimary: '#a01b1b', // blood
  colorSecondary: '#a01b1b', // blood — selection / active

  // Sidebar and surfaces
  appBg: '#e4dcc8', // paper-2
  appContentBg: '#efe9da', // paper
  appPreviewBg: '#efe9da',
  appBorderColor: 'rgba(22, 19, 16, 0.15)',
  appBorderRadius: 0,

  // Text
  textColor: '#161310', // ink
  textInverseColor: '#efe9da', // paper
  textMutedColor: 'rgba(22, 19, 16, 0.55)',

  // Toolbar above the canvas — the app's ink masthead, gold for the active tool
  barBg: '#161310', // ink
  barTextColor: 'rgba(239, 233, 218, 0.7)',
  barHoverColor: '#efe9da',
  barSelectedColor: '#e7b008', // gold

  // Controls / form fields
  inputBg: '#efe9da',
  inputBorder: '#161310',
  inputTextColor: '#161310',
  inputBorderRadius: 0,

  fontBase: '"Geist", system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
})
