import ToggleSwitch from '@/components/button/ToggleSwithch'
import DefaultText from '@/components/common/DefaultText'
import LogoNav from '@/components/nav/LogoNav'
import TimeGreeting from '@/components/text/TimeGreeting'
import CategoryCompletion from '@/components/todo/category/CategoryCompletion'
import TodoCompletionDonut from '@/components/todo/CircleGraph'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/stores/theme'
import { TodoStore, useTodoStore } from '@/stores/todo'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { StackNavigationProp } from '@react-navigation/stack'
import { View } from 'react-native'

type TodoGraphNavigationProp = StackNavigationProp<RootStackParamList, 'TodoGraph'>

interface TodoGraphProps {
  navigation: TodoGraphNavigationProp
}

function TodoGraph({navigation}: TodoGraphProps) {
  const theme = useTheme()
  const {user} = useAuth()
  const todos = useTodoStore(user?.email || '')((state: TodoStore) => state.todos)

  const {isDark, toggleTheme} = useThemeStore()

  return (
    <StyledWrapper>
      <LogoNav navigation={navigation} />

      <StyledToggleWrapper>
        <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
      </StyledToggleWrapper>

      <StyledContentWrapper>
        <TimeGreeting />

        <StyledCategoryWrapper>
          <TodoCompletionDonut todos={todos} />
          <CategoryCompletion todos={todos} />
        </StyledCategoryWrapper>

        <DefaultText size="small" color={theme.color.gray300}>
          *카테고리에 따라 업무 진행률이 표시됩니다.
        </DefaultText>
      </StyledContentWrapper>
    </StyledWrapper>
  )
}

export default TodoGraph

const StyledWrapper = styled(View)`
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.color.white};
  color: ${({theme}) => theme.color.black};
`

const StyledToggleWrapper = styled(View)`
  align-items: flex-end;
  padding-right: 16px;
`

const StyledContentWrapper = styled(View)`
  padding: 0 20px;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const StyledCategoryWrapper = styled(View)`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`
