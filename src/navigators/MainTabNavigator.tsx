import TodoFormSvg from '@/assets/icons/bottomTab/todoForm.svg'
import TodoGraphSvg from '@/assets/icons/bottomTab/todoGraph.svg'
import TodoListSvg from '@/assets/icons/bottomTab/todoList.svg'
import TodoGraph from '@/screens/graph/TodoGraph'
import TodoForm from '@/screens/todo/TodoForm'
import TodoList from '@/screens/todo/TodoList'
import {heightPercentage} from '@/styles/mediaQuery'
import {useTheme} from '@emotion/react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

function MainTabNavigator() {
  const insets = useSafeAreaInsets()
  const theme = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: heightPercentage(56) + insets.bottom / 2,
          borderTopWidth: 0,
          backgroundColor: theme.color.white,
        },
      }}
    >
      <Tab.Screen
        name="TodoList"
        component={TodoList}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TodoFormSvg fill={focused ? theme.color.gray500 : theme.color.gray300} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="TodoGraph"
        component={TodoGraph}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TodoGraphSvg fill={focused ? theme.color.gray500 : theme.color.gray300} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="TodoForm"
        component={TodoForm}
        options={{
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <TodoListSvg fill={focused ? theme.color.gray500 : theme.color.gray300} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
