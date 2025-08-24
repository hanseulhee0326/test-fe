import LogoImg from '@/assets/images/serviceLogo.png'
import styled from '@emotion/native'
import { ReactNode } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface LayoutProps {
  children: ReactNode
}

function AuthLayout({children}: LayoutProps) {
  const insets = useSafeAreaInsets()

  return (
    <StyledWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            paddingTop: insets.top + 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <StyledLogoWrapper>
            <StyledLogo source={LogoImg} resizeMode="cover" />
          </StyledLogoWrapper>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </StyledWrapper>
  )
}

export default AuthLayout

const StyledWrapper = styled(View)`
  flex: 1;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.white};
`

const StyledLogoWrapper = styled(View)`
  width: 100%;
  height: 90px;
`

const StyledLogo = styled(Image)`
  width: 100%;
  height: 100%;
`
