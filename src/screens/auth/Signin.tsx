import DefaultButton from '@/components/common/DefaultButton'
import DefaultInputField from '@/components/common/DefaultInputField'
import DefaultText from '@/components/common/DefaultText'
import AuthLayout from '@/components/layout/AuthLayout'
import {ERROR_LOGIN} from '@/constants/validationMessages'
import {useAuth} from '@/hooks/useAuth'
import {useValidation} from '@/hooks/useValidation'
import {RootStackParamList} from '@/types/navigate'
import styled from '@emotion/native'
import {useTheme} from '@emotion/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Keyboard, Platform, TextInput, View} from 'react-native'

interface StoredUser {
  email: string
  password: string
}

type SigninNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>

function Signin({navigation}: {navigation: SigninNavigationProp}) {
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    isFormValid,
  } = useValidation()

  const [loginError, setLoginError] = useState('')

  const {login} = useAuth()
  const theme = useTheme()

  const passwordRef = useRef<TextInput>(null)
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false)

  const handleSignin = async () => {
    if (!isFormValid()) return

    try {
      const storedUserStr = await AsyncStorage.getItem(`user:${email}`)
      const storedUser: StoredUser | null = storedUserStr ? JSON.parse(storedUserStr) : null

      if (storedUser && storedUser.password === password) {
        await login({email: storedUser.email})

        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        })
      } else {
        setLoginError(ERROR_LOGIN)
      }
    } catch (err) {
      setLoginError(ERROR_LOGIN)
    }
  }

  useEffect(() => {
    setLoginError('')
  }, [email, password])

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
          ref={passwordRef}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <DefaultText
          color={theme.color.errorRed}
          type="label"
          size="medium"
          fontWeight={theme.fontWeight.light}
        >
          {loginError}
        </DefaultText>
      </StyledInputWrapper>

      {!isKeyboard && (
        <StyledButtonWrapper>
          <DefaultButton
            content="Sign In"
            onPress={handleSignin}
            color={theme.color.white}
            disabled={!isFormValid() || !!loginError}
          />
          <StyledHr theme={theme} />
          <DefaultButton
            content="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
            backgroundColor={theme.color.gray500}
            color={theme.color.white}
          />
        </StyledButtonWrapper>
      )}
    </AuthLayout>
  )
}

export default Signin

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
