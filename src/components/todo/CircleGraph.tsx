import DefaultText from '@/components/common/DefaultText'
import { TodoType } from '@/stores/todo'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

interface TodoCompletionDonutProps {
  todos: TodoType[]
}

const size = 200
const strokeWidth = 20
const radius = (size - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

function TodoCompletionDonut({todos}: TodoCompletionDonutProps) {
  const theme = useTheme()
  const todayStr = new Date().toDateString()

  // 전체 할 일 개수
  const totalTodos = todos.filter(t => t.category === '업무' || t.category === '개인').length

  // 완료된 개수
  const completedTodos = todos.filter(
    t => t.completedDate && new Date(t.completedDate).toDateString() === todayStr,
  ).length

  // 완료 비율
  const progress = totalTodos === 0 ? 0 : completedTodos / totalTodos

  return (
    <StyledWrapper>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {totalTodos > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.color.blue}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * progress} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        )}
      </Svg>

      <StyledCenterLabel>
        <DefaultText fontWeight={theme.fontWeight.bold} color={theme.color.blue}>
          {completedTodos}/{totalTodos} 완료
        </DefaultText>
      </StyledCenterLabel>
    </StyledWrapper>
  )
}

export default TodoCompletionDonut

const StyledWrapper = styled(View)`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
`

const StyledCenterLabel = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
`
