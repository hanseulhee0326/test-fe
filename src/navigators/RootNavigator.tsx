import Loading from '@/components/loading/Loading'
import Signin from '@/screens/auth/Signin'
import Signup from '@/screens/auth/Signup'
import TodoDetail from '@/screens/todo/TodoDetail'
import TodoForm from '@/screens/todo/TodoForm'
import TodoList from '@/screens/todo/TodoList'
import TodoSuccess from '@/screens/todo/TodoSuccess'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useEffect, useRef} from 'react'
import {useAuth} from '@/hooks/useAuth'
import MainTabNavigator from './MainTabNavigator'

const Stack = createNativeStackNavigator()

function RootNavigator() {
  const {isLoggedIn, isAuthLoaded, initAuth} = useAuth()
  const navigationRef = useRef(null)

  useEffect(() => {
    initAuth()
  }, [])

  if (!isAuthLoaded) {
    return <Loading />
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Signin'}
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen name="TodoForm" component={TodoForm} />
        <Stack.Screen name="TodoSuccess" component={TodoSuccess} />
        <Stack.Screen name="TodoDetail" component={TodoDetail} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
