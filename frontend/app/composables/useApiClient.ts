type ApiRequestOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: TBody
  headers?: Record<string, string>
  requireAuth?: boolean
}

export const useApiClient = () => {
  const authToken = useCookie<string | null>("admin_token", {
    default: () => null,
    path: "/",
    sameSite: "lax",
  })

  const getAuthHeaders = () =>
    authToken.value
      ? { Authorization: `Bearer ${authToken.value}` }
      : {}

  const api = <TResponse, TBody = unknown>(
    path: string,
    options: ApiRequestOptions<TBody> = {},
  ) => {
    const headers = {
      ...(options.requireAuth ? getAuthHeaders() : {}),
      ...(options.headers ?? {}),
    }

    return $fetch<TResponse>(path, {
      method: options.method,
      body: options.body,
      headers: Object.keys(headers).length ? headers : undefined,
    })
  }

  return {
    api,
    authToken,
    getAuthHeaders,
  }
}
