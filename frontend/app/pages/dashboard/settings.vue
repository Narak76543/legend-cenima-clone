<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

const { isDark, setTheme } = useThemeMode()
const { language, setLanguage, t } = useAppLanguage()
const { fetchProfile, isLoadingProfile, profile, updateProfile } = useAdminProfile()
const { prepareCroppedProfileImage } = useProfileImage()

const CROP_PREVIEW_SIZE = 176
const CROP_GUIDE_SIZE = 208

const fullName = ref("")
const jobTitle = ref("")
const phone = ref("")
const bio = ref("")
const profileImage = ref<string | null>(null)
const errorMessage = ref("")
const successMessage = ref("")
const isSaving = ref(false)
const cropSource = ref<string | null>(null)
const cropImageWidth = ref(0)
const cropImageHeight = ref(0)
const cropScale = ref(1)
const cropOffsetX = ref(0)
const cropOffsetY = ref(0)

const isCropping = computed(() => Boolean(cropSource.value))
const cropBaseScale = computed(() => {
  if (!cropImageWidth.value || !cropImageHeight.value) return 1
  return Math.max(CROP_PREVIEW_SIZE / cropImageWidth.value, CROP_PREVIEW_SIZE / cropImageHeight.value)
})
const cropEditorBaseScale = computed(() => {
  if (!cropImageWidth.value || !cropImageHeight.value) return 1
  return Math.max(CROP_GUIDE_SIZE / cropImageWidth.value, CROP_GUIDE_SIZE / cropImageHeight.value)
})
const cropRenderedWidth = computed(() => cropImageWidth.value * cropBaseScale.value)
const cropRenderedHeight = computed(() => cropImageHeight.value * cropBaseScale.value)
const cropEditorRenderedWidth = computed(() => cropImageWidth.value * cropEditorBaseScale.value)
const cropEditorRenderedHeight = computed(() => cropImageHeight.value * cropEditorBaseScale.value)
const cropMaxTranslateX = computed(() =>
  Math.max(0, ((cropRenderedWidth.value * cropScale.value) - CROP_PREVIEW_SIZE) / 2),
)
const cropMaxTranslateY = computed(() =>
  Math.max(0, ((cropRenderedHeight.value * cropScale.value) - CROP_PREVIEW_SIZE) / 2),
)
const cropEditorMaxTranslateX = computed(() =>
  Math.max(0, ((cropEditorRenderedWidth.value * cropScale.value) - CROP_GUIDE_SIZE) / 2),
)
const cropEditorMaxTranslateY = computed(() =>
  Math.max(0, ((cropEditorRenderedHeight.value * cropScale.value) - CROP_GUIDE_SIZE) / 2),
)
const cropPreviewStyle = computed(() => ({
  width: `${cropRenderedWidth.value}px`,
  height: `${cropRenderedHeight.value}px`,
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% + ${cropOffsetX.value * cropMaxTranslateX.value}px), calc(-50% + ${cropOffsetY.value * cropMaxTranslateY.value}px)) scale(${cropScale.value})`,
  transformOrigin: "center",
}))
const cropEditorStyle = computed(() => ({
  width: `${cropEditorRenderedWidth.value}px`,
  height: `${cropEditorRenderedHeight.value}px`,
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% + ${cropOffsetX.value * cropEditorMaxTranslateX.value}px), calc(-50% + ${cropOffsetY.value * cropEditorMaxTranslateY.value}px)) scale(${cropScale.value})`,
  transformOrigin: "center",
}))

const applyProfile = () => {
  fullName.value = profile.value?.full_name || ""
  jobTitle.value = profile.value?.job_title || ""
  phone.value = profile.value?.phone || ""
  bio.value = profile.value?.bio || ""
  profileImage.value = profile.value?.profile_image || null
}

watch(profile, applyProfile, { immediate: true })

onMounted(async () => {
  if (!profile.value) {
    try {
      await fetchProfile()
    } catch (error: any) {
      errorMessage.value = error?.data?.detail || "Failed to load profile."
    }
  }
})

onBeforeUnmount(() => {
  if (cropSource.value) {
    URL.revokeObjectURL(cropSource.value)
  }
})

