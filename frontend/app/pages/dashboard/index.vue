<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

type SummaryCard = {
  title: string
  value: string
  delta: string
  deltaLabel: string
  deltaTrend: "up" | "down"
  icon: string
  color: "emerald" | "blue" | "slate" | "amber"
  chartColor: string
}

type ChartPoint = {
  x: number
  y: number
}

const surfaceStyle = {
  backgroundColor: "var(--app-surface)",
  borderColor: "var(--app-border)",
}

const mutedSurfaceStyle = {
  backgroundColor: "var(--app-surface-muted)",
}

const textStyle = {
  color: "var(--app-fg)",
}

const mutedTextStyle = {
  color: "var(--app-fg-muted)",
}
const { isDark } = useThemeMode()
const { t } = useAppLanguage()
const chartAnimated = ref(false)

const ui = {
  page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
  summaryGrid: "grid gap-2 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6",
  summaryCard: "group rounded-[15px] border p-4 shadow-sm transition-all hover:shadow-md sm:p-5",
  summaryIconBase: "flex h-10 w-10 items-center justify-center rounded-full shadow-sm sm:h-14 sm:w-14",
  summaryDeltaBase: "flex items-center justify-end gap-1 text-sm font-bold sm:text-base",
  summaryDeltaLabel: "mt-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px]",
  summaryTitle: "mt-6 text-[12px] font-medium sm:mt-8 sm:text-sm",
  summaryValue: "text-xl font-bold tracking-tight sm:text-2xl",
  summarySparkline: "h-5 w-12 sm:h-6 sm:w-[60px]",
  panelGrid: "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-8",
  panel: "rounded-xl border p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10",
  compactPanel: "rounded-xl border p-5 shadow-sm sm:p-6 lg:p-6 xl:p-8",
  panelHeader: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  panelTitle: "text-xl font-bold tracking-tight sm:text-2xl",
  panelSubtitle: "mt-1 text-xs font-medium sm:text-sm",
  legend: "flex flex-wrap items-center gap-4 text-xs font-bold sm:gap-8 sm:text-sm",
  donutWrap: "relative mx-auto mt-8 flex h-52 w-52 items-center justify-center sm:mt-10 sm:h-60 sm:w-60 lg:mt-12 lg:h-64 lg:w-64",
  donutValue: "text-3xl font-bold leading-none tracking-tight sm:text-4xl",
  donutLabel: "mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] sm:text-[10px]",
  categoryRow: "flex items-center justify-between gap-4",
  categoryName: "text-xs font-medium sm:text-sm",
  categoryShare: "text-xs font-semibold sm:text-sm",
  tablePanel: "overflow-hidden rounded-xl border shadow-sm",
  tableHeader: "flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6 lg:px-10 lg:py-8",
  tableTitle: "text-xl font-semibold tracking-tight sm:text-2xl",
  tableAction: "text-xs font-medium transition hover:underline sm:text-sm",
  tableHead: "text-left text-[9px] font-semibold uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]",
  tableTypeCell: "px-5 py-4 text-xs font-semibold sm:px-8 sm:py-5 sm:text-sm lg:px-10 lg:py-6 lg:text-base",
  tableCell: "px-4 py-4 text-xs font-normal sm:px-6 sm:py-5 sm:text-sm lg:py-6",
  tableAmountCell: "px-4 py-4 text-xs font-semibold sm:px-6 sm:py-5 sm:text-sm lg:py-6 lg:text-base",
  tableStatus: "inline-flex min-w-[6.5rem] items-center justify-center rounded-[5px] border px-3 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.14em] sm:min-w-[7rem] sm:px-4 sm:py-1.5 sm:text-[10px]",
  alertsHeader: "mb-6 sm:mb-8",
  alertsTitle: "text-center text-xl font-semibold tracking-tight sm:text-2xl",
  alertsSubtitle: "mt-1 text-center text-xs font-medium sm:text-sm",
  alertsList: "space-y-3 sm:space-y-4",
  alertsItem: "grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-2.5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-4",
  alertsIconWrap: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 shadow-sm sm:h-14 sm:w-14",
  alertsName: "text-sm font-semibold leading-5 sm:text-[0.95rem]",
  alertsCount: "mt-1 inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-semibold leading-none whitespace-nowrap",
  alertsButton: "inline-flex h-9 items-center justify-center rounded-[10px] bg-slate-800 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-slate-700 active:scale-95 sm:h-10 sm:px-3.5",
  alertsFooterButton: "mt-6 w-full rounded-2xl border py-4 text-sm font-medium transition hover:opacity-90 active:scale-[0.98] sm:mt-8 sm:py-5 sm:text-base",
} as const

