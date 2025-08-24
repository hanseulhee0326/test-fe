import DefaultButton from '@/components/common/DefaultButton'
import DefaultCategory from '@/components/common/DefaultCategory'
import DefaultText from '@/components/common/DefaultText'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface StepProps {
  category: string
  title: string
  subtitle?: string
  children: ReactNode
  onPrev?: () => void
  onNext?: () => void
  onSkip?: () => void
  nextDisabled?: boolean
}

function EachStepLayout({
  category,
  title,
  subtitle,
  children,
  onPrev,
  onNext,
  onSkip,
  nextDisabled,
}: StepProps) {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <StyledStepWrapper>
      <StyledIntroduceWrapper>
        <DefaultCategory
          content={category}
          color={theme.color.blue}
          style={{width: 100}}
          size="small"
        />
        <DefaultText type="title" fontWeight={theme.fontWeight.bold} style={{width: 300}}>
          {title}
        </DefaultText>
        {subtitle && (
          <DefaultText fontWeight={theme.fontWeight.bold} color={theme.color.gray300}>
            {subtitle}
          </DefaultText>
        )}
      </StyledIntroduceWrapper>

      {children}

      <StyledButtonWrapper style={{bottom: insets.bottom + 50}}>
        {onPrev && (
          <DefaultButton
            onPress={onPrev}
            color={theme.color.white}
            backgroundColor={theme.color.gray300}
            width={'50%'}
            content="이전"
          />
        )}
        {onNext && (
          <DefaultButton
            onPress={onNext}
            color={theme.color.white}
            width={onPrev ? '50%' : '100%'}
            content="다음"
            disabled={nextDisabled}
          />
        )}
      </StyledButtonWrapper>

      {onSkip && (
        <DefaultButton
          onPress={onSkip}
          color={theme.color.white}
          backgroundColor={theme.color.gray300}
          content="Skip"
        />
      )}
    </StyledStepWrapper>
  )
}

export default EachStepLayout

const StyledStepWrapper = styled(View)`
  position: relative;
  flex: 1;
  gap: 10px;
  margin-top: 30px;
`

const StyledIntroduceWrapper = styled(View)`
  margin: 20px 0 40px;
  gap: 10px;
`

const StyledButtonWrapper = styled(View)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 5px;
`
