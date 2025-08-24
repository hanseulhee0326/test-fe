import ServiceLogo from '@/assets/images/serviceLogo.png'
import ToggleSwitch from '@/components/button/ToggleSwithch'
import DefaultButton from '@/components/common/DefaultButton'
import DefaultCategory from '@/components/common/DefaultCategory'
import DefaultText from '@/components/common/DefaultText'
import { categoryOptions, priorityOptions } from '@/constants/category'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/stores/theme'
import { useTodoStore } from '@/stores/todo'
import { RootStackParamList, StackNavProp } from '@/types/navigate'
import formatDate from '@/utils/formatDate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { RouteProp } from '@react-navigation/native'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TodoDetailNavigationProp = StackNavProp<'TodoDetail'>
type TodoDetailRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>

interface TodoDetailProps {
  navigation: TodoDetailNavigationProp
  route: TodoDetailRouteProp
}

function TodoDetail({navigation, route}: TodoDetailProps) {
  const {todoId} = route.params
  const {user} = useAuth()

  const todoStore = useTodoStore(user?.email || '')

  const todo = todoStore.getState().getTodoById(todoId)
  const theme = useTheme()

  if (!todo)
    return (
      <CenteredWrapper>
        <DefaultText>할 일을 찾을 수 없습니다.</DefaultText>
      </CenteredWrapper>
    )

  const categoryColor = categoryOptions.find(p => p.name === todo.category)?.color || '#0287C0'

  const priorityColor = priorityOptions.find(p => p.name === todo.priority)?.color || '#0287C0'

  const {isDark, toggleTheme} = useThemeStore()
  const insets = useSafeAreaInsets()

  return (
    <StyledWrapper>
      <StyledNavWrapper style={{marginTop: insets.top}}>
        <StyledNavLogo source={ServiceLogo} />
        <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
      </StyledNavWrapper>

      <TitleText type="title" size="large" fontWeight={theme.fontWeight.bold}>
        | {todo.title}
      </TitleText>
      <StyledCategoryWrapper>
        {todo.category && (
          <DefaultCategory
            content={todo.category}
            backgroundColor={categoryColor}
            fontWeight={theme.fontWeight.medium}
            type="label"
            size="small"
          />
        )}
        {todo.priority && (
          <DefaultCategory
            content={todo.priority}
            backgroundColor={priorityColor}
            fontWeight={theme.fontWeight.medium}
            type="label"
            size="small"
          />
        )}
      </StyledCategoryWrapper>

      <DefaultText style={{marginVertical: 8}}>
        {todo.startDate ? formatDate(todo.startDate) : formatDate(new Date())} ~ {''}
        {todo.endDate ? formatDate(todo.endDate) : ' ~'}
      </DefaultText>

      <StyledDescriptionWrapper>
        <DefaultText>{todo.content}</DefaultText>
      </StyledDescriptionWrapper>

      <StyledButtonWrapper>
        <DefaultButton
          color={theme.color.white}
          content={todo.completedDate ? '완료 취소' : '할 일 완료'}
          onPress={() => {
            if (todo.completedDate) {
              todoStore.getState().updateTodo(todo.id, {completedDate: null})
            } else {
              todoStore.getState().markComplete(todo.id)
            }
            navigation.navigate('Home')
          }}
        />
        
        <DefaultButton
          color={theme.color.white}
          backgroundColor={theme.color.orange}
          content="삭제"
          onPress={() => {
            todoStore.getState().deleteTodo(todo.id)
            navigation.navigate('Home')
          }}
        />
      </StyledButtonWrapper>
    </StyledWrapper>
  )
}

export default TodoDetail

const StyledWrapper = styled(View)`
  position: relative;
  flex: 1;
  width: 100%;
  padding: 0 20px;
  background-color: ${({theme}) => theme.color.white};
`

const CenteredWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleText = styled(DefaultText)`
  font-size: 20px;
  margin-bottom: 12px;
`

const StyledCategoryWrapper = styled(View)`
  flex-direction: row;
  margin-bottom: 12px;
  gap: 5px;
`

const StyledDescriptionWrapper = styled(View)`
  margin-top: 16px;
`

const StyledNavWrapper = styled(View)`
  top: 0;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const StyledButtonWrapper = styled(View)`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`

const StyledNavLogo = styled(Image)`
  width: 80px;
  height: 80px;
`
