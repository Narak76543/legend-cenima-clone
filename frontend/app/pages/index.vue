<script setup lang="ts">
type AuthMode = "signin" | "register"

const authMode                = ref<AuthMode>("signin")
const email                   = ref("admin@stockflow.com")
const password                = ref("")
const fullName                = ref("")
const jobTitle                = ref("Administrator")
const phone                   = ref("")
const bio                     = ref("")
const profileImage            = ref<string | null>(null)
const showPassword            = ref(false)
const rememberMe              = ref(false)
const isSubmitting            = ref(false)
const errorMessage            = ref("")
const successMessage          = ref("")
const { t }                   = useAppLanguage()
const { authToken, login, register } = useAdminAuth()
const { fetchProfile }        = useAdminProfile()
const { prepareProfileImage } = useProfileImage()
const { loginBackdropStyle, loginCardStyle } = useAuthPageStyles()

if (authToken.value) {
  await navigateTo("/dashboard", { replace: true })
}

const isRegisterMode = computed(() => authMode.value === "register")

const passwordHint = computed(() => {
  if (!password.value) return t("auth.use8Chars")
  if (password.value.length < 8) return t("auth.tooShort")
  return t("auth.looksGood")
})

const submitLabel = computed(() =>
  isRegisterMode.value
    ? (isSubmitting.value ? t("auth.registering") : t("auth.createAccount"))
    : (isSubmitting.value ? t("auth.signingIn") : t("auth.signIn"))
)

const clearMessages = () => {
  errorMessage.value = ""
  successMessage.value = ""
}

const syncProfileImage = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (!file.type.startsWith("image/")) {
    errorMessage.value = t("auth.invalidImage")
    input.value = ""
    return
  }

  try {
    profileImage.value = await prepareProfileImage(file)
  } catch {
    errorMessage.value = t("auth.invalidImage")
    input.value = ""
  }
}

const loginAdmin = async (successKey: string) => {
  await login({
    email: email.value,
    password: password.value,
    remember_me: rememberMe.value,
  })

  await fetchProfile()
  successMessage.value = t(successKey)
  await navigateTo("/dashboard", { replace: true })
}

