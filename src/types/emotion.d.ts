import { lightTheme } from '@/styles/theme'
import '@emotion/react'

type AppTheme = typeof lightTheme

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
