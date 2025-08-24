import LogoImg from '@/assets/images/serviceLogo.png'
import styled from '@emotion/native'
import { Image, View } from 'react-native'

function Loading() {
  return (
    <StyledLogoWrapper>
      <StyledLogo source={LogoImg} resizeMode="cover" />
    </StyledLogoWrapper>
  )
}

export default Loading

const StyledLogoWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled(Image)`
  width: 200px;
  height: 200px;
`
