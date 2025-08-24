import getFontStyle from '@/utils/getFontStyle'
import styled from '@emotion/native'
import {Theme, useTheme} from '@emotion/react'
import {FC} from 'react'
import {Text, TextProps, TextStyle} from 'react-native'

interface DefaultTextProps extends TextProps {
  fontWeight?: number
  color?: string
  type?: 'title' | 'label' | 'text'
  size?:
    | keyof Theme['fontSize']['title']
    | keyof Theme['fontSize']['label']
    | keyof Theme['fontSize']['text']
  style?: TextStyle | TextStyle[]
}

const DefaultText: FC<DefaultTextProps> = ({
  style,
  fontWeight,
  color,
  type = 'text',
  size = 'medium',
  ...rest
}) => {
  const theme = useTheme()
  const fontStyle: TextStyle = getFontStyle(theme, type, size)

  return <StyledText style={[fontStyle, style]} fontWeight={fontWeight} color={color} {...rest} />
}

export default DefaultText

interface StyledTextProps {
  fontWeight?: number
  color?: string
}

const StyledText = styled(Text)<StyledTextProps>`
  font-family: ${({fontWeight, theme}) => {
    switch (fontWeight) {
      case theme.fontWeight.light:
        return 'Roboto-Light'
      case theme.fontWeight.regular:
        return 'Roboto-Regular'
      case theme.fontWeight.medium:
        return 'Roboto-Medium'
      case theme.fontWeight.bold:
        return 'Roboto-Bold'
      default:
        return 'Roboto-Regular'
    }
  }};
  color: ${({color, theme}) => color || theme.color.black};
`
