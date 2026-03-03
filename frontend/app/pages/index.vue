<script setup lang="ts">
const email          = ref("admin@stockflow.com")
const password       = ref("")
const showPassword   = ref(false)
const rememberMe     = ref(false)
const isSubmitting   = ref(false)
const errorMessage   = ref("")
const successMessage = ref("")

const authToken = useCookie<string | null>("admin_token", {
  default: () => null,
  path: "/",
  sameSite: "lax",
})

if (authToken.value) {
  await navigateTo("/dashboard", { replace: true })
}

const signIn = async () => {
  errorMessage.value   = ""
  successMessage.value = ""
  isSubmitting.value   = true

  try {
    const response = await $fetch <{ access_token: string; token_type: string }>(
      "/api/auth/login",
      {
        method: "POST",
        body: {
          email      : email.value,
          password   : password.value,
          remember_me: rememberMe.value,
        },
      }
    )

    authToken.value = response.access_token
    successMessage.value = "Welcome back. Redirecting..."
    await navigateTo("/dashboard", { replace: true })
  } catch (error: any) {
    errorMessage.value =
      error?.data?.detail || "Invalid credentials. Please try again."
  } finally {
    isSubmitting.value = false
  }
}

const passwordHint = computed(() => {
  if (!password.value) return "Use at least 8 characters."
  if (password.value.length < 8) return "Too short — add more characters."
  return "Looks good."
})
</script>

<template>
  <main class="min-h-screen relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-slate-50" />
    <div
      class="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-orange-200"
    />
    <div
      class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40 bg-sky-200"
    />

    <div class="relative min-h-screen flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-md">
        <!-- Brand -->
        <div class="mb-8 flex items-center justify-center gap-3">
          <div
            class="h-11 w-11 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md shadow-slate-900/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l9 5-9 5-9-5 9-5z"
                stroke="white"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M3 11l9 5 9-5"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="leading-tight">
            <div class="text-xl font-semibold text-slate-900">StockFlow</div>
            <div class="text-xs text-slate-500">Admin Console</div>
          </div>
        </div>

        <!-- Card -->
        <section
          class="rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur
                 shadow-xl shadow-slate-900/5"
        >
          <div class="p-7 sm:p-8">
            <h1 class="text-2xl font-semibold text-slate-900">Sign in</h1>
            <p class="mt-1 text-sm text-slate-500">
              Access your dashboard securely.
            </p>

            <form class="mt-6 space-y-5" @submit.prevent="signIn">
              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-700">
                  Email
                </label>

                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 6h16v12H4V6z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 7l8 6 8-6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    v-model.trim="email"
                    type="email"
                    required
                    autocomplete="email"
                    enterkeyhint="next"
                    placeholder="admin@stockflow.com"
                    class="w-full h-11 rounded-2xl border border-slate-200 bg-white/60 pl-10 pr-4
                           text-sm outline-none transition
                           focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                </div>

                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 10V8a5 5 0 0 1 10 0v2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M6 10h12v10H6V10z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>

                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="current-password"
                    enterkeyhint="done"
                    placeholder="••••••••"
                    class="w-full h-11 rounded-2xl border border-slate-200 bg-white/60 pl-10 pr-12
                           text-sm outline-none transition
                           focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />

                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    @click="showPassword = !showPassword"
                    aria-label="Toggle password"
                  >
                    <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" stroke-width="2"/>
                      <path d="M10.6 10.6a3 3 0 0 0 4.24 4.24" stroke="currentColor" stroke-width="2"/>
                      <path d="M9.5 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 4.3" stroke="currentColor" stroke-width="2"/>
                      <path d="M6.1 6.1C3.9 7.8 2 12 2 12s3.5 7 10 7c1 0 2-.1 2.9-.4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </button>
                </div>

                <p class="text-xs text-slate-500">
                  {{ passwordHint }}
                </p>
              </div>

              <!-- Remember -->
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3 select-none">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
                  />
                  <span class="text-sm text-slate-600">Remember me</span>
                </label>

                <span class="text-xs text-slate-400">30 days</span>
              </div>

              <!-- Messages -->
              <Transition name="fade">
                <div
                  v-if="errorMessage"
                  class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {{ errorMessage }}
                </div>
              </Transition>

              <Transition name="fade">
                <div
                  v-if="successMessage"
                  class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {{ successMessage }}
                </div>
              </Transition>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full h-11 rounded-2xl bg-slate-900 text-white text-sm font-semibold
                       shadow-sm shadow-slate-900/10 transition
                       hover:bg-slate-800 active:scale-[0.99]
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                       flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2a10 10 0 1 0 10 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span>{{ isSubmitting ? "Signing in..." : "Sign In" }}</span>
              </button>

              <!-- Divider -->
              <div class="pt-2">
                <div class="flex items-center gap-4">
                  <div class="h-px flex-1 bg-slate-200"></div>
                  <div class="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
                    Or continue
                  </div>
                  <div class="h-px flex-1 bg-slate-200"></div>
                </div>
              </div>

              <!-- SSO -->
              <button
                type="button"
                class="w-full h-11 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold
                       hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                    stroke="currentColor" stroke-width="2" stroke-linejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  />
                </svg>
                Sign in with SSO
              </button>
            </form>
          </div>

          <!-- Bottom bar -->
          <div class="px-7 sm:px-8 py-4 border-t border-slate-200/70 bg-white/60 rounded-b-3xl">
            <p class="text-xs text-slate-500">
              By continuing, you agree to our
              <button type="button" class="text-slate-700 hover:underline">Terms</button>
              and
              <button type="button" class="text-slate-700 hover:underline">Privacy Policy</button>.
            </p>
          </div>
        </section>

        <!-- Footer -->
        <footer class="mt-8 text-center text-xs text-slate-400">
          © {{ new Date().getFullYear() }} StockFlow • Secure admin access
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
