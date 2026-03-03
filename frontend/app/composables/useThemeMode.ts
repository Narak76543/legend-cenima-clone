export type ThemeMode = "light" | "dark"

export const useThemeMode = () => {
  const theme = useCookie<ThemeMode>("theme_mode", {
    default: () => "light",
    path: "/",
    sameSite: "lax",
  })

  const setTheme = (mode: ThemeMode) => {
    theme.value = mode
  }

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark"
  }

  const isDark = computed(() => theme.value === "dark")

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
