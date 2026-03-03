<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

const summaryCards = [
  {
    title: "Total Sales (Today)",
    value: "$12,450",
    delta: "12.5%",
    deltaLabel: "vs yesterday",
    deltaTrend: "up",
    icon: "i-lucide-banknote",
    color: "emerald",
    chartColor: "#10b981",
  },
  {
    title: "Total Purchases (Today)",
    value: "$8,200",
    delta: "2.4%",
    deltaLabel: "vs yesterday",
    deltaTrend: "down",
    icon: "i-lucide-shopping-cart",
    color: "blue",
    chartColor: "#3b82f6",
  },
  {
    title: "Net Profit (Today)",
    value: "$4,250",
    delta: "5.1%",
    deltaLabel: "vs yesterday",
    deltaTrend: "up",
    icon: "i-lucide-wallet",
    color: "slate",
    chartColor: "#64748b",
  },
  {
    title: "Low Stock Alerts",
    value: "12",
    delta: "+2 items",
    deltaLabel: "since 8AM",
    deltaTrend: "up",
    icon: "i-lucide-triangle-alert",
    color: "amber",
    chartColor: "#f59e0b",
  },
]

const categories = [
  { name: "Electronics", color: "#0f172a", share: "40%" },
  { name: "Office Supplies", color: "#3b82f6", share: "25%" },
  { name: "Hardware", color: "#10b981", share: "15%" },
  { name: "Furniture", color: "#f59e0b", share: "20%" },
]

