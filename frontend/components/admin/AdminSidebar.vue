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
  <aside class="flex min-h-screen w-[21rem] shrink-0 flex-col border-r border-slate-100 bg-white">
    <!-- Brand -->
    <div class="flex items-center px-10 pb-10 pt-10">
      <div class="flex items-center gap-5">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
          <UIcon name="i-lucide-box" class="h-6 w-6" />
        </div>
        <div>
          <h1 class="text-[1.8rem] font-bold leading-7 tracking-tight text-slate-950">StockFlow</h1>
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
    <nav class="flex-1 space-y-2 px-6">
      <NuxtLink
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-5 rounded-[1.5rem] px-6 py-4 text-[1.1rem] font-medium transition"
        :class="route.path === item.path || (item.path !== '/dashboard' && route.path.startsWith(item.path))
          ? 'bg-slate-100/80 text-slate-950'
          : 'text-slate-500 hover:bg-slate-50/70 hover:text-slate-900'"
      >
        <UIcon :name="item.icon" class="h-6 w-6 shrink-0" />
        {{ item.name }}
      </NuxtLink>
    </nav>

    <!-- Footer user -->
    <div class="mt-auto border-t border-slate-50 px-8 py-8">
      <div class="flex items-center gap-5">
        <div class="h-[3.75rem] w-[3.75rem] shrink-0 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 ring-4 ring-slate-50/50">
          <img
            src="/alex_rivera.png"
            alt="Alex Rivera"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="truncate text-lg font-bold text-slate-900 leading-tight">Alex Rivera</p>
          <p class="mt-0.5 text-sm font-medium text-slate-400 tracking-wide">Administrator</p>
        </div>
      </div>

      <button
        class="group mt-8 flex items-center gap-4 text-[1.05rem] font-semibold text-red-500 transition-colors hover:text-red-600"
        @click="logout"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:bg-red-100">
          <UIcon name="i-lucide-log-out" class="h-5 w-5" />
        </div>
        Sign Out
      </button>
    </div>
  </aside>
</template>

