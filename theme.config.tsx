import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import DocsFooter from './components/DocsFooter'
import EditLink from './components/docs/EditLink'

const config: DocsThemeConfig = {
  logo: <span>Forge DEX</span>,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Forge'
    }
  },
  feedback:{
    content: null,
  },
  footer:{
    component: DocsFooter,
  },
  themeSwitch: {
    component: <><div></div></>,
  },
  editLink:{
    component: EditLink,
  },
  sidebar: {
    toggleButton: true
  },
  banner: {
    key: 'forge-launch',
    text: (
      <a href="/resources/launch" target="_blank">
        🌋 Inferno Incentives Program Are Live!  Read more →
      </a>
    )
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
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