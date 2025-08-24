import DefaultButton from '@/components/common/DefaultButton'
import DefaultInputField from '@/components/common/DefaultInputField'
import DefaultText from '@/components/common/DefaultText'
import { useTheme } from '@emotion/react'
import Voice from '@react-native-voice/voice'
import { useEffect, useState } from 'react'

interface VoiceInputProps {
  value: string
  setValue: (text: string) => void
  placeholder?: string
}

function VoiceInput({value, setValue, placeholder}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const handler = (e: any) => {
      if (e.value?.length) setValue(e.value[0])
    }
    Voice.onSpeechResults = handler

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners())
    }
  }, [])

  const startRecording = async () => {
    if (isRecording) return
    setIsRecording(true)
    try {
      await Voice.start('ko-KR')
    } catch (e) {
      console.log(e)
      setIsRecording(false)
    }
  }

  const stopRecording = async () => {
    if (!isRecording) return
    setIsRecording(false)
    try {
      await Voice.stop()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <DefaultInputField
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        autoFocus={isRecording}
      />

      <DefaultButton
        color={theme.color.white}
        content={isRecording ? '녹음 중...' : '음성 입력 시작하기'}
        onPress={isRecording ? stopRecording : startRecording}
      />

      <DefaultText size="small" color={theme.color.gray300}>
        *녹음이 완료되었다면, 위의 버튼을 눌러 멈출 수 있어요
      </DefaultText>
    </>
  )
}

export default VoiceInput
