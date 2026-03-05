const color = {
  lightThemeColor: "var(--light-theme-color)",
  darkThemeColor: "var(--dark-theme-color)",
  lightTextColor: "var(--light-text-color)",
  darkTextColor: "var(--dark-text-color)",
  lightHintTextColor: "var(--light-hint-text-color)",
  darkHintTextColor: "var(--dark-hint-text-color)",
  darkBorderColor: "var(--dark-border-color)",
  lightBorderColor: "var(--light-border-color)",
} as const

export const useAppColors = () => color
