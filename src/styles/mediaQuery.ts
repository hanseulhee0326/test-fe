import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const FIGMA_DEVICE_WIDTH = 360
const FIGMA_DEVICE_HEIGHT = 798

export function widthPercentage(width: number) {
  const percentage = (width / FIGMA_DEVICE_WIDTH) * 100
  return responsiveScreenWidth(percentage)
}

export function heightPercentage(height: number) {
  const percentage = (height / FIGMA_DEVICE_HEIGHT) * 100
  return responsiveScreenHeight(percentage)
}
