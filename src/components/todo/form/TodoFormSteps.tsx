import CategorySelect from '@/components/todo/category/CategorySelect'
import VoiceInput from '@/components/todo/input/VoiceInput'
import ScheduleSelector from '@/components/todo/ScheduleSelector'
import { Dispatch } from 'react'

type StepProps = {
  state: any
  dispatch: Dispatch<any>
}

export const Step1 = ({state, dispatch}: StepProps) => (
  <VoiceInput
    value={state.title}
    setValue={value => dispatch({type: 'SET', field: 'title', value})}
    placeholder="제목을 입력하세요"
  />
)

export const Step2 = ({state, dispatch}: StepProps) => (
  <VoiceInput
    value={state.content}
    setValue={value => dispatch({type: 'SET', field: 'content', value})}
    placeholder="내용을 입력하세요"
  />
)

export const Step3 = ({state, dispatch}: StepProps) => (
  <CategorySelect
    selectedCategory={state.category}
    setSelectedCategory={value => dispatch({type: 'SET', field: 'category', value})}
  />
)

export const Step4 = ({state, dispatch}: StepProps) => (
  <ScheduleSelector
    startDate={state.startDate}
    setStartDate={value => dispatch({type: 'SET', field: 'startDate', value})}
    endDate={state.endDate}
    setEndDate={value => dispatch({type: 'SET', field: 'endDate', value})}
    priority={state.priority}
    setPriority={value => dispatch({type: 'SET', field: 'priority', value})}
  />
)
