import {
  EMAIL_REGEX,
  ERROR_EMAIL_CHECK,
  ERROR_PASSWORD_CHECK,
  ERROR_PASSWORD_DIFFERENT,
  ERROR_PASSWORD_MAX,
  ERROR_PASSWORD_MIN,
  PASSWORD_REGEX,
} from '@/constants/validationMessages'
import {useState} from 'react'

export function useValidation(existPasswordCheck?: boolean) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const emailError = email ? (!EMAIL_REGEX.test(email) ? ERROR_EMAIL_CHECK : '') : ''
  const passwordError = password
    ? !PASSWORD_REGEX.test(password)
      ? ERROR_PASSWORD_CHECK
      : password.length < 8
      ? ERROR_PASSWORD_MIN
      : password.length > 20
      ? ERROR_PASSWORD_MAX
      : ''
    : ''

  const passwordCheckError =
    passwordCheck && passwordCheck !== password ? ERROR_PASSWORD_DIFFERENT : ''

  const isFormValid = () => {
    if (!email || !password || emailError || passwordError) return false
    if (existPasswordCheck && (!passwordCheck || passwordCheckError)) return false
    return true
  }

  return {
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
  }
}
