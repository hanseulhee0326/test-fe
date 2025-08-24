import AddSvg from '@/assets/icons/todo/add.svg'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
 
 type TodoWriteButtonNavigationProp = StackNavigationProp<RootStackParamList, 'TodoForm'>;
 
 function TodoFormButton() {
   const theme = useTheme();
   const navigation = useNavigation<TodoWriteButtonNavigationProp>();

   return (
    <StyledWrapper onPress={() => navigation.navigate('TodoForm')}>
       <AddSvg width={20} height={20} fill={theme.color.white} />
     </StyledWrapper>
   )
 }
 

export default TodoFormButton

const StyledWrapper = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  shadow-color: ${({theme}) => theme.color.gray100};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  background-color: ${({theme}) => theme.color.blue};
`
