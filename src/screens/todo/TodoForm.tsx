import DefaultText from '@/components/common/DefaultText'
import BackNav from '@/components/nav/BackNav'
import { Step1, Step2, Step3, Step4 } from '@/components/todo/form/TodoFormSteps'
import EachStepLayout from '@/components/todo/layout/EachStepLayout'
import { useAuth } from '@/hooks/useAuth'
import { TodoType, useTodoStore } from '@/stores/todo'
import { RootStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { nanoid } from 'nanoid/non-secure'
import { useCallback, useReducer, useState } from 'react'
import { View } from 'react-native'

type TodoFormState = {
  title: string
  content: string
  category: string
  startDate: Date | null
  endDate: Date | null
  priority: string
}

type Action =
  | {type: 'SET'; field: keyof TodoFormState; value: any}
  | {type: 'RESET'; payload?: Partial<TodoFormState>}

const initialState: TodoFormState = {
  title: '',
  content: '',
  category: '',
  startDate: null,
  endDate: null,
  priority: '보통',
}

function reducer(state: TodoFormState, action: Action): TodoFormState {
  switch (action.type) {
    case 'SET':
      return {...state, [action.field]: action.value}
    case 'RESET':
      return {...initialState, ...action.payload}
    default:
      return state
  }
}

type Props = StackScreenProps<RootStackParamList, 'TodoForm'>;

function TodoForm({navigation, route}: Props) {
  const theme = useTheme()
  const {user} = useAuth()

  const todoStore = useTodoStore(user?.email || '')

  const todoId = route?.params?.todoId
  const existingTodo = todoId ? todoStore.getState().getTodoById(todoId) : null

  const [step, setStep] = useState(1)
  const [state, dispatch] = useReducer(reducer, initialState)

  useFocusEffect(
    useCallback(() => {
      setStep(1)
      if (existingTodo) {
        dispatch({type: 'RESET', payload: existingTodo})
      } else {
        dispatch({type: 'RESET'})
      }
    }, [todoId]),
  )

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => s - 1)

  const handleSubmit = () => {
    if (todoId) {
      todoStore.getState().updateTodo(todoId, state)
      navigation.goBack()
    } else {
      const newTodo: TodoType = {...state, id: nanoid(), createdAt: new Date()}
      todoStore.getState().addTodo(newTodo)
      navigation.navigate('TodoSuccess', {todoId: newTodo.id})
    }
  }

  const steps = [
    {
      key: 1,
      component: <Step1 state={state} dispatch={dispatch} />,
      nextDisabled: !state.title,
      title: '오늘의 한 줄 할 일, 적어볼까요?',
      categoryLabel: '내용',
    },
    {
      key: 2,
      component: <Step2 state={state} dispatch={dispatch} />,
      nextDisabled: !state.content,
      title: '자세히 작성해요',
      subtitle: '앞서 작성한 내용을 어떤 방식으로 달성할 계획인가요?',
      categoryLabel: '내용',
    },
    {
      key: 3,
      component: <Step3 state={state} dispatch={dispatch} />,
      nextDisabled: !state.category,
      title: '내 일정을 한눈에 보기 쉽게 분류해보세요',
      categoryLabel: '카테고리',
    },
    {
      key: 4,
      component: <Step4 state={state} dispatch={dispatch} />,
      nextDisabled: !state.startDate || !state.endDate || !state.priority,
      title: '마지막 단계에요!',
      subtitle: '마감일시, 우선순위 등을 설정해요',
      categoryLabel: '기타',
    },
  ]

  const currentStep = steps.find(s => s.key === step)

  return (
    <StyledWrapper>
      <BackNav>
        <StyledStepIndicator>
          <DefaultText
            type="label"
            size="small"
            fontWeight={theme.fontWeight.bold}
            color={theme.color.blue}
          >
            {step}
          </DefaultText>
          <DefaultText type="label" size="small" fontWeight={theme.fontWeight.bold}>
            {' '}
            / 4
          </DefaultText>
        </StyledStepIndicator>
      </BackNav>

      {currentStep && (
        <EachStepLayout
          category={currentStep.categoryLabel}
          title={currentStep.title}
          subtitle={currentStep.subtitle}
          onPrev={step > 1 ? handlePrev : undefined}
          onNext={step === 4 ? handleSubmit : handleNext}
          onSkip={step === 2 ? handleNext : step === 4 ? handleSubmit : undefined}
          nextDisabled={currentStep.nextDisabled}
        >
          {currentStep.component}
        </EachStepLayout>
      )}
    </StyledWrapper>
  )
}

export default TodoForm

const StyledWrapper = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: ${({theme}) => theme.color.white};
`

const StyledStepIndicator = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${({theme}) => theme.color.gray100};
  padding: 5px 10px;
`
