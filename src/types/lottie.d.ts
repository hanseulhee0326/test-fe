declare module 'lottie-react-native' {
  import {Component} from 'react'
  import {ViewProps, StyleProp, ViewStyle} from 'react-native'

  interface LottieViewProps extends ViewProps {
    source: any
    autoPlay?: boolean
    loop?: boolean
    style?: StyleProp<ViewStyle>
  }

  export default class LottieView extends Component<LottieViewProps> {}
}