const submitAuth = async () => {
  clearMessages()
  isSubmitting.value = true

  try {
    if (isRegisterMode.value) {
      await register({
        email: email.value,
        password: password.value,
        full_name: fullName.value,
        job_title: jobTitle.value || null,
        phone: phone.value || null,
        bio: bio.value || null,
        profile_image: profileImage.value,
      })

      await loginAdmin("auth.registrationSuccess")
    } else {
      await loginAdmin("auth.welcomeBack")
    }
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || t("auth.invalidCredentials")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0" :style="loginBackdropStyle" />
    <div class="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" />
    <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200 opacity-40 blur-3xl" />
    <div class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200 opacity-40 blur-3xl" />

    <div class="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <div class="w-full max-w-md sm:max-w-xl md:max-w-2xl">
        <div class="mb-6 flex items-center justify-center gap-3 sm:mb-8">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 shadow-md shadow-slate-900/10 sm:h-11 sm:w-11">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="white" stroke-width="1.8" stroke-linejoin="round" />
              <path d="M3 11l9 5 9-5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div class="leading-tight">
            <div class="text-xl font-semibold text-slate-900">{{ t("common.stockflow") }}</div>
            <div class="text-xs font-medium text-slate-300">{{ t("auth.adminConsole") }}</div>
          </div>
        </div>

        <section class="rounded-3xl border shadow-2xl shadow-slate-950/25 backdrop-blur-md" :style="loginCardStyle">
          <div class="border-b border-slate-300/80 px-5 pt-5 sm:px-7 sm:pt-7 md:px-8 md:pt-8">
            <div class="grid grid-cols-2 gap-2 rounded-2xl bg-slate-200/80 p-1">
              <button
                type="button"
                class="rounded-2xl px-4 py-2.5 text-base font-semibold transition"
                :class="!isRegisterMode ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                @click="authMode = 'signin'"
              >
                {{ t("auth.signIn") }}
              </button>
              <button
                type="button"
                class="rounded-2xl px-4 py-2.5 text-base font-semibold transition"
                :class="isRegisterMode ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'"
                @click="authMode = 'register'"
              >
                {{ t("auth.createAccount") }}
              </button>
            </div>
          </div>

          <div class="p-5 sm:p-7 md:p-8">
            <h1 class="text-2xl font-bold text-slate-950 sm:text-3xl">
              {{ isRegisterMode ? t("auth.createAccount") : t("auth.signIn") }}
            </h1>
            <p class="mt-1 text-sm font-medium text-slate-600">
              {{ isRegisterMode ? t("auth.createAdminAccount") : t("auth.accessSecurely") }}
            </p>

            <form class="mt-6 space-y-4 sm:space-y-5" @submit.prevent="submitAuth">
              <div v-if="isRegisterMode" class="grid gap-4 md:grid-cols-[auto_1fr] md:gap-6">
                <div class="flex flex-col items-center justify-start gap-3">
                  <div class="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                    <img
                      v-if="profileImage"
                      :src="profileImage"
                      :alt="fullName || t('auth.profileImage')"
                      class="h-full w-full object-cover"
                    />
                    <UIcon v-else name="i-lucide-image-plus" class="h-8 w-8 text-slate-400" />
                  </div>

                  <label class="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    {{ t("auth.uploadPhoto") }}
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="syncProfileImage"
                    />
                  </label>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="space-y-2 sm:col-span-2">
                    <label class="block text-sm font-semibold text-slate-800">{{ t("auth.fullName") }}</label>
                    <input
                      v-model.trim="fullName"
                      type="text"
                      required
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-800">{{ t("auth.jobTitle") }}</label>
                    <input
                      v-model.trim="jobTitle"
                      type="text"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-800">{{ t("auth.phone") }}</label>
                    <input
                      v-model.trim="phone"
                      type="text"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>

                  <div class="space-y-2 sm:col-span-2">
                    <label class="block text-sm font-semibold text-slate-800">{{ t("auth.bio") }}</label>
                    <textarea
                      v-model.trim="bio"
                      rows="3"
                      class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-2" :class="isRegisterMode ? '' : 'sm:col-span-2'">
                  <label class="block text-sm font-semibold text-slate-800">{{ t("auth.email") }}</label>

                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 6h16v12H4V6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                        <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>

                    <input
                      v-model.trim="email"
                      type="email"
                      required
                      autocomplete="email"
                      :placeholder="t('auth.email')"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-slate-800">{{ t("auth.password") }}</label>

                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M6 10h12v10H6V10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                      </svg>
                    </span>

                    <input
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      :autocomplete="isRegisterMode ? 'new-password' : 'current-password'"
                      :placeholder="t('auth.password')"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />

                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      aria-label="Toggle password"
                      @click="showPassword = !showPassword"
                    >
                      <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="2" />
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="2" />
                      </svg>
                      <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3l18 18" stroke="currentColor" stroke-width="2" />
                        <path d="M10.6 10.6a3 3 0 0 0 4.24 4.24" stroke="currentColor" stroke-width="2" />
                        <path d="M9.5 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 4.3" stroke="currentColor" stroke-width="2" />
                        <path d="M6.1 6.1C3.9 7.8 2 12 2 12s3.5 7 10 7c1 0 2-.1 2.9-.4" stroke="currentColor" stroke-width="2" />
                      </svg>
                    </button>
                  </div>

                  <p class="text-xs font-medium text-slate-600">{{ passwordHint }}</p>
                </div>
              </div>

              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label class="flex items-center gap-3 select-none">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
                  />
                  <span class="text-sm font-medium text-slate-700">{{ t("auth.rememberMe") }}</span>
                </label>

                <span class="pl-7 text-xs font-medium text-slate-500 sm:pl-0">{{ t("auth.days30") }}</span>
              </div>

              <Transition name="fade">
                <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {{ errorMessage }}
                </div>
              </Transition>

              <Transition name="fade">
                <div v-if="successMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {{ successMessage }}
                </div>
              </Transition>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 sm:h-12"
              >
                <svg v-if="isSubmitting" class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
                <span>{{ submitLabel }}</span>
              </button>

              <div v-if="!isRegisterMode" class="pt-2">
                <div class="flex items-center gap-4">
                  <div class="h-px flex-1 bg-slate-200" />
                  <div class="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    {{ t("common.orContinue") }}
                  </div>
                  <div class="h-px flex-1 bg-slate-200" />
                </div>
              </div>

              <button
                v-if="!isRegisterMode"
                type="button"
                class="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ t("auth.signInWithSso") }}
              </button>
            </form>
          </div>

          <div class="rounded-b-3xl border-t border-slate-300/80 bg-slate-50/90 px-7 py-4 sm:px-8">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs font-medium text-slate-600">
                {{ t("auth.agreePrefix") }}
                <button type="button" class="font-semibold text-slate-800 hover:underline">{{ t("common.terms") }}</button>
                {{ t("auth.and") }}
                <button type="button" class="font-semibold text-slate-800 hover:underline">{{ t("common.privacyPolicy") }}</button>.
              </p>

              <button
                type="button"
                class="text-sm font-semibold text-slate-700 hover:text-slate-950"
                @click="authMode = isRegisterMode ? 'signin' : 'register'"
              >
                {{ isRegisterMode ? t("auth.switchToSignIn") : t("auth.switchToRegister") }}
              </button>
            </div>
          </div>
        </section>

        <footer class="mt-8 text-center text-xs text-slate-400">
          © {{ new Date().getFullYear() }} {{ t("common.stockflow") }} • {{ t("auth.secureAdminAccess") }}
        </footer>
      </div>
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
