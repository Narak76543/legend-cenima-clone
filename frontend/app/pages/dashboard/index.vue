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
  <section class="space-y-8 pb-10">
    <div class="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
      <article
        v-for="card in summaryCards"
        :key="card.title"
        class="group rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md"
      >
        <div class="flex items-start justify-between">
          <div
            :class="[
              'flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm',
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
                'flex items-center justify-end gap-1 text-base font-bold',
                card.deltaTrend === 'up' && card.color !== 'amber' ? 'text-emerald-600' :
                card.deltaTrend === 'down' ? 'text-red-500' : 'text-amber-500'
              ]"
            >
              <UIcon
                v-if="card.deltaTrend === 'up'"
                name="i-lucide-trending-up"
                class="h-4 w-4"
              />
              <UIcon
                v-else
                name="i-lucide-trending-down"
                class="h-4 w-4"
              />
              {{ card.delta }}
            </div>
            <p class="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {{ card.deltaLabel }}
            </p>
          </div>
        </div>

        <p class="mt-8 text-[1.05rem] font-medium text-slate-500">
          {{ card.title }}
        </p>
        <div class="mt-2 flex items-end justify-between gap-4">
          <p class="text-[2.25rem] font-bold tracking-tight text-slate-950">
            {{ card.value }}
          </p>
          <!-- Mini Sparkline -->
          <div class="pb-2">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
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

    <div class="grid gap-8 2xl:grid-cols-[1fr_420px]">
      <!-- Sales vs Purchases -->
      <section class="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-sm">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 class="text-[1.75rem] font-bold tracking-tight text-slate-950">
              Sales vs Purchases
            </h2>
            <p class="mt-1 text-base font-medium text-slate-400">
              Weekly analytical comparison
            </p>
          </div>

          <div class="flex items-center gap-8 text-[0.95rem] font-bold text-slate-700">
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-950" />
              Sales
            </div>
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-200" />
              Purchases
            </div>
          </div>
        </div>

        <div class="mt-12">
          <svg viewBox="0 0 800 320" class="h-[320px] w-full overflow-visible">
            <!-- Grid Lines -->
            <g class="stroke-slate-100 opacity-50" stroke-width="1" stroke-dasharray="4 4">
              <line x1="0" y1="80" x2="800" y2="80" />
              <line x1="0" y1="160" x2="800" y2="160" />
              <line x1="0" y1="240" x2="800" y2="240" />
            </g>

            <!-- Sales Line (Curved) -->
            <path
              d="M0 240 Q 100 200, 150 210 T 250 180 T 350 250 T 450 150 T 550 120 T 650 200 T 800 100"
              fill="none"
              stroke="#0f172a"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- Purchases Line (Dashed Curved) -->
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

          <div class="mt-8 grid grid-cols-7 text-center text-sm font-bold tracking-wider text-slate-400">
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

      <!-- Stock by Category -->
      <section class="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-sm">
        <h2 class="text-[1.75rem] font-bold tracking-tight text-slate-950">
          Stock by Category
        </h2>
        <p class="mt-1 text-base font-medium text-slate-400">
          Distribution of products
        </p>

        <div class="relative mx-auto mt-12 flex h-64 w-64 items-center justify-center">
          <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90 scale-110">
            <!-- Simplified Donut with SVG stroke-dasharray -->
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="12" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="20 251.2" stroke-dashoffset="-201" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="12" stroke-dasharray="62.8 251.2" stroke-dashoffset="-138.2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" stroke-width="12" stroke-dasharray="100.5 251.2" stroke-dashoffset="0" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p class="text-[2.75rem] font-bold tracking-tight text-slate-950 leading-none">
              1,204
            </p>
            <p class="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Units
            </p>
          </div>
        </div>

        <div class="mt-12 space-y-5">
          <div
            v-for="category in categories"
            :key="category.name"
            class="flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: category.color }" />
              <span class="text-base font-bold text-slate-500">{{ category.name }}</span>
            </div>
            <span class="text-base font-black text-slate-900">{{ category.share }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="grid gap-8 2xl:grid-cols-[1fr_420px]">
      <!-- Recent Transactions -->
      <section class="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-sm">
        <div class="flex items-center justify-between px-10 py-8">
          <h2 class="text-[1.75rem] font-bold tracking-tight text-slate-950">
            Recent Transactions
          </h2>
          <button class="text-base font-bold text-slate-900 transition hover:underline">
            View all
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-separate border-spacing-0">
            <thead class="bg-slate-50/50 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th class="px-10 py-5">Type</th>
                <th class="px-6 py-5">Reference</th>
                <th class="px-6 py-5">Amount</th>
                <th class="px-6 py-5">Date</th>
                <th class="px-10 py-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr
                v-for="row in transactions"
                :key="row.reference"
                class="group transition-colors hover:bg-slate-50/30"
              >
                <td class="px-10 py-6 text-[1.05rem] font-bold text-slate-700">
                  {{ row.type }}
                </td>
                <td class="px-6 py-6 text-base font-medium text-slate-400">
                  {{ row.reference }}
                </td>
                <td
                  class="px-6 py-6 text-[1.05rem] font-black"
                  :class="row.amount.startsWith('-') ? 'text-red-500' : 'text-slate-950'"
                >
                  {{ row.amount }}
                </td>
                <td class="px-6 py-6 text-base font-medium text-slate-400">
                  {{ row.date }}
                </td>
                <td class="px-10 py-6 text-center">
                  <span
                    class="inline-block rounded-full border px-5 py-1.5 text-[11px] font-bold uppercase tracking-widest"
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

      <!-- Low Stock Products -->
      <section class="rounded-[3rem] border border-slate-100 bg-white p-8 shadow-sm">
        <div class="mb-8">
          <h2 class="text-[1.75rem] font-bold tracking-tight text-slate-950 text-center">
            Low Stock Products
          </h2>
          <p class="mt-1 text-base font-medium text-slate-400 text-center">
            Requires immediate attention
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="item in alerts"
            :key="item.name"
            class="flex items-center gap-5 rounded-[2rem] border border-transparent p-3 transition-all hover:border-slate-100 hover:bg-slate-50/50"
          >
            <div class="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-500 shadow-sm">
              <UIcon :name="item.icon" class="h-7 w-7" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-[1.1rem] font-bold text-slate-900">
                {{ item.name }}
              </p>
              <p :class="['mt-1 text-[0.95rem] font-bold', item.leftClass]">
                {{ item.left }}
              </p>
            </div>
            <button class="rounded-full bg-slate-950 px-5 py-2.5 text-[0.8rem] font-black uppercase tracking-widest text-white shadow-sm transition hover:scale-105 active:scale-95">
              Reorder
            </button>
          </div>
        </div>

        <button class="mt-8 w-full rounded-2xl border border-slate-100 py-5 text-lg font-bold text-slate-400 transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]">
          Manage Alerts
        </button>
      </section>
    </div>
  </section>
</template>

