import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PROJECTS } from './src/data/projects.js'

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    includedRoutes(paths) {
      return [
        ...paths.filter(p => !p.includes(':slug')),
        ...PROJECTS.map(p => `/projets/${p.slug}`),
        '/404',
      ];
    },
  },
})
