import DefaultButton from '@/components/common/DefaultButton'
import DefaultCategory from '@/components/common/DefaultCategory'
import DefaultText from '@/components/common/DefaultText'
import { priorityOptions } from '@/constants/category'
import formatDate from '@/utils/formatDate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface ScheduleSelectorProps {
  startDate: Date | null
  setStartDate: (date: Date) => void
  endDate: Date | null
  setEndDate: (date: Date) => void
  priority: string
  setPriority: (priority: string) => void
}

function ScheduleSelector({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  priority,
  setPriority,
}: ScheduleSelectorProps) {
  const theme = useTheme()
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const handleConfirmStart = (date: Date) => {
    if (endDate && date > endDate) {
      setStartDate(endDate)
    } else {
      setStartDate(date)
    }
    setShowStartPicker(false)
  }

  const handleConfirmEnd = (date: Date) => {
    if (startDate && date < startDate) {
      setEndDate(startDate)
    } else {
      setEndDate(date)
    }
    setShowEndPicker(false)
  }

  return (
    <StyledWrapper>
      <StyledDateWrapper>
        <StyledDateInWrapper>
          <DefaultText fontWeight={theme.fontWeight.bold}>시작일</DefaultText>
          <DefaultButton
            content={startDate ? formatDate(startDate) : '선택'}
            onPress={() => setShowStartPicker(true)}
            color={startDate ? theme.color.white : theme.color.black}
            backgroundColor={startDate ? theme.color.gray300 : theme.color.gray100}
            type="label"
            width="100%"
          />
        </StyledDateInWrapper>

 
        <StyledDateInWrapper>
          <DefaultText fontWeight={theme.fontWeight.bold}>마감일</DefaultText>
          <DefaultButton
            content={endDate ? formatDate(endDate) : '선택'}
            onPress={() => setShowEndPicker(true)}
            color={endDate ? theme.color.white : theme.color.black}
            backgroundColor={endDate ? theme.color.gray300 : theme.color.gray100}
            type="label"
            width="100%"
          />
        </StyledDateInWrapper>
      </StyledDateWrapper>
      
      <DefaultText fontWeight={theme.fontWeight.bold}>우선순위</DefaultText>
      <StyledCategoryWrapper>
        {priorityOptions.map(p => (
          <TouchableOpacity key={p.name} onPress={() => setPriority(p.name)} style={{flex: 1}}>
            <DefaultCategory
              content={`${p.icon} ${p.name}`}
              backgroundColor={priority === p.name ? p.color : theme.color.gray100}
              color={priority === p.name ? theme.color.white : theme.color.gray300}
              style={{
                opacity: priority === p.name ? 1 : 0.6,
                width: '100%',
                height: 50,
              }}
            />
          </TouchableOpacity>
        ))}
      </StyledCategoryWrapper>

      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="date"
        onConfirm={handleConfirmStart}
        onCancel={() => setShowStartPicker(false)}
      />
      <DateTimePickerModal
        isVisible={showEndPicker}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={() => setShowEndPicker(false)}
      />
    </StyledWrapper>
  )
}

export default ScheduleSelector

const StyledWrapper = styled(View)`
  width: 100%;
  padding: 16px 0;
  gap: 16px;
`

const StyledDateWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
  margin-bottom: 30px;
`

const StyledDateInWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  gap: 10px;
`

const StyledCategoryWrapper = styled(View)`
  flex-direction: row;
  width: 100%;
  gap: 10px;
`