const transactions = [
  { type: "Sales", reference: "INV-2024-001", amount: "$1,240.00", date: "Oct 24, 2024", status: "COMPLETED", statusClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { type: "Purchase", reference: "PO-2024-882", amount: "$850.00", date: "Oct 23, 2024", status: "PENDING", statusClass: "bg-amber-50 text-amber-600 border-amber-100" },
  { type: "Sales", reference: "INV-2024-002", amount: "$3,100.00", date: "Oct 22, 2024", status: "COMPLETED", statusClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { type: "Return", reference: "RET-004-92", amount: "-$120.00", date: "Oct 22, 2024", status: "RETURNED", statusClass: "bg-slate-50 text-slate-500 border-slate-100" },
]

const alerts = [
  { name: "Logitech MX Master 3S", left: "Only 2 left", leftClass: "text-red-500", icon: "i-lucide-mouse" },
  { name: "HP LaserJet Pro", left: "Only 5 left", leftClass: "text-red-500", icon: "i-lucide-printer" },
  { name: "USB-C Hub", left: "Only 12 left", leftClass: "text-amber-500", icon: "i-lucide-usb" },
  { name: "Sony WH-1000XM5", left: "Only 3 left", leftClass: "text-red-500", icon: "i-lucide-headphones" },
]
</script>

<template>
  <section class="space-y-6 pb-8 sm:space-y-8 sm:pb-10">
    <div class="grid gap-2 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
      <article
        v-for="card in summaryCards"
        :key="card.title"
        class="group rounded-[15px] border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5"
      >
        <div class="flex items-start justify-between">
          <div
            :class="[
              'flex h-10 w-10 items-center justify-center rounded-full shadow-sm sm:h-14 sm:w-14 ',
              card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
              card.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              card.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
            ]"
          >
            <UIcon :name="card.icon" class="h-7 w-7" />
          </div>
          <div class="text-right">
            <div
              :class="[
                'flex items-center justify-end gap-1 text-sm font-bold sm:text-base',
                card.deltaTrend === 'up' && card.color !== 'amber' ? 'text-emerald-600' :
                card.deltaTrend === 'down' ? 'text-red-500' : 'text-amber-500'
              ]"
            >
              <UIcon v-if="card.deltaTrend === 'up'" name="i-lucide-trending-up" class="h-4 w-4" />
              <UIcon v-else name="i-lucide-trending-down" class="h-4 w-4" />
              {{ card.delta }}
            </div>
            <p class="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-500 sm:text-[10px]">
              {{ card.deltaLabel }}
            </p>
          </div>
        </div>

        <p class="mt-6 text-[12px] font-medium text-slate-600 sm:mt-8 sm:text-sm">
          {{ card.title }}
        </p>
        <div class="mt-2 flex items-end justify-between gap-3 sm:gap-4">
          <p class="text-xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            {{ card.value }}
          </p>
          <div class="pb-1 sm:pb-2">
            <svg class="h-5 w-12 sm:h-6 sm:w-[60px]" viewBox="0 0 60 24" fill="none">
              <path
                :d="`M0 ${15 + Math.random() * 5} Q 15 ${5 + Math.random() * 10}, 30 ${12 + Math.random() * 5} T 60 ${2 + Math.random() * 10}`"
                :stroke="card.chartColor"
                stroke-width="2.5"
                stroke-linecap="round"
                class="opacity-40"
              />
              <rect x="0" y="20" width="60" height="4" rx="2" :fill="card.chartColor" class="opacity-10" />
            </svg>
          </div>
        </div>
      </article>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8">
      <section class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 class="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
              Sales vs Purchases
            </h2>
            <p class="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              Weekly analytical comparison
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 sm:gap-8 sm:text-sm">
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-700" />
              Sales
            </div>
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-200" />
              Purchases
            </div>
          </div>
        </div>

        <div class="mt-8 sm:mt-12">
          <svg viewBox="0 0 800 320" class="h-56 w-full overflow-visible sm:h-72 lg:h-80">
            <g class="stroke-slate-100 opacity-50" stroke-width="1" stroke-dasharray="4 4">
              <line x1="0" y1="80" x2="800" y2="80" />
              <line x1="0" y1="160" x2="800" y2="160" />
              <line x1="0" y1="240" x2="800" y2="240" />
            </g>

            <path
              d="M0 240 Q 100 200, 150 210 T 250 180 T 350 250 T 450 150 T 550 120 T 650 200 T 800 100"
              fill="none"
              stroke="#0f172a"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <path
              d="M0 260 Q 100 240, 150 250 T 250 220 T 350 260 T 450 200 T 550 220 T 650 240 T 800 180"
              fill="none"
              stroke="#cbd5e1"
              stroke-width="4"
              stroke-dasharray="8 8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="mt-6 grid grid-cols-7 text-center text-[10px] font-bold tracking-wider text-slate-500 sm:mt-8 sm:text-xs">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </section>

      <section class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-7 xl:p-10">
        <h2 class="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Stock by Category
        </h2>
        <p class="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
          Distribution of products
        </p>

        <div class="relative mx-auto mt-8 flex h-52 w-52 items-center justify-center sm:mt-10 sm:h-60 sm:w-60 lg:mt-12 lg:h-64 lg:w-64">
          <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90 scale-105 sm:scale-110">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="12" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="20 251.2" stroke-dashoffset="-201" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="12" stroke-dasharray="62.8 251.2" stroke-dashoffset="-138.2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" stroke-width="12" stroke-dasharray="100.5 251.2" stroke-dashoffset="0" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p class="text-3xl font-bold leading-none tracking-tight text-slate-800 sm:text-4xl">
              1,204
            </p>
            <p class="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-[10px]">
              Units
            </p>
          </div>
        </div>

        <div class="mt-8 space-y-4 sm:mt-10 sm:space-y-5 lg:mt-12">
          <div v-for="category in categories" :key="category.name" class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: category.color }" />
              <span class="text-xs font-bold text-slate-600 sm:text-sm">{{ category.name }}</span>
            </div>
            <span class="text-xs font-black text-slate-700 sm:text-sm">{{ category.share }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8">
      <section class="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div class="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6 lg:px-10 lg:py-8">
          <h2 class="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            Recent Transactions
          </h2>
          <button class="text-xs font-bold text-slate-700 transition hover:underline sm:text-sm">
            View all
          </button>
        </div>

        <div class="overflow-x-auto lg:overflow-visible">
          <table class="w-full border-separate border-spacing-0">
            <thead class="bg-slate-50/50 text-left text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 sm:text-[10px] sm:tracking-[0.2em]">
              <tr>
                <th class="px-5 py-4 sm:px-8 lg:px-10 lg:py-5">Type</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">Reference</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">Amount</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">Date</th>
                <th class="px-5 py-4 text-center sm:px-8 lg:px-10 lg:py-5">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="row in transactions" :key="row.reference" class="group transition-colors hover:bg-slate-50/30">
                <td class="px-5 py-4 text-xs font-bold text-slate-600 sm:px-8 sm:py-5 sm:text-sm lg:px-10 lg:py-6 lg:text-base">
                  {{ row.type }}
                </td>
                <td class="px-4 py-4 text-xs font-medium text-slate-500 sm:px-6 sm:py-5 sm:text-sm lg:py-6">
                  {{ row.reference }}
                </td>
                <td
                  class="px-4 py-4 text-xs font-black sm:px-6 sm:py-5 sm:text-sm lg:py-6 lg:text-base"
                  :class="row.amount.startsWith('-') ? 'text-red-500' : 'text-slate-700'"
                >
                  {{ row.amount }}
                </td>
                <td class="px-4 py-4 text-xs font-medium text-slate-500 sm:px-6 sm:py-5 sm:text-sm lg:py-6">
                  {{ row.date }}
                </td>
                <td class="px-5 py-4 text-center sm:px-8 sm:py-5 lg:px-10 lg:py-6">
                  <span
                    class="inline-block rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest sm:px-4 sm:py-1.5 sm:text-[10px] lg:px-5"
                    :class="row.statusClass"
                  >
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-6 xl:p-8">
        <div class="mb-6 sm:mb-8">
          <h2 class="text-center text-xl font-semibold tracking-tight text-slate-700 sm:text-2xl">
            Low Stock Products
          </h2>
          <p class="mt-1 text-center text-xs font-medium text-slate-500 sm:text-sm">
            Requires immediate attention
          </p>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <div
            v-for="item in alerts"
            :key="item.name"
            class="flex flex-wrap items-center gap-3 rounded-4xl border border-transparent p-3 transition-all hover:border-slate-100 hover:bg-slate-50/50 sm:flex-nowrap sm:gap-4 lg:gap-3 xl:gap-5"
          >
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 shadow-sm sm:h-16 sm:w-16 lg:h-18 lg:w-18">
              <UIcon :name="item.icon" class="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-bold text-slate-700 sm:text-base">
                {{ item.name }}
              </p>
              <p :class="['mt-1 text-xs font-bold sm:text-sm', item.leftClass]">
                {{ item.left }}
              </p>
            </div>
            <button class="w-full rounded-full bg-slate-800 px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest text-white shadow-sm transition hover:scale-105 active:scale-95 sm:w-auto sm:px-5 sm:py-2.5 sm:text-[0.75rem]">
              Reorder
            </button>
          </div>
        </div>

        <button class="mt-6 w-full rounded-2xl border border-slate-200 py-4 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 active:scale-[0.98] sm:mt-8 sm:py-5 sm:text-base">
          Manage Alerts
        </button>
      </section>
    </div>
  </section>
</template>
