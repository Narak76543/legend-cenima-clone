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
    class="w-full shrink-0 border-b xl:min-h-screen xl:w-84 xl:border-b-0 xl:border-r"
    :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)' }"
  >
    <div class="flex items-center px-4 py-4 sm:px-6 sm:py-5 xl:px-10 xl:pb-10 xl:pt-10">
      <div class="flex items-center gap-3 sm:gap-4 xl:gap-5">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 sm:h-11 sm:w-11 xl:h-12 xl:w-12">
          <UIcon name="i-lucide-box" class="h-5 w-5 text-sky-300 sm:h-6 sm:w-6" />
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
      </div>
    </div>

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

    <div class="border-t px-4 py-4 sm:px-6 sm:py-5 xl:mt-auto xl:px-8 xl:py-8" :style="{ borderColor: 'var(--app-border)' }">
      <div class="flex items-center gap-3 sm:gap-4 xl:gap-5">
        <div class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 ring-4 ring-slate-50/50 sm:h-14 sm:w-14 xl:h-[3.75rem] xl:w-[3.75rem]">
          <img
            v-if="profileImage"
            :src="profileImage"
            :alt="displayName"
            class="h-full w-full object-cover"
          />
          <span v-else class="text-sm font-bold text-slate-600 sm:text-base">{{ initials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="truncate text-base font-bold leading-tight sm:text-lg" :style="{ color: 'var(--app-fg)' }">{{ displayName }}</p>
          <p class="mt-0.5 text-xs font-medium tracking-wide sm:text-sm" :style="{ color: 'var(--app-fg-muted)' }">{{ displayRole }}</p>
        </div>
      </div>

      <div class="mt-4 sm:mt-5 xl:mt-8">
        <button
          type="button"
          :aria-label="t('common.signOut')"
          :title="t('common.signOut')"
          class="group relative flex h-12 w-20 items-center rounded-full border px-1.5 shadow-sm transition-all hover:shadow-md sm:w-24"
          :style="{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.7)' : 'var(--app-surface-muted)',
            borderColor: isDark ? 'rgba(248, 113, 113, 0.35)' : 'rgba(248, 113, 113, 0.25)',
          }"
          @click="logout"
        >
          <span
            class="ml-1 h-2.5 w-2.5 rounded-full transition-colors"
            :class="isDark ? 'bg-red-300/80 group-hover:bg-red-300' : 'bg-red-300 group-hover:bg-red-400'"
          />
          <div
            class="ml-auto flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform duration-200 group-hover:-translate-x-1 sm:h-10 sm:w-10"
            :style="{ backgroundColor: 'white', color: '#ef4444' }"
          >
            <UIcon name="i-lucide-log-out" class="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>
