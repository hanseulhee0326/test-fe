import DefaultText from '@/components/common/DefaultText'
import styled from '@emotion/native'
import { Theme, useTheme } from '@emotion/react'
import { ReactNode } from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'

interface DefaultButtonProps {
  content?: string
  children?: ReactNode
  color?: string
  type?: 'title' | 'label' | 'text'
  size?: keyof Theme['fontSize']['title']
  onPress?: (event?: GestureResponderEvent) => void
  disabled?: boolean
  height?: string
  width?: string
  backgroundColor?: string
}

function DefaultButton({
  content,
  children,
  disabled,
  color,
  type,
  size,
  onPress,
  height,
  width,
  backgroundColor,
}: DefaultButtonProps) {
  const theme = useTheme()

  return (
    <ButtonWrapper
      onPress={disabled ? undefined : onPress}
      width={width}
      height={height}
      disabled={disabled}
      backgroundColor={backgroundColor || (disabled ? theme.color.gray300 : '')}
    >
      <ButtonContent>
        <DefaultText color={color} type={type} size={size} fontWeight={theme.fontWeight.medium}>
          {content}
        </DefaultText>
        {children}
      </ButtonContent>
    </ButtonWrapper>
  )
}

export default DefaultButton

interface ButtonWrapperProps {
  width?: string
  borderRadius?: string | number
  height?: string
  disabled?: boolean
  backgroundColor?: string
}

const ButtonWrapper = styled(TouchableOpacity)<ButtonWrapperProps>`
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '56px'};
  border-radius: 6px;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ? backgroundColor : theme.color.blue};
  align-items: center;
  justify-content: center;
`

const ButtonContent = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`
