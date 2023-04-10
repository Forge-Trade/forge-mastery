import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import DocsFooter from './components/DocsFooter'

const config: DocsThemeConfig = {
  logo: <span>Forge DEX</span>,
  feedback:{
    content: null,
  },
  footer:{
    component: DocsFooter
  },
  themeSwitch: {
    component: <></>
  },
  editLink:{
    component: <></>
  },
  sidebar: {
    toggleButton: true
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Forge'
    }
  },
  primaryHue:{
    dark: 14,
    light: 14
  },
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark'
  }
}

export default config