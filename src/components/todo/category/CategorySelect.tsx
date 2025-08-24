import DefaultCategory from '@/components/common/DefaultCategory'
import { categoryOptions } from '@/constants/category'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { TouchableOpacity, View } from 'react-native'

interface CategorySelectProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string) => void
}

function CategorySelect({ selectedCategory, setSelectedCategory }: CategorySelectProps) {
  const theme = useTheme()

  const handleCategorySelect = (name: string) => {
    setSelectedCategory(selectedCategory === name ? '' : name)
  }

  return (
    <StyledWrapper>
      {categoryOptions.map((item) => (
        <StyledItemWrapper
          key={item.name}
          onPress={() => handleCategorySelect(item.name)}
          selected={selectedCategory === item.name}
        >
          <StyledCategory
            content={`${item.icon} ${item.name}`}
            backgroundColor={selectedCategory === item.name ? item.color : '#ccc'}
            type="title"
            size="small"
            color={selectedCategory === item.name ? theme.color.black : theme.color.gray900}
          />
        </StyledItemWrapper>
      ))}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`

const StyledItemWrapper = styled(TouchableOpacity)<{ selected: boolean }>`
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  width: 49%;
  margin-bottom: 10px;
`

const StyledCategory = styled(DefaultCategory)`
  width: 100%;
  min-height: 150px;
`
