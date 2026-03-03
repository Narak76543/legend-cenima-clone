export type AdminProfile = {
  id: string
  email: string
  full_name: string
  job_title: string | null
  phone: string | null
  bio: string | null
  profile_image: string | null
  role: string
  is_active: boolean
}

type AdminProfileUpdate = Partial<Pick<AdminProfile, "full_name" | "job_title" | "phone" | "bio" | "profile_image">>

export const useAdminProfile = () => {
  const authToken = useCookie<string | null>("admin_token", {
    default: () => null,
    path: "/",
    sameSite: "lax",
  })

  const profile = useState<AdminProfile | null>("admin_profile", () => null)
  const isLoadingProfile = useState<boolean>("admin_profile_loading", () => false)

  const authHeaders = () =>
    authToken.value
      ? { Authorization: `Bearer ${authToken.value}` }
      : undefined

  const clearProfile = () => {
    profile.value = null
  }

  const fetchProfile = async () => {
    if (!authToken.value) {
      clearProfile()
      return null
    }

    isLoadingProfile.value = true

    try {
      const response = await $fetch<AdminProfile>("/api/auth/me", {
        headers: authHeaders(),
      })

      profile.value = response
      return response
    } catch (error) {
      clearProfile()
      throw error
    } finally {
      isLoadingProfile.value = false
    }
  }

  const updateProfile = async (payload: AdminProfileUpdate) => {
    const response = await $fetch<AdminProfile>("/api/auth/me", {
      method: "PUT",
      headers: authHeaders(),
      body: payload,
    })

    profile.value = response
    return response
  }

  return {
    clearProfile,
    fetchProfile,
    isLoadingProfile,
    profile,
    updateProfile,
  }
}
