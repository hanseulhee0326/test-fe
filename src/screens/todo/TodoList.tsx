import TodoFormButton from '@/components/button/TodoFormButton'
import ToggleSwitch from '@/components/button/ToggleSwithch'
import DefaultText from '@/components/common/DefaultText'
import LogoNav from '@/components/nav/LogoNav'
import TodoCard from '@/components/todo/TodoCard'
import { categoryOptions } from '@/constants/category'
import { useAuth } from '@/hooks/useAuth'
import { useThemeStore } from '@/stores/theme'
import { TodoStore, TodoType, useTodoStore } from '@/stores/todo'
import { heightPercentage } from '@/styles/mediaQuery'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { StackNavigationProp } from '@react-navigation/stack'
import { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TodoListNavigationProp = StackNavigationProp<RootStackParamList, 'TodoList'>

interface TodoListProps {
  navigation: TodoListNavigationProp
}

function TodoList({navigation}: TodoListProps) {
  const theme = useTheme()
  const {user} = useAuth()
  const todoStore = useTodoStore(user?.email || '')
  const todos: TodoType[] = todoStore((state: TodoStore) => state.todos)

  const insets = useSafeAreaInsets()
  const {isDark, toggleTheme} = useThemeStore()
  const [reverseOrder, setReverseOrder] = useState(false)

  const orderedCategories = reverseOrder ? [...categoryOptions].reverse() : categoryOptions

  const getFilteredTodos = (categoryName: string) => {
    return todos
      .filter(todo => todo.category === categoryName)
      .sort((a, b) => {
        if (a.completedDate && !b.completedDate) return 1
        if (!a.completedDate && b.completedDate) return -1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }

  const todoButtonBottom = heightPercentage(56) + insets.bottom + 16

  return (
    <StyledWrapper>
      <LogoNav navigation={navigation} />
      <ToggleWrapper>
        <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
      </ToggleWrapper>

      <StyledChildrenWrapper marginBottom={todoButtonBottom}>
        <StyledTodayTodo>
          <StyledTodoCount>
            <DefaultText size="large" fontWeight={theme.fontWeight.bold}>
              할 일
            </DefaultText>
            <DefaultText size="large" color={theme.color.blue} fontWeight={theme.fontWeight.bold}>
              {todos.length}
            </DefaultText>
          </StyledTodoCount>

          <StyledOrderWrapper onPress={() => setReverseOrder(!reverseOrder)}>
            <DefaultText size="small">{reverseOrder ? '개인 → 업무' : '업무 → 개인'}</DefaultText>
          </StyledOrderWrapper>
        </StyledTodayTodo>

        {todos.length === 0 ? (
          <StyledNoTodo>
            <DefaultText>No tasks for you.</DefaultText>
          </StyledNoTodo>
        ) : (
          <StyledScrollView>
            {orderedCategories.map(category => {
              const filtered = getFilteredTodos(category.name)
              if (!filtered.length) return null

              return (
                <StyledCategoryWrapper key={category.name}>
                  <StyledCategoryTitleWrapper>
                    <DefaultText fontWeight={theme.fontWeight.bold}>
                      {category.icon} {category.name}
                    </DefaultText>
                    <DefaultText fontWeight={theme.fontWeight.bold} color={theme.color.blue}>
                      {filtered.length}
                    </DefaultText>
                  </StyledCategoryTitleWrapper>

                  {filtered.map((todo: TodoType) => (
                    <TodoCard key={todo.id} data={todo} />
                  ))}
                </StyledCategoryWrapper>
              )
            })}
          </StyledScrollView>
        )}
      </StyledChildrenWrapper>

      <StyledTodoWriteButtonWrapper bottom={todoButtonBottom}>
        <TodoFormButton />
      </StyledTodoWriteButtonWrapper>
    </StyledWrapper>
  )
}

export default TodoList

const StyledWrapper = styled(View)`
  position: relative;
  flex: 1;
  width: 100%;
  background-color: ${({theme}) => theme.color.white};
  color: ${({theme}) => theme.color.black};
`

const ToggleWrapper = styled(View)`
  align-items: flex-end;
  padding-right: 16px;
`

const StyledChildrenWrapper = styled(View)<{marginBottom: number}>`
  flex: 1;
  padding: 0 16px;
  flex-direction: column;
  margin-bottom: ${({marginBottom}) => marginBottom}px;
`

const StyledTodayTodo = styled(View)`
  margin: 10px 0 20px;
  flex-direction: row;
  justify-content: space-between;
`

const StyledTodoCount = styled(View)`
  flex-direction: row;
  gap: 3px;
`

const StyledNoTodo = styled(View)`
  align-items: center;
  justify-content: center;
  height: 60%;
`

const StyledTodoWriteButtonWrapper = styled(View)<{bottom: number}>`
  position: absolute;
  bottom: ${({bottom}) => bottom}px;
  right: 0;
  padding-right: 16px;
`

const StyledCategoryTitleWrapper = styled(View)`
  flex-direction: row;
  gap: 3px;
`

const StyledCategoryWrapper = styled(View)`
  margin-bottom: 30px;
`

const StyledOrderWrapper = styled(TouchableOpacity)`
  padding: 4px 10px;
  background-color: ${({theme}) => theme.color.gray100};
  border-radius: 6px;
  align-self: flex-end;
  margin-bottom: 10px;
`

const StyledScrollView = styled(ScrollView)`
  flex-grow: 1;
`
