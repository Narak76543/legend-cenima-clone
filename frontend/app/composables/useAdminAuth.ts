type AdminLoginPayload = {
  email: string
  password: string
  remember_me?: boolean
}

type AdminRegisterPayload = {
  email        : string
  password     : string
  full_name    : string
  job_title    : string | null
  phone        : string | null
  bio          : string | null
  profile_image: string | null
}

type AuthTokenResponse = {
  access_token: string
}

export const useAdminAuth = () => {
  const { api, authToken } = useApiClient()

  const login = async (payload: AdminLoginPayload) => {
    const response = await api<AuthTokenResponse, AdminLoginPayload>("/api/auth/login", {
      method: "POST",
      body: payload,
    })

    authToken.value = response.access_token
    return response
  }

  const register = (payload: AdminRegisterPayload) =>
    api("/api/auth/register", {
      method: "POST",
      body: payload,
    })

  const logout = () => {
    authToken.value = null
  }

  return {
    authToken,
    login,
    logout,
    register,
  }
}
