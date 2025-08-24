import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {StackNavigationProp} from '@react-navigation/stack'

export type AuthStackParamList = {
  Signin: undefined
  SignUp: undefined
}

export type BottomTabParamList = {
  TodoList: undefined
  TodoWrite: undefined
  TodoGraph: undefined
}

export type RootStackParamList = {
  Home?: {screen: keyof BottomTabParamList}
  TodoList: undefined
  TodoForm: undefined
  TodoDetail: {todoId: string}
  TodoSuccess: undefined
  TodoGraph: undefined
  Signin: undefined
  SignUp: undefined
}

export type StackNavProp<
  T extends keyof RootStackParamList = keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>

export type BottomTabNavProp<
  T extends keyof BottomTabParamList = keyof BottomTabParamList
> = BottomTabNavigationProp<BottomTabParamList, T>