const summaryIconClassByColor: Record<SummaryCard["color"], string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  slate: "bg-slate-50 text-slate-600",
  amber: "bg-amber-50 text-amber-600",
}

const summaryValueStyleByColor: Record<SummaryCard["color"], Record<string, string>> = {
  emerald: {
    backgroundImage: "linear-gradient(135deg, #059669 0%, #10b981 55%, #34d399 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 8px 18px rgba(16, 185, 129, 0.18)",
  },
  blue: {
    backgroundImage: "linear-gradient(135deg, #2563eb 0%, #3b82f6 55%, #60a5fa 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 8px 18px rgba(59, 130, 246, 0.18)",
  },
  slate: {
    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #334155 55%, #64748b 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 8px 18px rgba(71, 85, 105, 0.16)",
  },
  amber: {
    backgroundImage: "linear-gradient(135deg, #d97706 0%, #f59e0b 55%, #fbbf24 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    textShadow: "0 8px 18px rgba(245, 158, 11, 0.16)",
  },
}

const summaryCards: SummaryCard[] = [
  {
    title: "dashboard.totalSalesToday",
    value: "$12,450",
    delta: "12.5%",
    deltaLabel: "dashboard.vsYesterday",
    deltaTrend: "up",
    icon: "i-lucide-banknote",
    color: "emerald",
    chartColor: "#10b981",
  },
  {
    title: "dashboard.totalPurchasesToday",
    value: "$8,200",
    delta: "2.4%",
    deltaLabel: "dashboard.vsYesterday",
    deltaTrend: "down",
    icon: "i-lucide-shopping-cart",
    color: "blue",
    chartColor: "#3b82f6",
  },
  {
    title: "dashboard.netProfitToday",
    value: "$4,250",
    delta: "5.1%",
    deltaLabel: "dashboard.vsYesterday",
    deltaTrend: "up",
    icon: "i-lucide-wallet",
    color: "slate",
    chartColor: "#64748b",
  },
  {
    title: "dashboard.lowStockAlerts",
    value: "12",
    delta: "+2 items",
    deltaLabel: "dashboard.since8am",
    deltaTrend: "up",
    icon: "i-lucide-triangle-alert",
    color: "amber",
    chartColor: "#f59e0b",
  },
]

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const chartWidth = 900
const chartHeight = 300
const chartPadding = {
  top: 22,
  right: 22,
  bottom: 42,
  left: 48,
}
const salesSeries = [62, 78, 84, 46, 138, 92, 116]
const purchaseSeries = [52, 58, 66, 44, 96, 38, 88]
const chartPeak = Math.max(...salesSeries, ...purchaseSeries)
const chartMaxValue = Math.ceil((chartPeak + 20) / 10) * 10
const yAxisTicks = [0, 40, 80, 120, 160].filter((tick) => tick <= chartMaxValue)
const chartInnerWidth = chartWidth - chartPadding.left - chartPadding.right
const chartInnerHeight = chartHeight - chartPadding.top - chartPadding.bottom

const xForIndex = (index: number) =>
  chartPadding.left + (index * chartInnerWidth) / (weekdayLabels.length - 1)

