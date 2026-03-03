<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()

const menu = [
  { name: "Overview", icon: "i-lucide-layout-grid", path: "/dashboard" },
  { name: "Products", icon: "i-lucide-package", path: "/dashboard/products" },
  { name: "Inventory", icon: "i-lucide-warehouse", path: "/dashboard/inventory" },
  { name: "Purchases", icon: "i-lucide-shopping-cart", path: "/dashboard/purchases" },
  { name: "Sales", icon: "i-lucide-receipt", path: "/dashboard/sales" },
  { name: "Reports", icon: "i-lucide-bar-chart", path: "/dashboard/reports" },
  { name: "Users", icon: "i-lucide-users", path: "/dashboard/users" },
  { name: "Settings", icon: "i-lucide-settings", path: "/dashboard/settings" },
]

const logout = async () => {
  const authToken = useCookie("admin_token")
  authToken.value = null
  await navigateTo("/", { replace: true })
}
</script>

<template>
  <aside class="w-full shrink-0 border-b border-slate-100 bg-white xl:min-h-screen xl:w-[21rem] xl:border-b-0 xl:border-r">
    <!-- Brand -->
    <div class="flex items-center px-4 py-4 sm:px-6 sm:py-5 xl:px-10 xl:pb-10 xl:pt-10">
      <div class="flex items-center gap-3 sm:gap-4 xl:gap-5">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 sm:h-11 sm:w-11 xl:h-12 xl:w-12">
          <UIcon name="i-lucide-box" class="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div>
          <h1 class="text-xl font-bold leading-6 tracking-tight text-slate-950 sm:text-2xl xl:text-[1.8rem] xl:leading-7">
            StockFlow
          </h1>
          <div class="mt-1 leading-tight">
            <p class="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Inventory
            </p>
            <p class="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Management
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex gap-2 overflow-x-auto px-4 pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible xl:flex xl:flex-1 xl:grid-cols-1 xl:flex-col xl:space-y-2 xl:px-6">
      <NuxtLink
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
        class="flex shrink-0 items-center gap-3 rounded-[1.5rem] px-4 py-3 text-sm font-medium transition sm:min-w-0 sm:gap-3 sm:px-4 sm:py-3.5 sm:text-[15px] md:gap-4 md:px-5 md:text-base xl:gap-5 xl:px-6 xl:py-4 xl:text-[1.1rem]"
        :class="route.path === item.path || (item.path !== '/dashboard' && route.path.startsWith(item.path))
          ? 'bg-slate-100/80 text-slate-950'
          : 'text-slate-500 hover:bg-slate-50/70 hover:text-slate-900'"
      >
        <UIcon :name="item.icon" class="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span class="truncate">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <!-- Footer user -->
    <div class="border-t border-slate-50 px-4 py-4 sm:px-6 sm:py-5 xl:mt-auto xl:px-8 xl:py-8">
      <div class="flex items-center gap-3 sm:gap-4 xl:gap-5">
        <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 ring-4 ring-slate-50/50 sm:h-14 sm:w-14 xl:h-[3.75rem] xl:w-[3.75rem]">
          <img
            src="/alex_rivera.png"
            alt="Alex Rivera"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="truncate text-base font-bold leading-tight text-slate-900 sm:text-lg">Alex Rivera</p>
          <p class="mt-0.5 text-xs font-medium tracking-wide text-slate-400 sm:text-sm">Administrator</p>
        </div>
      </div>

      <div class="mt-4 sm:mt-5 xl:mt-8">
        <button
          class="group flex w-full items-center justify-center gap-3 rounded-2xl border border-red-100 px-4 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 sm:text-base xl:justify-start xl:border-0 xl:px-0 xl:py-0"
          @click="logout"
        >
          <div class="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:bg-red-100 sm:h-10 sm:w-10">
            <UIcon name="i-lucide-log-out" class="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          Sign Out
        </button>
      </div>
    </div>
  </aside>
</template>
