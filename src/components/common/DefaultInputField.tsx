import DefaultText from '@/components/common/DefaultText'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { forwardRef, useState } from 'react'
import { Keyboard, TextInput, TextInputProps, View } from 'react-native'

interface DefaultInputFieldProps {
  placeholder?: string
  keyboardType?: TextInputProps['keyboardType']
  value: string
  setValue: (value: string) => void
  passwordInput?: boolean
  autoFocus?: boolean
  label?: string
  errorMessage?: string
  onSubmitEditing?: () => void
  returnKeyType?: 'done' | 'next'
}

const DefaultInputField = forwardRef<TextInput, DefaultInputFieldProps>((props, ref) => {
  const {
    placeholder,
    value,
    setValue,
    keyboardType = 'default',
    passwordInput = false,
    autoFocus = false,
    label,
    errorMessage,
    onSubmitEditing,
    returnKeyType = 'next',
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const theme = useTheme()

  return (
    <StyledWrapper>
      <StyledInputWrapper>
        {label && (
          <DefaultText
            color={isFocused ? theme.color.blue : theme.color.gray300}
            type="label"
            size="small"
          >
            {label}
          </DefaultText>
        )}

        <StyledTextInput
          placeholder={placeholder || 'Enter Value'}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          secureTextEntry={passwordInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          placeholderTextColor={theme.color.gray100}
          isFocused={isFocused}
          returnKeyType={returnKeyType}
          blurOnSubmit={false}
          onSubmitEditing={() => onSubmitEditing || Keyboard.dismiss()}
          ref={ref}
          {...rest}
        />

        {errorMessage && (
          <DefaultText
            color={theme.color.errorRed}
            type="label"
            size="medium"
            fontWeight={theme.fontWeight.light}
          >
            {errorMessage}
          </DefaultText>
        )}
      </StyledInputWrapper>
    </StyledWrapper>
  )
})

export default DefaultInputField

const StyledWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const StyledInputWrapper = styled(View)`
  flex: 1;
  position: relative;
  justify-content: center;
  gap: 5px;
`

const StyledTextInput = styled(TextInput)<{isFocused: boolean}>`
  font-size: ${({theme}) => theme.fontSize.title.large.fontSize}px;
  font-weight: ${({theme}) => theme.fontWeight.regular};
  font-family: 'Roboto-Regular';
  color: ${({theme}) => theme.color.gray600};
  padding: 10px 12px;
  border-width: 1px;
  border-color: ${({theme, isFocused}) => (isFocused ? theme.color.blue : theme.color.gray300)};
  border-radius: 6px;
  height: 60px;
`
