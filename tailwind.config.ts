import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  // The paths Tailwind should scan for class names. We removed MDX and
  // Markdown files as part of simplifying the project, so only TS and TSX
  // files are included here. If you add additional file types, update this
  // array accordingly.
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#F59E0B',
          foreground: '#FFFFFF'
        }
      }
    }
  },
  // We removed the `@tailwindcss/forms` plugin because it could not be
  // installed due to registry restrictions. If you want to add it back,
  // install the package and list it here. For now we rely on default form
  // styling and the tailwindcss-animate plugin for transitions.
  plugins: [require('tailwindcss-animate')]
} satisfies Config