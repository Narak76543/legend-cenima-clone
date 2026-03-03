export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie("admin_token")
  const { fetchProfile, profile } = useAdminProfile()

  if (!token.value) {
    return navigateTo("/")
  }

  if (profile.value) {
    return
  }

  try {
    await fetchProfile()
  } catch {
    token.value = null
    return navigateTo("/")
  }
})