const resetCropper = () => {
  if (cropSource.value) {
    URL.revokeObjectURL(cropSource.value)
  }

  cropSource.value = null
  cropImageWidth.value = 0
  cropImageHeight.value = 0
  cropScale.value = 1
  cropOffsetX.value = 0
  cropOffsetY.value = 0
}

const syncProfileImage = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  let nextCropSource: string | null = null

  if (!file) return

  if (!file.type.startsWith("image/")) {
    errorMessage.value = t("auth.invalidImage")
    input.value = ""
    return
  }

  try {
    nextCropSource = URL.createObjectURL(file)
    const image = new Image()

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error("Unable to load image"))
      image.src = nextCropSource
    })

    resetCropper()
    cropSource.value = nextCropSource
    cropImageWidth.value = image.naturalWidth || image.width
    cropImageHeight.value = image.naturalHeight || image.height
    cropScale.value = 1
    cropOffsetX.value = 0
    cropOffsetY.value = 0
  } catch {
    if (nextCropSource) {
      URL.revokeObjectURL(nextCropSource)
    }
    errorMessage.value = t("auth.invalidImage")
  } finally {
    input.value = ""
  }
}

const applyCroppedImage = async () => {
  if (!cropSource.value) return

  try {
    profileImage.value = await prepareCroppedProfileImage(cropSource.value, {
      scale: cropScale.value,
      offsetX: cropOffsetX.value,
      offsetY: cropOffsetY.value,
    })
    resetCropper()
  } catch {
    errorMessage.value = t("auth.invalidImage")
  }
}

