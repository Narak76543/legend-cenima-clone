export type AppNotification = {
  id: string
  type: string
  title: string
  message: string
  entity_type: string | null
  entity_id: string | null
  is_read: boolean
  created_at: string
}

export const useNotifications = () => {
  const { api } = useApiClient()

  const notifications = useState<AppNotification[]>("app_notifications", () => [])
  const isLoadingNotifications = useState<boolean>("app_notifications_loading", () => false)
  const isUpdatingNotifications = useState<boolean>("app_notifications_updating", () => false)

  const unreadCount = computed(() =>
    notifications.value.filter((notification) => !notification.is_read).length,
  )

  const fetchNotifications = async () => {
    isLoadingNotifications.value = true

    try {
      const response = await api<AppNotification[]>("/api/notifications", {
        requireAuth: true,
      })

      notifications.value = response
      return response
    } finally {
      isLoadingNotifications.value = false
    }
  }

  const markNotificationRead = async (id: string, isRead = true) => {
    isUpdatingNotifications.value = true

    try {
      const response = await api<AppNotification, { is_read: boolean }>(`/api/notifications/${id}/read`, {
        method: "PUT",
        requireAuth: true,
        body: { is_read: isRead },
      })

      notifications.value = notifications.value.map((notification) =>
        notification.id === id ? response : notification,
      )

      return response
    } finally {
      isUpdatingNotifications.value = false
    }
  }

  const markAllNotificationsRead = async () => {
    isUpdatingNotifications.value = true

    try {
      await api("/api/notifications/read-all", {
        method: "PUT",
        requireAuth: true,
      })

      notifications.value = notifications.value.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    } finally {
      isUpdatingNotifications.value = false
    }
  }

  return {
    fetchNotifications,
    isLoadingNotifications,
    isUpdatingNotifications,
    markAllNotificationsRead,
    markNotificationRead,
    notifications,
    unreadCount,
  }
}
