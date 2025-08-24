import DefaultButton from '@/components/common/DefaultButton'
import DefaultText from '@/components/common/DefaultText'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { StackNavigationProp } from '@react-navigation/stack'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type SuccessWriteTodoNavigationProp = StackNavigationProp<RootStackParamList, 'TodoSuccess'>

interface SuccessWriteTodoProps {
  navigation: SuccessWriteTodoNavigationProp
}

function TodoSuccess({navigation}: SuccessWriteTodoProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <StyledWrapper>
      <DefaultText
        size="large"
        fontWeight={theme.fontWeight.bold}
        style={{marginTop: insets.top, marginBottom: 5}}
      >
        완료!
      </DefaultText>
      <DefaultText size="large" fontWeight={theme.fontWeight.bold}>
        할 일이 만들어졌어요
      </DefaultText>

      <LottieView
        source={require('@/assets/lottie/successTodo.json')}
        style={{width: 300, height: 300}}
        autoPlay
        loop
      />

      <DefaultButton
        content="보러가기"
        backgroundColor={theme.color.gray100}
        onPress={() => navigation.navigate('Home')}
      />
    </StyledWrapper>
  )
}

export default TodoSuccess

const StyledWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
  padding: 0 20px;
`
