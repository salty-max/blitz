import tailwindcss from '@tailwindcss/postcss'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Run Tailwind v4 through PostCSS so it only processes CSS — the Vite plugin
  // otherwise parses the `cva(...)` component modules as CSS in Storybook's build.
  viteFinal: (viteConfig) => {
    viteConfig.css = {
      ...viteConfig.css,
      postcss: { plugins: [tailwindcss()] },
    }
    return viteConfig
  },
}

export default config