const saveProfile = async () => {
  errorMessage.value = ""
  successMessage.value = ""
  isSaving.value = true

  try {
    await updateProfile({
      full_name: fullName.value,
      job_title: jobTitle.value || null,
      phone: phone.value || null,
      bio: bio.value || null,
      profile_image: profileImage.value,
    })

    successMessage.value = t("settings.profileSaved")
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Failed to save profile."
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <section class="space-y-6 pb-8">
    <div
      class="rounded-2xl border p-6 shadow-sm sm:p-8"
      :style="{
        backgroundColor: 'var(--app-surface)',
        borderColor: 'var(--app-border)',
        color: 'var(--app-fg)',
      }"
    >
      <h1 class="text-2xl font-bold">{{ t("settings.title") }}</h1>
      <p class="mt-1 text-sm" :style="{ color: 'var(--app-fg-muted)' }">
        {{ t("settings.description") }}
      </p>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div
        class="rounded-2xl border p-6 shadow-sm sm:p-8"
        :style="{
          backgroundColor: 'var(--app-surface)',
          borderColor: 'var(--app-border)',
          color: 'var(--app-fg)',
        }"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 class="text-lg font-semibold">{{ t("settings.profileTitle") }}</h2>
            <p class="mt-1 text-sm" :style="{ color: 'var(--app-fg-muted)' }">
              {{ t("settings.profileDescription") }}
            </p>
          </div>

          <span
            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            :style="{ backgroundColor: 'var(--app-surface-muted)', color: 'var(--app-fg-muted)' }"
          >
            {{ isLoadingProfile ? "Loading..." : profile?.role || "admin" }}
          </span>
        </div>

        <form class="mt-6 space-y-5" @submit.prevent="saveProfile">
          <div class="space-y-6">
            <div class="flex flex-col items-center justify-center gap-4 text-center">
              <div class="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border shadow-sm sm:h-44 sm:w-44" :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }">
                <img
                  v-if="profileImage"
                  :src="profileImage"
                  :alt="fullName || t('auth.profileImage')"
                  class="h-full w-full object-cover object-center"
                />
                <UIcon v-else name="i-lucide-image-plus" class="h-8 w-8" :style="{ color: 'var(--app-fg-muted)' }" />
              </div>

              <label class="inline-flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-2 text-xs font-semibold transition hover:opacity-90" :style="{ borderColor: 'var(--app-border)' }">
                {{ t("auth.uploadPhoto") }}
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="syncProfileImage"
                />
              </label>
            </div>

            <div
              v-if="isCropping && cropSource"
              class="rounded-[2rem] border p-5 sm:p-6"
              :style="{ borderColor: 'var(--app-border)', background: 'linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.95) 100%)' }"
            >
              <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                <div class="flex flex-1 flex-col items-center gap-4">
                  <div class="text-center">
                    <p class="text-sm font-semibold">Crop profile photo</p>
                    <p class="mt-1 text-xs" :style="{ color: 'var(--app-fg-muted)' }">
                      Center your face inside the guide, then apply the crop.
                    </p>
                  </div>

                  <div
                    class="relative flex h-[17.5rem] w-[17.5rem] items-center justify-center rounded-[2rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                    :style="{ borderColor: 'rgba(148,163,184,0.28)', background: 'radial-gradient(circle at center, rgba(255,255,255,0.7), rgba(226,232,240,0.9))' }"
                  >
                    <div class="pointer-events-none absolute inset-0 rounded-[2rem]" :style="{ boxShadow: 'inset 0 0 0 999px rgba(15, 23, 42, 0.08)' }" />
                    <div
                      class="relative h-52 w-52 overflow-hidden rounded-full border-4 shadow-lg shadow-slate-900/10"
                      :style="{ borderColor: 'rgba(255,255,255,0.95)', backgroundColor: 'rgba(15, 23, 42, 0.05)' }"
                    >
                      <img
                        :src="cropSource"
                        alt="Crop editor"
                        class="absolute max-w-none select-none"
                        :style="cropEditorStyle"
                      />
                      <div class="pointer-events-none absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-white/70" />
                      <div class="pointer-events-none absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-white/70" />
                    </div>
                  </div>
                </div>

                <div class="flex w-full flex-col gap-5 lg:max-w-sm">
                  <div
                    class="rounded-3xl border p-5"
                    :style="{ borderColor: 'rgba(148,163,184,0.22)', backgroundColor: 'rgba(255,255,255,0.72)' }"
                  >
                    <p class="text-xs font-semibold uppercase tracking-[0.22em]" :style="{ color: 'var(--app-fg-muted)' }">
                      Live Preview
                    </p>
                    <div class="mt-4 flex justify-center">
                      <div class="relative h-44 w-44 overflow-hidden rounded-full border-4 shadow-lg shadow-slate-900/10" :style="{ borderColor: 'rgba(255,255,255,0.95)', backgroundColor: 'rgba(15, 23, 42, 0.08)' }">
                        <img
                          :src="cropSource"
                          alt="Crop preview"
                          class="absolute max-w-none select-none"
                          :style="cropPreviewStyle"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="rounded-3xl border p-5"
                    :style="{ borderColor: 'rgba(148,163,184,0.22)', backgroundColor: 'rgba(255,255,255,0.72)' }"
                  >
                    <div class="space-y-4">
                      <label class="block space-y-2 text-left">
                        <span class="block text-xs font-semibold uppercase tracking-[0.18em]" :style="{ color: 'var(--app-fg-muted)' }">Zoom</span>
                        <input
                          v-model.number="cropScale"
                          type="range"
                          min="1"
                          max="3"
                          step="0.01"
                          class="w-full accent-slate-900"
                        />
                      </label>

                      <label class="block space-y-2 text-left">
                        <span class="block text-xs font-semibold uppercase tracking-[0.18em]" :style="{ color: 'var(--app-fg-muted)' }">Horizontal</span>
                        <input
                          v-model.number="cropOffsetX"
                          type="range"
                          min="-1"
                          max="1"
                          step="0.01"
                          class="w-full accent-slate-900"
                        />
                      </label>

                      <label class="block space-y-2 text-left">
                        <span class="block text-xs font-semibold uppercase tracking-[0.18em]" :style="{ color: 'var(--app-fg-muted)' }">Vertical</span>
                        <input
                          v-model.number="cropOffsetY"
                          type="range"
                          min="-1"
                          max="1"
                          step="0.01"
                          class="w-full accent-slate-900"
                        />
                      </label>
                    </div>

                    <div class="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        class="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        @click="applyCroppedImage"
                      >
                        Apply crop
                      </button>
                      <button
                        type="button"
                        class="inline-flex h-11 items-center justify-center rounded-2xl border px-5 text-sm font-semibold transition hover:opacity-90"
                        :style="{ borderColor: 'var(--app-border)' }"
                        @click="resetCropper"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2 sm:col-span-2">
                <label class="block text-sm font-medium">{{ t("auth.fullName") }}</label>
                <input
                  v-model.trim="fullName"
                  type="text"
                  required
                  class="h-11 w-full rounded-2xl border px-4 text-sm outline-none transition focus:ring-4"
                  :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium">{{ t("auth.jobTitle") }}</label>
                <input
                  v-model.trim="jobTitle"
                  type="text"
                  class="h-11 w-full rounded-2xl border px-4 text-sm outline-none transition focus:ring-4"
                  :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium">{{ t("auth.phone") }}</label>
                <input
                  v-model.trim="phone"
                  type="text"
                  class="h-11 w-full rounded-2xl border px-4 text-sm outline-none transition focus:ring-4"
                  :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }"
                />
              </div>

              <div class="space-y-2 sm:col-span-2">
                <label class="block text-sm font-medium">{{ t("auth.bio") }}</label>
                <textarea
                  v-model.trim="bio"
                  rows="4"
                  class="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4"
                  :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }"
                />
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border px-4 py-3" :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }">
              <p class="text-xs font-semibold" :style="{ color: 'var(--app-fg-muted)' }">{{ t("settings.accountEmail") }}</p>
              <p class="mt-1 text-sm font-semibold">{{ profile?.email || "-" }}</p>
            </div>

            <div class="rounded-2xl border px-4 py-3" :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }">
              <p class="text-xs font-semibold" :style="{ color: 'var(--app-fg-muted)' }">{{ t("settings.roleLabel") }}</p>
              <p class="mt-1 text-sm font-semibold">{{ profile?.role || "-" }}</p>
            </div>
          </div>

          <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            :disabled="isSaving || isLoadingProfile || isCropping"
            class="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSaving ? t("settings.savingProfile") : t("settings.saveProfile") }}
          </button>
        </form>
      </div>

      <div class="space-y-6">
        <div
          class="rounded-2xl border p-6 shadow-sm"
          :style="{
            backgroundColor: 'var(--app-surface)',
            borderColor: 'var(--app-border)',
            color: 'var(--app-fg)',
          }"
        >
          <h2 class="text-lg font-semibold">{{ t("settings.quickToggle") }}</h2>
          <p class="mt-1 text-sm" :style="{ color: 'var(--app-fg-muted)' }">
            {{ t("settings.currentTheme") }}: {{ isDark ? t("settings.darkMode") : t("settings.lightMode") }}
          </p>
          <div class="mt-4 grid grid-cols-2 gap-2 rounded-2xl border p-1" :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }">
            <button
              type="button"
              class="flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition"
              :class="!isDark ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'"
              @click="setTheme('light')"
            >
              <UIcon name="i-lucide-sun" class="h-4 w-4" />
              {{ t("settings.lightMode") }}
            </button>
            <button
              type="button"
              class="flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition"
              :class="isDark ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'"
              @click="setTheme('dark')"
            >
              <UIcon name="i-lucide-moon" class="h-4 w-4" />
              {{ t("settings.darkMode") }}
            </button>
          </div>
        </div>

        <div
          class="rounded-2xl border p-6 shadow-sm"
          :style="{
            backgroundColor: 'var(--app-surface)',
            borderColor: 'var(--app-border)',
            color: 'var(--app-fg)',
          }"
        >
          <h2 class="text-lg font-semibold">{{ t("settings.language") }}</h2>
          <p class="mt-1 text-sm" :style="{ color: 'var(--app-fg-muted)' }">
            {{ t("settings.currentLanguage") }}: {{ language === "km" ? t("settings.khmer") : t("settings.english") }}
          </p>
          <div class="mt-4 grid grid-cols-2 gap-2 rounded-2xl border p-1" :style="{ borderColor: 'var(--app-border)', backgroundColor: 'var(--app-surface-muted)' }">
            <button
              type="button"
              class="flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition"
              :class="language === 'en' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'"
              @click="setLanguage('en')"
            >
              <UIcon name="i-circle-flags-us" class="h-4 w-4" />
              {{ t("settings.english") }}
            </button>
            <button
              type="button"
              class="flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition"
              :class="language === 'km' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-800'"
              @click="setLanguage('km')"
            >
              <UIcon name="i-circle-flags-kh" class="h-4 w-4" />
              {{ t("settings.khmer") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
