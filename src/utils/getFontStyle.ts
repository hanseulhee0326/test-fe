import { Theme } from '@emotion/react'
import { TextStyle } from 'react-native'

type FontStyleType = 'title' | 'label' | 'text'

type FontStyleSize = {
  title: keyof Theme['fontSize']['title']
  label: keyof Theme['fontSize']['label']
  text: keyof Theme['fontSize']['text']
}

const getFontStyle = <T extends FontStyleType>(
  theme: Theme,
  type: T,
  size: FontStyleSize[T]
): TextStyle => {
  const fontStyle = theme.fontSize[type][size]

  return {
    fontSize: fontStyle.fontSize,
    lineHeight: fontStyle.lineHeight,
  }
}

export default getFontStyle
