import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  HTML_META_AUTHOR,
  HTML_META_ROBOTS,
  META_KEYWORDS,
} from './src/seo/siteMeta.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-html-meta-placeholders',
      transformIndexHtml(html) {
        return html
          .replace(/__META_KEYWORDS__/g, META_KEYWORDS.replace(/&/g, '&amp;').replace(/"/g, '&quot;'))
          .replace(/__META_AUTHOR__/g, HTML_META_AUTHOR.replace(/&/g, '&amp;').replace(/"/g, '&quot;'))
          .replace(/__META_ROBOTS__/g, HTML_META_ROBOTS.replace(/&/g, '&amp;').replace(/"/g, '&quot;'))
      },
    },
  ],
  base: '/', // https://mattiasutancykeln.github.io
})
