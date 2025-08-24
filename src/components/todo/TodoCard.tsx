import DefaultCategory from '@/components/common/DefaultCategory'
import DefaultText from '@/components/common/DefaultText'
import { categoryOptions, priorityOptions } from '@/constants/category'
import { TodoType } from '@/stores/todo'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'

interface TodoCardProps {
  data: TodoType
}

function TodoCard ({data}: TodoCardProps){
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme()

  const isCompleted = !!data.completedDate

  const handlePress = () => {
    navigation.navigate('TodoDetail', {todoId: data.id})
  }

  const handleEdit = (e: GestureResponderEvent) => {
    e.stopPropagation();
    navigation.navigate('TodoForm', {todoId: data.id})
  }

  const categoryColor = categoryOptions.find(p => p.name === data.category)?.color || '#0287C0'
  const priorityColor = priorityOptions.find(p => p.name === data.priority)?.color || '#0287C0'

  return (
    <StyledCardWrapper activeOpacity={0.8} onPress={handlePress}>
      <StyledContentWrapper>
        <StyledRowWrapper>
          <StyledCardTitle completed={isCompleted} fontWeight={theme.fontWeight.medium}>
            {data.title}
          </StyledCardTitle>

          <StyledIconWrapper onPress={handleEdit}>
            <DefaultText type="label" size='small'>✏️</DefaultText>
          </StyledIconWrapper>
        </StyledRowWrapper>

        <StyledRowWrapper>
          {data.category && (
            <DefaultCategory
              content={data.category}
              backgroundColor={isCompleted ? theme.color.gray100 : categoryColor}
              fontWeight={theme.fontWeight.medium}
              type="label"
              size="small"
            />
          )}
          {data.priority && (
            <DefaultCategory
              content={data.priority}
              backgroundColor={isCompleted ? theme.color.gray100 : priorityColor}
              fontWeight={theme.fontWeight.medium}
              type="label"
              size="small"
            />
          )}
        </StyledRowWrapper>
      </StyledContentWrapper>

      <StyledRightColorBar color={isCompleted ? theme.color.gray300 : categoryColor} />
    </StyledCardWrapper>
  )
}

export default TodoCard

const StyledIconWrapper = styled(TouchableOpacity)`
  margin-left: auto;
`

const StyledCardWrapper = styled(TouchableOpacity)`
  position: relative;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.color.white};
  padding: 16px;
  border-radius: 12px;
  shadow-color: ${({theme}) => theme.color.gray500};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  margin: 7px 0;
`

const StyledContentWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  gap: 12px;
`

const StyledRowWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const StyledRightColorBar = styled(View)<{color: string}>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 10px;
  background-color: ${({color}) => color};
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`

const StyledCardTitle = styled(DefaultText)<{completed: boolean}>`
  text-decoration-line: ${({completed}) => (completed ? 'line-through' : 'none')};
  color: ${({completed, theme}) => (completed ? theme.color.gray300 : theme.color.black)};
`
