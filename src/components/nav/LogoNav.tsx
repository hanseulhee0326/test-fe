import ServiceLogo from '@/assets/images/serviceLogo.png'
import DefaultButton from '@/components/common/DefaultButton'
import { useAuth } from '@/hooks/useAuth'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { StackNavigationProp } from '@react-navigation/stack'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type LogoNavProps = {
  navigation: StackNavigationProp<RootStackParamList>
}

function LogoNav({navigation}: LogoNavProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const {logout} = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigation.reset({
        index: 0,
        routes: [{name: 'Signin'}],
      })
    } catch (error) {
      Alert.alert('로그아웃 실패', '다시 시도해주세요.')
    }
  }

  return (
    <StyledNavWrapper style={{marginTop: insets.top}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
        <StyledNavLogo source={ServiceLogo} />
      </TouchableOpacity>
      <StyledEmailWrapper>
        <DefaultButton
          content="Log out"
          onPress={handleLogout}
          backgroundColor={theme.color.gray100}
          type="label"
          width="100"
          height="30"
        />
      </StyledEmailWrapper>
    </StyledNavWrapper>
  )
}
export default LogoNav

const StyledNavWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

const StyledEmailWrapper = styled(TouchableOpacity)`
  padding: 4px 8px;
`

const StyledNavLogo = styled(Image)`
  width: 80px;
  height: 80px;
`
