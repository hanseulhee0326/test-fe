import DefaultText from "@/components/common/DefaultText";
import styled from "@emotion/native";
import { TouchableOpacity, View } from "react-native";

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: () => void;
}

function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
  return (
    <StyledSwitchWrapper activeOpacity={0.8} onPress={onValueChange} isOn={value}>
      <StyledSwitchThumb isOn={value}>
        <DefaultText>{value ? "🌙": "☀️"}</DefaultText>
      </StyledSwitchThumb>
    </StyledSwitchWrapper>
  );
}

export default ToggleSwitch;

const StyledSwitchWrapper = styled(TouchableOpacity)<{ isOn: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  padding: 2px;
  background-color: ${({ isOn, theme }) =>
    isOn ? theme.color.orange : theme.color.gray300};
  justify-content: center;
`;

const StyledSwitchThumb = styled(View)<{ isOn: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.color.white};
  justify-content: center;
  align-items: center;
  transform: ${({ isOn }) => (isOn ? "translateX(30px)" : "translateX(0px)")};
`;