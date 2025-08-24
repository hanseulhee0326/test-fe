import DefaultText from '@/components/common/DefaultText'
import styled from '@emotion/native'
import {Theme} from '@emotion/react'
import {FC} from 'react'
import {TextProps, TextStyle, View} from 'react-native'

interface DefaultCategoryProps extends TextProps {
  fontWeight?: number
  color?: string
  backgroundColor?: string
  style?: TextStyle | TextStyle[]
  content: string
  type?: 'title' | 'label' | 'text'
  size?: keyof Theme['fontSize']['title']
}

const DefaultCategory: FC<DefaultCategoryProps> = ({
  style,
  fontWeight,
  color,
  backgroundColor,
  content,
  type,
  size,
}) => {
  return (
    <StyledWrapper backgroundColor={backgroundColor} style={style}>
      <DefaultText color={color} type={type} size={size} fontWeight={fontWeight}>
        {content}
      </DefaultText>
    </StyledWrapper>
  )
}

export default DefaultCategory

const StyledWrapper = styled(View)<{backgroundColor?: string}>`
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  border-radius: 20px;
  background-color: ${({backgroundColor, theme}) => backgroundColor || theme.color.orange};
  padding: 0px 15px;
  min-height: 28px;
`
