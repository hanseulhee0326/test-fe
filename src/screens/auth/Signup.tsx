import DefaultButton from '@/components/common/DefaultButton'
import DefaultInputField from '@/components/common/DefaultInputField'
import AuthLayout from '@/components/layout/AuthLayout'
import { ERROR_SIGNUP } from '@/constants/validationMessages'
import { useValidation } from '@/hooks/useValidation'
import { AuthStackParamList } from '@/types/navigate'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, Platform, TextInput, View } from 'react-native'

type SignupNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>

function Signup({navigation}: {navigation: SignupNavigationProp}) {
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    passwordCheck,
    setPasswordCheck,
    passwordCheckError,
    isFormValid,
  } = useValidation(true)

  const theme = useTheme()
  const [signupError, setSignupError] = useState('')
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false)

  const passwordRef = useRef<TextInput>(null)
  const passwordCheckRef = useRef<TextInput>(null)

  const handleSignup = async () => {
    if (!isFormValid()) return

    try {
      const user = {
        id: Date.now().toString(),
        email,
        password,
      }

      await AsyncStorage.setItem(`user:${email}`, JSON.stringify(user))

      navigation.navigate('Signin')
    } catch (err) {
      setSignupError(ERROR_SIGNUP)
    }
  }

  useEffect(() => {
    setSignupError('')
  }, [email, password, passwordCheck])

  useLayoutEffect(() => {
    let didShow: any, didHide: any

    if (Platform.OS === 'ios') {
      didShow = Keyboard.addListener('keyboardWillShow', () => setIsKeyboard(true))
      didHide = Keyboard.addListener('keyboardWillHide', () => setIsKeyboard(false))
    } else {
      didShow = Keyboard.addListener('keyboardDidShow', () => setIsKeyboard(true))
      didHide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboard(false))
    }

    return () => {
      didShow.remove()
      didHide.remove()
    }
  }, [])

  return (
    <AuthLayout>
      <StyledInputWrapper>
        <DefaultInputField
          value={email}
          setValue={setEmail}
          placeholder="이메일을 입력하세요"
          label="Email"
          errorMessage={emailError}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <DefaultInputField
          value={password}
          setValue={setPassword}
          placeholder="비밀번호를 입력하세요"
          label="Password"
          passwordInput
          errorMessage={passwordError}
          autoFocus={false}
          ref={passwordRef}
          onSubmitEditing={() => passwordCheckRef.current?.focus()}
        />
        <DefaultInputField
          value={passwordCheck}
          setValue={setPasswordCheck}
          placeholder="비밀번호를 다시 입력하세요"
          label="Password Check"
          passwordInput
          errorMessage={passwordCheckError}
          autoFocus={false}
          ref={passwordCheckRef}
          returnKeyType="done"
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
        />
      </StyledInputWrapper>

      {!isKeyboard && (
        <StyledButtonWrapper>
          <DefaultButton
            content="Sign Up"
            onPress={handleSignup}
            disabled={!isFormValid() || !!signupError}
            color={theme.color.white}
          />
          <StyledHr theme={theme} />
          <DefaultButton
            content="Sign In"
            onPress={() => navigation.navigate('Signin')}
            backgroundColor={theme.color.gray500}
            color={theme.color.white}
          />
        </StyledButtonWrapper>
      )}
    </AuthLayout>
  )
}

export default Signup

const StyledInputWrapper = styled(View)`
  gap: 10px;
  width: 100%;
`

const StyledButtonWrapper = styled(View)`
  width: 100%;
  margin-top: 50px;
`

const StyledHr = styled(View)`
  width: 100%;
  border-color: ${({theme}) => theme.color.gray300};
  border-width: 0.6px;
  margin: 20px 0;
  opacity: 0.5;
`
