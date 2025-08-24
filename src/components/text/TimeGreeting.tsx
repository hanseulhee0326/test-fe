import DefaultText from '@/components/common/DefaultText'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View } from 'react-native'

const GREETINGS = {
  MORNING: '좋은 아침이에요! 오늘 할 일도 화이팅!',
  LUNCH: '점심시간이에요! 남은 일도 차근차근!',
  EVENING: '퇴근 전이에요! 오늘 할 일 마무리 잘하세요!',
  DEFAULT: '오늘도 화이팅!',
}

function TimeGreeting() {
  const theme = useTheme()
  const [greeting, setGreeting] = useState('')

  useFocusEffect(
    useCallback(() => {
      const updateGreeting = () => {
        const now = new Date()
        const hour = (now.getUTCHours() + 9) % 24 // 한국 기준
        if (hour >= 6 && hour < 12) {
          setGreeting(GREETINGS.MORNING)
        } else if (hour >= 12 && hour < 14) {
          setGreeting(GREETINGS.LUNCH)
        } else if (hour >= 17 && hour <= 22) {
          setGreeting(GREETINGS.EVENING)
        } else {
          setGreeting(GREETINGS.DEFAULT)
        }
      }

      updateGreeting()

      const timer = setInterval(updateGreeting, 60 * 1000)

      return () => clearInterval(timer)
    }, []),
  )

  return (
    <StyledWrapper>
      <DefaultText fontWeight={theme.fontWeight.bold} color={theme.color.gray300}>
        {greeting}
      </DefaultText>
    </StyledWrapper>
  )
}

export default TimeGreeting

const StyledWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 15px 0;
`
