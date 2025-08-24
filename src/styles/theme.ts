const defaultTheme = {
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSize: {
    title: {
      small: {fontSize: 18, lineHeight: 24},
      medium: {fontSize: 36, lineHeight: 44},
      large: {fontSize: 57, lineHeight: 64},
    },
    text: {
      small: {fontSize: 14, lineHeight: 20},
      medium: {fontSize: 16, lineHeight: 24},
      large: {fontSize: 22, lineHeight: 28},
    },
    label: {
      small: {fontSize: 11, lineHeight: 16},
      medium: {fontSize: 12, lineHeight: 16},
      large: {fontSize: 14, lineHeight: 20},
    },
  },
}

// 라이트 모드
export const lightTheme = {
  ...defaultTheme,
  color: {
    white: '#ffffff',
    black: '#000000',
    blue: '#0287C0',
    gray100: '#F4F7FA',
    gray300: '#CCCCCC',
    gray500: '#666666',
    gray600: '#777777',
    gray700: '#333333',
    gray900: '#444444',
    errorRed: '#FF5255',
    orange: '#B3E0FF',
  },
}

// 다크 모드
export const darkTheme = {
  ...defaultTheme,
  color: {
    white: '#1E1E1E',
    black: '#FFFFFF',
    blue: '#1CA3EC',
    gray100: '#2A2A2A',
    gray300: '#555555',
    gray500: '#888888',
    gray600: '#AAAAAA',
    gray700: '#CCCCCC',
    gray900: '#FFFFFF',
    errorRed: '#FF6B6B',
    orange: '#FFA500',
  },
}
