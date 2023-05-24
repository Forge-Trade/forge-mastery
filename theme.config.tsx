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
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="ForgeMastery"/>
      <meta property="og:description" content="Capital efficiency comes to the IBC ecosystem." />
      <meta property="og:image" content="/forge-docs-og.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ForgeMastery" />
      <meta name="twitter:description" content="The way of the Forge." />
      <meta name="twitter:image" content="/forge-docs-og.png" />
    </>
  ),
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
