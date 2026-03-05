<script setup lang="ts">
import type { AppNotification } from "~/composables/useNotifications"

const { isDark, setTheme } = useThemeMode()
const { t } = useAppLanguage()
const { fetchProfile, profile } = useAdminProfile()
const {
  fetchNotifications,
  isLoadingNotifications,
  isUpdatingNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  notifications,
  unreadCount,
} = useNotifications()

const displayName = computed(() => profile.value?.full_name || "Admin User")
const profileImage = computed(() => profile.value?.profile_image || "")
const activeNotificationAlert = ref<AppNotification | null>(null)
const showNotifications = ref(false)
const hasHydratedNotifications = ref(false)
const notificationsPanel = ref<HTMLElement | null>(null)
let notificationPollTimer: ReturnType<typeof setInterval> | null = null
let notificationAlertTimer: ReturnType<typeof setTimeout> | null = null
const initials = computed(() =>
  displayName.value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string[]) => part[0]?.toUpperCase() || "")
    .join("") || "AU"
)

const notificationMeta = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return "Now"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

const notificationTone = (type: string) => {
  if (type === "out_of_stock" || type === "product_deleted" || type === "category_deleted") {
    return {
      icon: "i-lucide-triangle-alert",
      iconStyle: { backgroundColor: "rgba(244,63,94,0.14)", color: "#f43f5e" },
    }
  }

  if (type === "low_stock" || type === "stock_adjustment") {
    return {
      icon: "i-lucide-box",
      iconStyle: { backgroundColor: "rgba(245,158,11,0.14)", color: "#f59e0b" },
    }
  }

  return {
    icon: "i-lucide-bell-ring",
    iconStyle: { backgroundColor: "rgba(59,130,246,0.14)", color: "#3b82f6" },
  }
}

const closeNotifications = () => {
  showNotifications.value = false
}

const dismissNotificationAlert = () => {
  activeNotificationAlert.value = null

  if (notificationAlertTimer) {
    clearTimeout(notificationAlertTimer)
    notificationAlertTimer = null
  }
}

const showIncomingNotificationAlert = (notification: AppNotification) => {
  activeNotificationAlert.value = notification

  if (notificationAlertTimer) {
    clearTimeout(notificationAlertTimer)
  }

  notificationAlertTimer = setTimeout(() => {
    activeNotificationAlert.value = null
    notificationAlertTimer = null
  }, 5000)
}

const syncNotifications = async (allowAlert = false) => {
  const previousTopId = notifications.value[0]?.id || ""
  const response = await fetchNotifications()

  if (allowAlert && hasHydratedNotifications.value && response.length) {
    const latestNotification = response[0]
    if (latestNotification.id !== previousTopId && !latestNotification.is_read) {
      showIncomingNotificationAlert(latestNotification)
    }
  }

  hasHydratedNotifications.value = true
  return response
}

const toggleNotifications = async () => {
  showNotifications.value = !showNotifications.value

  if (showNotifications.value && !notifications.value.length) {
    await syncNotifications()
  }
}

const handleNotificationClick = async (id: string, isRead: boolean) => {
  if (!isRead) {
    await markNotificationRead(id)
  }
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!showNotifications.value) return

  const target = event.target as Node | null
  if (target && notificationsPanel.value?.contains(target)) return

  closeNotifications()
}

onMounted(async () => {
  if (import.meta.client) {
    document.addEventListener("click", handleDocumentClick)
  }

  if (!profile.value) {
    try {
      await fetchProfile()
    } catch {
      // The route middleware handles invalid sessions.
    }
  }

  try {
    await syncNotifications()
  } catch {
    // Silent in header; data can be refreshed later.
  }

  if (import.meta.client) {
    notificationPollTimer = window.setInterval(async () => {
      try {
        await syncNotifications(true)
      } catch {
        // Silent background polling.
      }
    }, 15000)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener("click", handleDocumentClick)
  }

  if (notificationPollTimer) {
    clearInterval(notificationPollTimer)
    notificationPollTimer = null
  }

  if (notificationAlertTimer) {
    clearTimeout(notificationAlertTimer)
    notificationAlertTimer = null
  }
})
</script>

