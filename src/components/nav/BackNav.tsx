import BackBtnSvg from '@/assets/icons/backBtnIcon.svg'
import { heightPercentage } from '@/styles/mediaQuery'
import styled from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  children?: ReactNode
}

function BackNav({children}: Props) {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  return (
    <StyledWrapper style={{marginTop: insets.top}}>
      <StyledIconButton onPress={() => navigation.goBack()}>
        <BackBtnSvg />
      </StyledIconButton>

      <StyledRightWrapper>{children}</StyledRightWrapper>
    </StyledWrapper>
  )
}

export default BackNav

const StyledWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: ${heightPercentage(40)}px;
`

const StyledIconButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
`

const StyledRightWrapper = styled(View)`
  position: absolute;
  right: 0;
`
