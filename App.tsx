import { useThemeStore } from '@/stores/theme'
import { darkTheme, lightTheme } from '@/styles/theme'
import styled from '@emotion/native'
import { ThemeProvider } from '@emotion/react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RootNavigator from './src/navigators/RootNavigator'

function App() {
  const {isDark} = useThemeStore()

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <StyledWrapper>
        <RootNavigator />
      </StyledWrapper>
    </ThemeProvider>
  )
}

export default App

const StyledWrapper = styled(SafeAreaView)`
  flex: 1;
`
