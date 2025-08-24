import DefaultCategory from '@/components/common/DefaultCategory'
import DefaultText from '@/components/common/DefaultText'
import {categoryOptions} from '@/constants/category'
import {TodoType} from '@/stores/todo'
import styled from '@emotion/native'
import {useTheme} from '@emotion/react'
import {View} from 'react-native'

const getTodayCompletionRate = (todos: TodoType[], categoryName: string, todayStr: string) => {
  const filtered = todos.filter(t => t.category === categoryName)
  if (!filtered.length) return 0

  const completedToday = filtered.filter(
    t => t.completedDate && new Date(t.completedDate).toDateString() === todayStr,
  ).length

  return Math.round((completedToday / filtered.length) * 100)
}

function CategoryCompletion({todos}: {todos: TodoType[]}) {
  const theme = useTheme()
  const todayStr = new Date().toDateString()

  return (
    <StyledWrapper>
      {categoryOptions.map(cat => {
        const percent = getTodayCompletionRate(todos, cat.name, todayStr)

        return (
          <StyledCategorySection key={cat.name}>
            <StyledCategoryLabel>
              <DefaultCategory
                content={`${cat.icon} ${cat.name}`}
                backgroundColor={cat.color}
                fontWeight={theme.fontWeight.medium}
                type="label"
                size="small"
              />
              <DefaultText color={theme.color.blue} fontWeight={theme.fontWeight.bold}>
                {percent}%
              </DefaultText>
            </StyledCategoryLabel>

            <StyledProgressBarBackground>
              <StyledProgressBarForeground color={cat.color} width={`${percent}%`} />
            </StyledProgressBarBackground>
          </StyledCategorySection>
        )
      })}
    </StyledWrapper>
  )
}

export default CategoryCompletion

const StyledWrapper = styled(View)`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const StyledCategorySection = styled(View)`
  flex-direction: column;
  gap: 10px;
`

const StyledCategoryLabel = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledProgressBarBackground = styled(View)`
  width: 100%;
  height: 12px;
  background-color: ${({theme}) => theme.color.gray100};
  border-radius: 6px;
  overflow: hidden;
`

const StyledProgressBarForeground = styled(View)<{color: string; width: string}>`
  height: 100%;
  width: ${({width}) => width};
  background-color: ${({color}) => color};
`