const yForValue = (value: number) =>
  chartPadding.top + chartInnerHeight - (value / chartMaxValue) * chartInnerHeight

const chartPoints = (values: number[]): ChartPoint[] =>
  values.map((value, index) => ({
    x: xForIndex(index),
    y: yForValue(value),
  }))

const toSmoothPath = (points: ChartPoint[]) => {
  if (!points.length) return ""
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]
    const next = points[index + 1]
    const controlX = (current.x + next.x) / 2

    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`
  }

  return path
}

const toAreaPath = (points: ChartPoint[]) => {
  if (!points.length) return ""

  const baseY = chartHeight - chartPadding.bottom
  const linePath = toSmoothPath(points)
  const first = points[0]
  const last = points[points.length - 1]

  return `${linePath} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`
}

const salesPoints = chartPoints(salesSeries)
const purchasePoints = chartPoints(purchaseSeries)
const salesPath = toSmoothPath(salesPoints)
const purchasePath = toSmoothPath(purchasePoints)
const salesAreaPath = toAreaPath(salesPoints)
const purchaseAreaPath = toAreaPath(purchasePoints)
const chartGridStroke = computed(() => (isDark.value ? "rgba(226,232,240,0.45)" : "rgba(148,163,184,0.32)"))

onMounted(() => {
  requestAnimationFrame(() => {
    chartAnimated.value = true
  })
})

const categories = [
  { name: "Electronics", color: "#111c4e", share: "40%" },
  { name: "Office Supplies", color: "#5b7cff", share: "25%" },
  { name: "Hardware", color: "#14b8a6", share: "15%" },
  { name: "Furniture", color: "#f59e0b", share: "20%" },
]

const donutValueStyle = {
  backgroundImage: "linear-gradient(135deg, #111c4e 0%, #3559f6 55%, #14b8a6 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 10px 24px rgba(37, 99, 235, 0.16)",
}

const transactions = [
  { type: "Sales", reference: "INV-2024-001", amount: "$1,240.00", date: "Oct 24, 2024", status: "COMPLETED", statusClass: "border-teal-200 bg-teal-50/80 text-teal-700" },
  { type: "Purchase", reference: "PO-2024-882", amount: "$850.00", date: "Oct 23, 2024", status: "PENDING", statusClass: "border-amber-200 bg-amber-50/80 text-amber-700" },
  { type: "Sales", reference: "INV-2024-002", amount: "$3,100.00", date: "Oct 22, 2024", status: "COMPLETED", statusClass: "border-teal-200 bg-teal-50/80 text-teal-700" },
  { type: "Return", reference: "RET-004-92", amount: "-$120.00", date: "Oct 22, 2024", status: "RETURNED", statusClass: "border-violet-200 bg-violet-50/80 text-violet-700" },
]

const alerts = [
  { name: "Logitech MX Master 3S", left: "Only 2 left", leftClass: "border-rose-200 bg-rose-50/80 text-rose-700", icon: "i-lucide-mouse" },
  { name: "HP LaserJet Pro", left: "Only 5 left", leftClass: "border-rose-200 bg-rose-50/80 text-rose-700", icon: "i-lucide-printer" },
  { name: "USB-C Hub", left: "Only 12 left", leftClass: "border-amber-200 bg-amber-50/80 text-amber-700", icon: "i-lucide-usb" },
  { name: "Sony WH-1000XM5", left: "Only 3 left", leftClass: "border-rose-200 bg-rose-50/80 text-rose-700", icon: "i-lucide-headphones" },
]

const amountTextClass = (amount: string) =>
  amount.startsWith("-") ? "text-red-500" : "text-slate-700"

const summaryDeltaClass = (card: SummaryCard) => {
  if (card.deltaTrend === "down") return "text-red-500"
  if (card.color === "amber") return "text-amber-500"
  return "text-emerald-600"
}
</script>

<template>
  <section :class="ui.page">
    <div :class="ui.summaryGrid">
      <article
        v-for="card in summaryCards"
        :key="card.title"
        :class="ui.summaryCard"
        :style="surfaceStyle"
      >
        <div class="flex items-start justify-between">
          <div :class="[ui.summaryIconBase, summaryIconClassByColor[card.color]]">
            <UIcon :name="card.icon" class="h-7 w-7" />
          </div>
          <div class="text-right">
            <div :class="[ui.summaryDeltaBase, summaryDeltaClass(card)]">
              <UIcon v-if="card.deltaTrend === 'up'" name="i-lucide-trending-up" class="h-4 w-4" />
              <UIcon v-else name="i-lucide-trending-down" class="h-4 w-4" />
              {{ card.delta }}
            </div>
            <p :class="ui.summaryDeltaLabel" :style="mutedTextStyle">
              {{ t(card.deltaLabel) }}
            </p>
          </div>
        </div>

        <p :class="ui.summaryTitle" :style="mutedTextStyle">
          {{ t(card.title) }}
        </p>
        <div class="mt-2 flex items-end justify-between gap-3 sm:gap-4">
          <p :class="ui.summaryValue" :style="summaryValueStyleByColor[card.color]">
            {{ card.value }}
          </p>
          <div class="pb-1 sm:pb-2">
            <svg :class="ui.summarySparkline" viewBox="0 0 60 24" fill="none">
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

    <div :class="ui.panelGrid">
      <section :class="ui.panel" :style="surfaceStyle">
        <div :class="ui.panelHeader">
          <div>
            <h2 :class="ui.panelTitle" :style="textStyle">{{ t("dashboard.salesVsPurchases") }}</h2>
            <p :class="ui.panelSubtitle" :style="mutedTextStyle">{{ t("dashboard.weeklyComparison") }}</p>
          </div>

          <div :class="ui.legend" :style="mutedTextStyle">
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-700" />
              {{ t("dashboard.sales") }}
            </div>
            <div class="flex items-center gap-3">
              <span class="h-3 w-3 rounded-full bg-slate-200" />
              {{ t("dashboard.purchases") }}
            </div>
          </div>
        </div>

        <div class="mt-8 sm:mt-12">
          <svg
            :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
            class="aspect-[16/6] w-full overflow-visible"
            style="font-family: Poppins, sans-serif;"
          >
            <defs>
              <linearGradient id="salesAreaFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#5b7cff" stop-opacity="0.24" />
                <stop offset="65%" stop-color="#5b7cff" stop-opacity="0.08" />
                <stop offset="100%" stop-color="#5b7cff" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="purchaseAreaFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.12" />
                <stop offset="70%" stop-color="#cbd5e1" stop-opacity="0.04" />
                <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0" />
              </linearGradient>
            </defs>

            <rect
              :x="chartPadding.left"
              :y="chartPadding.top"
              :width="chartInnerWidth"
              :height="chartInnerHeight"
              rx="16"
              fill="rgba(255,255,255,0.02)"
            />

            <g :stroke="chartGridStroke" stroke-width="1">
              <line
                v-for="tick in yAxisTicks"
                :key="tick"
                :x1="chartPadding.left"
                :y1="yForValue(tick)"
                :x2="chartWidth - chartPadding.right"
                :y2="yForValue(tick)"
                stroke-dasharray="4 6"
              />
            </g>

            <g>
              <text
                v-for="tick in yAxisTicks"
                :key="`label-${tick}`"
                :x="chartPadding.left - 2"
                :y="yForValue(tick) - 8"
                text-anchor="start"
                fill="#94a3b8"
                font-size="11"
                font-weight="500"
              >
                {{ tick }}
              </text>
            </g>

            <g>
              <text
                v-for="(day, index) in weekdayLabels"
                :key="`day-${day}`"
                :x="xForIndex(index)"
                :y="chartHeight - 8"
                text-anchor="middle"
                fill="#64748b"
                font-size="11"
                font-weight="600"
              >
                {{ day }}
              </text>
            </g>

            <path
              :d="purchaseAreaPath"
              fill="url(#purchaseAreaFill)"
              :style="{
                opacity: chartAnimated ? 1 : 0,
                transition: 'opacity 700ms ease 180ms',
              }"
            />

            <path
              :d="salesAreaPath"
              fill="url(#salesAreaFill)"
              :style="{
                opacity: chartAnimated ? 1 : 0,
                transition: 'opacity 700ms ease 120ms',
              }"
            />

            <path
              :d="purchasePath"
              pathLength="100"
              fill="none"
              stroke="#cbd5e1"
              stroke-width="3.5"
              stroke-dasharray="7 7"
              stroke-linecap="round"
              stroke-linejoin="round"
              :style="{
                opacity: chartAnimated ? 1 : 0.35,
                strokeDasharray: '100',
                strokeDashoffset: chartAnimated ? 0 : 100,
                transition: 'stroke-dashoffset 1100ms ease, opacity 700ms ease',
              }"
            />

            <path
              :d="salesPath"
              pathLength="100"
              fill="none"
              stroke="#2e1065"
              stroke-width="4.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :style="{
                opacity: chartAnimated ? 1 : 0.45,
                strokeDasharray: '100',
                strokeDashoffset: chartAnimated ? 0 : 100,
                transition: 'stroke-dashoffset 1000ms ease, opacity 700ms ease',
              }"
            />

            <g>
              <circle
                v-for="(point, index) in salesPoints"
                :key="`sales-${index}`"
                :cx="point.x"
                :cy="point.y"
                r="4"
                fill="#ffffff"
                stroke="#2e1065"
                stroke-width="2.5"
                :style="{
                  opacity: chartAnimated ? 1 : 0,
                  transform: chartAnimated ? 'scale(1)' : 'scale(0.65)',
                  transformOrigin: `${point.x}px ${point.y}px`,
                  transition: `opacity 240ms ease ${420 + (index * 70)}ms, transform 240ms ease ${420 + (index * 70)}ms`,
                }"
              />
              <circle
                v-for="(point, index) in purchasePoints"
                :key="`purchase-${index}`"
                :cx="point.x"
                :cy="point.y"
                r="3.5"
                fill="#ffffff"
                stroke="#cbd5e1"
                stroke-width="2"
                :style="{
                  opacity: chartAnimated ? 1 : 0,
                  transform: chartAnimated ? 'scale(1)' : 'scale(0.65)',
                  transformOrigin: `${point.x}px ${point.y}px`,
                  transition: `opacity 220ms ease ${520 + (index * 65)}ms, transform 220ms ease ${520 + (index * 65)}ms`,
                }"
              />
            </g>
          </svg>
        </div>
      </section>

      <section :class="ui.panel" :style="surfaceStyle">
        <h2 :class="ui.panelTitle" :style="textStyle">{{ t("dashboard.stockByCategory") }}</h2>
        <p :class="ui.panelSubtitle" :style="mutedTextStyle">{{ t("dashboard.distribution") }}</p>

        <div :class="ui.donutWrap">
          <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90 scale-105 sm:scale-110">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#14b8a6" stroke-width="12" stroke-dasharray="20 251.2" stroke-dashoffset="-201" stroke-linecap="round" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#5b7cff" stroke-width="12" stroke-dasharray="62.8 251.2" stroke-dashoffset="-138.2" stroke-linecap="round" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#111c4e" stroke-width="12" stroke-dasharray="100.5 251.2" stroke-dashoffset="0" stroke-linecap="round" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p :class="ui.donutValue" :style="donutValueStyle">1,204</p>
            <p :class="ui.donutLabel" :style="mutedTextStyle">{{ t("dashboard.units") }}</p>
          </div>
        </div>

        <div class="mt-8 space-y-4 sm:mt-10 sm:space-y-5 lg:mt-12">
          <div v-for="category in categories" :key="category.name" :class="ui.categoryRow">
            <div class="flex items-center gap-4">
              <span class="h-2.5 w-2.5 rounded-full shadow-sm" :style="{ backgroundColor: category.color, boxShadow: `0 0 0 4px ${category.color}18` }" />
              <span :class="ui.categoryName" :style="mutedTextStyle">{{ category.name }}</span>
            </div>
            <span :class="ui.categoryShare" :style="textStyle">{{ category.share }}</span>
          </div>
        </div>
      </section>
    </div>

    <div :class="ui.panelGrid">
      <section :class="ui.tablePanel" :style="surfaceStyle">
        <div :class="ui.tableHeader">
          <h2 :class="ui.tableTitle" :style="textStyle">{{ t("dashboard.recentTransactions") }}</h2>
          <button :class="ui.tableAction" :style="mutedTextStyle">{{ t("dashboard.viewAll") }}</button>
        </div>

        <div class="overflow-x-auto lg:overflow-visible">
          <table class="w-full border-separate border-spacing-0">
            <thead :class="ui.tableHead" :style="{ ...mutedSurfaceStyle, ...mutedTextStyle }">
              <tr>
                <th class="px-5 py-4 sm:px-8 lg:px-10 lg:py-5">{{ t("dashboard.type") }}</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">{{ t("dashboard.reference") }}</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">{{ t("dashboard.amount") }}</th>
                <th class="px-4 py-4 sm:px-6 lg:py-5">{{ t("dashboard.date") }}</th>
                <th class="px-5 py-4 text-center sm:px-8 lg:px-10 lg:py-5">{{ t("dashboard.status") }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="row in transactions" :key="row.reference" class="group transition-colors hover:bg-slate-50/30">
                <td :class="ui.tableTypeCell" :style="textStyle">{{ row.type }}</td>
                <td :class="ui.tableCell" :style="{ color: 'var(--app-fg-muted)' }">{{ row.reference }}</td>
                <td :class="[ui.tableAmountCell, amountTextClass(row.amount)]">
                  {{ row.amount }}
                </td>
                <td :class="ui.tableCell" :style="{ color: 'var(--app-fg-muted)' }">{{ row.date }}</td>
                <td class="px-5 py-4 text-center sm:px-8 sm:py-5 lg:px-10 lg:py-6">
                  <span :class="[ui.tableStatus, row.statusClass]">
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section :class="ui.compactPanel" :style="surfaceStyle">
        <div :class="ui.alertsHeader">
          <h2 :class="ui.alertsTitle" :style="textStyle">{{ t("dashboard.lowStockProducts") }}</h2>
          <p :class="ui.alertsSubtitle" :style="mutedTextStyle">{{ t("dashboard.requiresAttention") }}</p>
        </div>

        <div :class="ui.alertsList">
          <div v-for="item in alerts" :key="item.name" :class="ui.alertsItem">
            <div :class="ui.alertsIconWrap">
              <UIcon :name="item.icon" class="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div class="min-w-0 flex-1">
              <p :class="ui.alertsName" :style="textStyle">{{ item.name }}</p>
              <p :class="[ui.alertsCount, item.leftClass]">{{ item.left }}</p>
              <button class="mt-3 sm:hidden" :class="ui.alertsButton">{{ t("dashboard.reorder") }}</button>
            </div>
            <button class="hidden sm:inline-flex" :class="ui.alertsButton">{{ t("dashboard.reorder") }}</button>
          </div>
        </div>

        <button :class="ui.alertsFooterButton" :style="{ ...surfaceStyle, ...mutedTextStyle }">{{ t("dashboard.manageAlerts") }}</button>
      </section>
    </div>
  </section>
</template>