<template>
  <header class="flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 xl:flex-row xl:items-center xl:justify-between xl:py-8">
    <div
      v-if="activeNotificationAlert"
      class="fixed right-4 top-4 z-50 w-[22rem] rounded-[10px] border shadow-2xl sm:right-6 lg:right-8"
      :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }"
    >
      <div class="flex items-start gap-3 px-4 py-4">
        <span class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full" :style="notificationTone(activeNotificationAlert.type).iconStyle">
          <UIcon :name="notificationTone(activeNotificationAlert.type).icon" class="h-5 w-5" />
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-semibold" :style="{ color: 'var(--app-fg)' }">{{ activeNotificationAlert.title }}</p>
              <p class="mt-1 text-xs" :style="{ color: 'var(--app-fg-muted)' }">{{ notificationMeta(activeNotificationAlert.created_at) }}</p>
            </div>
            <button
              type="button"
              class="inline-flex h-7 w-7 items-center justify-center rounded-full transition hover:opacity-80"
              :style="{ color: 'var(--app-fg-muted)' }"
              @click="dismissNotificationAlert"
            >
              <UIcon name="i-lucide-x" class="h-4 w-4" />
            </button>
          </div>
          <p class="mt-3 text-sm leading-6" :style="{ color: 'var(--app-fg-muted)' }">
            {{ activeNotificationAlert.message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="relative w-full xl:max-w-2xl">
      <div class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 sm:left-5 lg:left-6" :style="{ color: 'var(--app-fg-muted)' }">
        <UIcon name="i-lucide-search" class="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <input
        type="text"
        :placeholder="t('header.searchPlaceholder')"
        class="h-12 w-full rounded-[10px] border border-slate-100 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition
               placeholder:text-slate-400 focus:border-slate-200 focus:ring-4 focus:ring-slate-100 sm:h-14 sm:pl-14 sm:pr-6 sm:text-base lg:h-17 lg:pl-16 lg:pr-8 lg:text-[1.1rem]"
        :style="{
          backgroundColor: 'var(--app-surface)',
          borderColor: 'var(--app-border)',
          color: 'var(--app-fg)',
        }"
      />
    </div>

    <!-- Right -->
    <div class="grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 xl:w-auto xl:flex-nowrap xl:justify-end">
      <div
        class="col-span-2 flex w-full items-center gap-1 rounded-2xl border p-1 shadow-sm sm:col-span-1 sm:w-auto sm:rounded-full"
        :style="{ backgroundColor: 'var(--app-surface-muted)', borderColor: 'var(--app-border)' }"
      >
        <button
          type="button"
          :aria-label="t('settings.lightMode')"
          :title="t('settings.lightMode')"
          class="flex h-10 flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition sm:h-10 sm:min-w-10 sm:flex-none sm:rounded-full sm:px-4"
          :class="!isDark ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'"
          @click="setTheme('light')"
        >
          <UIcon name="i-lucide-sun" class="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </button>
        <button
          type="button"
          :aria-label="t('settings.darkMode')"
          :title="t('settings.darkMode')"
          class="flex h-10 flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition sm:h-10 sm:min-w-10 sm:flex-none sm:rounded-full sm:px-4"
          :class="isDark ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'"
          @click="setTheme('dark')"
        >
          <UIcon name="i-lucide-moon" class="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        </button>
      </div>

      <div
        class="col-span-2 flex w-full items-center justify-between gap-1 rounded-full border p-1.5 shadow-sm md:w-auto md:min-w-[18rem] md:justify-start"
        :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }"
      >
        <button class="flex-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-transform active:scale-95 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm lg:px-7 lg:py-3 lg:text-[0.95rem]">
          {{ t("header.thisWeek") }}
        </button>
        <button
          class="flex-1 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm lg:px-7 lg:py-3 lg:text-[0.95rem]"
          :class="isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-400 hover:text-slate-600'"
        >
          {{ t("header.thisMonth") }}
        </button>
      </div>

      <div ref="notificationsPanel" class="relative w-full sm:w-12 lg:w-15">
        <button
          type="button"
          class="group relative flex h-11 w-full items-center justify-center rounded-2xl border text-slate-500 shadow-sm transition sm:h-12 sm:w-12 sm:rounded-full lg:h-15 lg:w-15"
          :class="isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'"
          :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }"
          @click.stop="toggleNotifications"
        >
          <span
            v-if="unreadCount"
            class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 px-1 text-[10px] font-bold leading-none text-white shadow-sm sm:-right-1 sm:-top-1"
            :style="{
              backgroundColor: '#ef4444',
              borderColor: 'var(--app-surface)',
            }"
          >
            {{ unreadCount > 9 ? "9+" : unreadCount }}
          </span>
          <UIcon name="i-lucide-bell" class="h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
        </button>

        <div
          v-if="showNotifications"
          class="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-[22rem] rounded-[10px] border shadow-2xl"
          :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }"
          @click.stop
        >
          <div class="flex items-center justify-between gap-3 border-b px-4 py-4" :style="{ borderColor: 'var(--app-border)' }">
            <div>
              <p class="text-sm font-semibold" :style="{ color: 'var(--app-fg)' }">Notifications</p>
              <p class="mt-1 text-xs" :style="{ color: 'var(--app-fg-muted)' }">{{ unreadCount }} unread</p>
            </div>
            <button
              type="button"
              class="text-xs font-semibold transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
              :style="{ color: '#3b82f6' }"
              :disabled="!unreadCount || isUpdatingNotifications"
              @click="markAllNotificationsRead"
            >
              Mark all read
            </button>
          </div>

          <div v-if="isLoadingNotifications" class="px-4 py-8 text-center text-sm" :style="{ color: 'var(--app-fg-muted)' }">
            Loading notifications...
          </div>
          <div v-else-if="!notifications.length" class="px-4 py-8 text-center text-sm" :style="{ color: 'var(--app-fg-muted)' }">
            No notifications yet.
          </div>
          <div v-else class="max-h-96 overflow-y-auto">
            <button
              v-for="notification in notifications"
              :key="notification.id"
              type="button"
              class="flex w-full items-start gap-3 border-b px-4 py-4 text-left transition hover:opacity-90"
              :style="{
                borderColor: 'var(--app-border)',
                backgroundColor: notification.is_read ? 'transparent' : (isDark ? 'rgba(30,41,59,0.35)' : 'rgba(59,130,246,0.05)'),
              }"
              @click="handleNotificationClick(notification.id, notification.is_read)"
            >
              <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full" :style="notificationTone(notification.type).iconStyle">
                <UIcon :name="notificationTone(notification.type).icon" class="h-4 w-4" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-center justify-between gap-3">
                  <span class="truncate text-sm font-semibold" :style="{ color: 'var(--app-fg)' }">{{ notification.title }}</span>
                  <span v-if="!notification.is_read" class="h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span class="mt-1 block text-sm leading-6" :style="{ color: 'var(--app-fg-muted)' }">{{ notification.message }}</span>
                <span class="mt-2 block text-xs" :style="{ color: 'var(--app-fg-muted)' }">{{ notificationMeta(notification.created_at) }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <NuxtLink
        to="/dashboard/settings"
        class="flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl border text-base font-bold shadow-sm transition sm:h-12 sm:w-12 sm:rounded-full lg:h-15 lg:w-15 lg:text-lg"
        :class="isDark ? 'hover:bg-slate-800/70' : 'hover:bg-slate-50'"
        :style="{ backgroundColor: 'var(--app-surface-muted)', borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }"
        :aria-label="t('settings.profileTitle')"
        :title="t('settings.profileTitle')"
      >
        <img
          v-if="profileImage"
          :src="profileImage"
          :alt="displayName"
          class="h-full w-full object-cover object-center"
        />
        <span v-else>{{ initials }}</span>
      </NuxtLink>
    </div>
  </header>
</template>
