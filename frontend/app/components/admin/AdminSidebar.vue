<script setup lang="ts">

const route = useRoute()
const { isDark } = useThemeMode()
const { t } = useAppLanguage()
const { clearProfile, fetchProfile, profile } = useAdminProfile()

const menu = [
  { labelKey: "sidebar.overview", icon: "i-lucide-layout-grid", path: "/dashboard" },
  { labelKey: "sidebar.products", icon: "i-lucide-package", path: "/dashboard/products" },
  { labelKey: "sidebar.inventory", icon: "i-lucide-warehouse", path: "/dashboard/inventory" },
  { labelKey: "sidebar.purchases", icon: "i-lucide-shopping-cart", path: "/dashboard/purchases" },
  { labelKey: "sidebar.sales", icon: "i-lucide-receipt", path: "/dashboard/sales" },
  { labelKey: "sidebar.reports", icon: "i-lucide-bar-chart", path: "/dashboard/reports" },
  { labelKey: "sidebar.users", icon: "i-lucide-users", path: "/dashboard/users" },
  { labelKey: "sidebar.settings", icon: "i-lucide-settings", path: "/dashboard/settings" },
]

const displayName = computed(() => profile.value?.full_name || "Admin User")
const displayRole = computed(() => profile.value?.job_title || t("sidebar.administrator"))
const profileImage = computed(() => profile.value?.profile_image || "")
const initials = computed(() =>
  displayName.value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string[]) => part[0]?.toUpperCase() || "")
    .join("") || "AU"
)

onMounted(async () => {
  if (!profile.value) {
    try {
      await fetchProfile()
    } catch {
      // Let the auth middleware handle invalid sessions elsewhere.
    }
  }
})

const logout = async () => {
  const authToken = useCookie("admin_token")
  authToken.value = null
  clearProfile()
  await navigateTo("/", { replace: true })
}
</script>

<template>
  <aside
    class="w-full shrink-0 border-b xl:min-h-screen xl:w-[21rem] xl:border-b-0 xl:border-r"
    :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }"
  >
    <!-- Brand -->
    <div class="flex items-center px-4 py-4 sm:px-6 sm:py-5 xl:px-10 xl:pb-10 xl:pt-10">
      <NuxtLink to="/dashboard" class="flex items-center gap-4 sm:gap-5 xl:gap-6">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg sm:h-16 sm:w-16 xl:h-[4.25rem] xl:w-[4.25rem]"
          :class="isDark ? 'bg-slate-800 shadow-black/20 ring-1 ring-slate-700/70' : 'bg-slate-900 shadow-slate-900/10'"
        >
          <UIcon name="i-lucide-box" class="h-7 w-7 text-sky-300 sm:h-8 sm:w-8" />
        </div>
        <div>
          <h1 class="text-xl font-bold leading-6 tracking-tight sm:text-2xl xl:text-[1.8rem] xl:leading-7" :style="{ color: 'var(--app-fg)' }">
            {{ t("common.stockflow") }}
          </h1>
          <div class="mt-1 leading-tight">
            <p class="text-[11px] font-semibold uppercase tracking-[0.25em]" :style="{ color: 'var(--app-fg-muted)' }">
              {{ t("common.inventory") }}
            </p>
            <p class="text-[11px] font-semibold uppercase tracking-[0.25em]" :style="{ color: 'var(--app-fg-muted)' }">
              {{ t("common.management") }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Menu -->
    <nav class="flex gap-2 overflow-x-auto px-4 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible xl:flex xl:flex-1 xl:grid-cols-1 xl:flex-col xl:space-y-2 xl:px-6">
      <NuxtLink
        v-for="item in menu"
        :key="item.labelKey"
        :to="item.path"
        class="flex shrink-0 items-center gap-3 rounded-[10px] px-4 py-3 text-[14px] font-medium transition sm:min-w-0 sm:gap-3 sm:px-4 sm:py-3.5 sm:text-[14px] md:gap-4 md:px-5 md:text-[14px] xl:gap-5 xl:px-6 xl:py-4 xl:text-[14px]"
        :class="route.path === item.path || (item.path !== '/dashboard' && route.path.startsWith(item.path))
          ? (isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100/80 text-slate-950')
          : (isDark ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100' : 'text-slate-500 hover:bg-slate-50/70 hover:text-slate-900')"
      >
        <UIcon :name="item.icon" class="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span class="truncate">{{ t(item.labelKey) }}</span>
      </NuxtLink>
    </nav>

    <!-- Footer user -->
    <div class="border-t px-4 py-4 sm:px-6 sm:py-5 xl:mt-auto xl:px-8 xl:py-8" :style="{ borderColor: 'var(--app-border)' }">
      <NuxtLink
        to="/dashboard/settings"
        class="flex items-center gap-3 rounded-2xl px-1 py-1 transition sm:gap-4 xl:gap-5"
        :class="isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/80'"
        :aria-label="t('settings.profileTitle')"
        :title="t('settings.profileTitle')"
      >
        <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 ring-4 ring-slate-50/50 sm:h-14 sm:w-14 xl:h-[3.75rem] xl:w-[3.75rem]">
          <img
            v-if="profileImage"
            :src="profileImage"
            :alt="displayName"
            class="h-full w-full object-cover object-center"
          />
          <span v-else class="text-sm font-bold text-slate-600 sm:text-base">{{ initials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="truncate text-base font-bold leading-tight sm:text-lg" :style="{ color: 'var(--app-fg)' }">{{ displayName }}</p>
          <p class="mt-0.5 text-xs font-medium tracking-wide sm:text-sm" :style="{ color: 'var(--app-fg-muted)' }">{{ displayRole }}</p>
        </div>
      </NuxtLink>

      <div class="mt-4 sm:mt-5 xl:mt-8">
        <button
          type="button"
          :aria-label="t('common.signOut')"
          :title="t('common.signOut')"
          class="group flex h-12 w-full items-center justify-between rounded-2xl border px-3 shadow-sm transition-all hover:shadow-md"
          :style="{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.78)' : 'var(--app-surface-muted)',
            borderColor: isDark ? 'rgba(248, 113, 113, 0.22)' : 'rgba(248, 113, 113, 0.18)',
          }"
          @click="logout"
        >
          <span class="flex items-center gap-3">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-xl transition-colors"
              :style="{ backgroundColor: isDark ? 'rgba(248, 113, 113, 0.12)' : 'rgba(248, 113, 113, 0.1)' }"
            >
              <UIcon
                name="i-lucide-log-out"
                class="h-4 w-4"
                :class="isDark ? 'text-red-300 group-hover:text-red-200' : 'text-red-500 group-hover:text-red-600'"
              />
            </span>
            <span
              class="text-sm font-semibold"
              :class="isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'"
            >
              {{ t("common.signOut") }}
            </span>
          </span>
          <div
            class="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:translate-x-0.5"
            :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.04)' }"
          >
            <UIcon
              name="i-lucide-arrow-right"
              class="h-4 w-4"
              :class="isDark ? 'text-slate-300' : 'text-slate-500'"
            />
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>
