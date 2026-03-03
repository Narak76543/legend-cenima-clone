<script setup lang="ts">
const { isDark, setTheme } = useThemeMode()
const { language, setLanguage, t } = useAppLanguage()
const { fetchProfile, profile } = useAdminProfile()

const displayName = computed(() => profile.value?.full_name || "Admin User")
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
      // The route middleware handles invalid sessions.
    }
  }
})
</script>

<template>
  <header class="flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 xl:flex-row xl:items-center xl:justify-between xl:py-8">
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
        class="col-span-2 flex w-full items-center gap-1 rounded-2xl border p-1 shadow-sm sm:col-span-1 sm:w-auto sm:rounded-full"
        :style="{ backgroundColor: 'var(--app-surface-muted)', borderColor: 'var(--app-border)' }"
      >
        <button
          type="button"
          :aria-label="t('settings.english')"
          :title="t('settings.english')"
          class="flex h-10 flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition sm:h-10 sm:min-w-11 sm:flex-none sm:rounded-full sm:px-4"
          :class="language === 'en' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'"
          @click="setLanguage('en')"
        >
          <UIcon name="i-circle-flags-us" class="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          :aria-label="t('settings.khmer')"
          :title="t('settings.khmer')"
          class="flex h-10 flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition sm:h-10 sm:min-w-11 sm:flex-none sm:rounded-full sm:px-4"
          :class="language === 'km' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'"
          @click="setLanguage('km')"
        >
          <UIcon name="i-circle-flags-kh" class="h-4 w-4 sm:h-5 sm:w-5" />
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

      <button
        class="group relative flex h-11 w-full items-center justify-center rounded-2xl border text-slate-500 shadow-sm transition sm:h-12 sm:w-12 sm:rounded-full lg:h-15 lg:w-15"
        :class="isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'"
        :style="{ backgroundColor: 'var(--app-surface)', borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }"
      >
        <span class="absolute right-3 top-3 h-2 w-2 rounded-full border-2 border-white bg-red-500 sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5" />
        <UIcon name="i-lucide-bell" class="h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
      </button>

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
