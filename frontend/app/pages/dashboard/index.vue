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

type StatusTone = "success" | "warning" | "info" | "danger"
type CategorySlice = {
  name: string
  color: string
  share: string
  units: number
  dashArray: string
  dashOffset: string
}

const { isDark } = useThemeMode()
const { t } = useAppLanguage()
const { categories: categoryItems, fetchCategories } = useCategories()
const { fetchProducts, products } = useProducts()
const {
  amountTextClass,
  donutValueStyle,
  mutedSurfaceStyle,
  mutedTextStyle,
  statusToneClass,
  summaryDeltaClass,
  summaryIconClass,
  summaryValueStyle,
  surfaceStyle,
  textStyle,
  ui,
} = useDashboardStyles()
const chartAnimated = ref(false)
const categoryPalette = ["#111c4e", "#5b7cff", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"]

const lowStockProducts = computed(() =>
  products.value
    .filter((product) => product.stock_qty <= product.low_stock_threshold)
    .sort((left, right) => left.stock_qty - right.stock_qty),
)

const summaryCards = computed<SummaryCard[]>(() => [
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
    value: lowStockProducts.value.length.toString(),
    delta: `${lowStockProducts.value.length} items`,
    deltaLabel: "Below threshold",
    deltaTrend: "up",
    icon: "i-lucide-triangle-alert",
    color: "amber",
    chartColor: "#f59e0b",
  },
])

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
  if (points.length === 1) return `M ${points[0]!.x} ${points[0]!.y}`

  let path = `M ${points[0]!.x} ${points[0]!.y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]!
    const next = points[index + 1]!
    const controlX = (current.x + next.x) / 2

    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`
  }

  return path
}

const toAreaPath = (points: ChartPoint[]) => {
  if (!points.length) return ""

  const baseY = chartHeight - chartPadding.bottom
  const linePath = toSmoothPath(points)
  const first = points[0]!
  const last = points[points.length - 1]!

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
  Promise.allSettled([
    fetchCategories(),
    fetchProducts(),
  ]).finally(() => {
    requestAnimationFrame(() => {
      chartAnimated.value = true
    })
  })
})

const donutRadius = 40
const donutCircumference = 2 * Math.PI * donutRadius

const stockByCategory = computed<CategorySlice[]>(() => {
  const stockMap = new Map<string, number>()

  for (const product of products.value) {
    const nextQty = Math.max(0, product.stock_qty || 0)
    stockMap.set(product.category_id, (stockMap.get(product.category_id) || 0) + nextQty)
  }

  const categoryRows = categoryItems.value.map((category) => ({
    id: category.id,
    name: category.name,
    units: stockMap.get(category.id) || 0,
  }))

  const uncategorizedUnits = Array.from(stockMap.entries())
    .filter(([categoryId]) => !categoryItems.value.some((item) => item.id === categoryId))
    .reduce((sum, [, units]) => sum + units, 0)

  const rows = [
    ...categoryRows,
    ...(uncategorizedUnits > 0
      ? [{
          id: "uncategorized",
          name: "Uncategorized",
          units: uncategorizedUnits,
        }]
      : []),
  ]
    .sort((left, right) => right.units - left.units)

  const totalUnits = rows.reduce((sum, row) => sum + row.units, 0)
  let offset = 0

  return rows.map((row, index) => {
    const ratio = totalUnits ? row.units / totalUnits : 0
    const segment = ratio * donutCircumference
    const currentOffset = offset
    if (row.units > 0) {
      offset += segment
    }

    return {
      name: row.name,
      color: categoryPalette[index % categoryPalette.length]!,
      share: `${Math.round(ratio * 100)}%`,
      units: row.units,
      dashArray: `${segment.toFixed(1)} ${(donutCircumference - segment).toFixed(1)}`,
      dashOffset: `${(-currentOffset).toFixed(1)}`,
    }
  })
})

const donutSlices = computed(() =>
  stockByCategory.value.filter((category) => category.units > 0),
)

const visibleStockByCategory = computed(() => {
  const nonZeroCategories = stockByCategory.value.filter((category) => category.units > 0)

  if (!nonZeroCategories.length) {
    return stockByCategory.value.slice(0, 1)
  }

  return nonZeroCategories.slice(0, 4)
})

const totalStockUnits = computed(() =>
  products.value.reduce((sum, product) => sum + Math.max(0, product.stock_qty || 0), 0),
)

const transactions = [
  { type: "Sales", reference: "INV-2024-001", amount: "$1,240.00", date: "Oct 24, 2024", status: "COMPLETED", statusTone: "success" as StatusTone },
  { type: "Purchase", reference: "PO-2024-882", amount: "$850.00", date: "Oct 23, 2024", status: "PENDING", statusTone: "warning" as StatusTone },
  { type: "Sales", reference: "INV-2024-002", amount: "$3,100.00", date: "Oct 22, 2024", status: "COMPLETED", statusTone: "success" as StatusTone },
  { type: "Return", reference: "RET-004-92", amount: "-$120.00", date: "Oct 22, 2024", status: "RETURNED", statusTone: "info" as StatusTone },
]

const alerts = computed(() =>
  lowStockProducts.value.slice(0, 4).map((product) => ({
    name: product.name,
    left: product.stock_qty <= 0 ? "Out of stock" : `Only ${product.stock_qty} left`,
    leftTone: (product.stock_qty <= 0 ? "danger" : product.stock_qty <= 3 ? "danger" : "warning") as StatusTone,
    icon: "i-lucide-package-2",
  })),
)
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
        <div :class="ui.summaryHeader">
          <div :class="[ui.summaryIconBase, summaryIconClass(card.color)]">
            <UIcon :name="card.icon" class="h-7 w-7" />
          </div>
          <div class="text-right">
            <div :class="[ui.summaryDeltaBase, summaryDeltaClass(card.deltaTrend, card.color)]">
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
        <div :class="ui.summaryValueRow">
          <p :class="ui.summaryValue" :style="summaryValueStyle(card.color)">
            {{ card.value }}
          </p>
          <div :class="ui.summarySparklineWrap">
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
            <div :class="ui.legendItem">
              <span class="h-3 w-3 rounded-full bg-slate-700" />
              {{ t("dashboard.sales") }}
            </div>
            <div :class="ui.legendItem">
              <span class="h-3 w-3 rounded-full bg-slate-200" />
              {{ t("dashboard.purchases") }}
            </div>
          </div>
        </div>

        <div :class="ui.chartWrap">
          <svg
            :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
            :class="ui.chartSvg"
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
                  transition: `opacity 240ms ease ${420 + (index as number* 70)}ms, transform 240ms ease ${420 + (index as number* 70)}ms`,
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
                  transition: `opacity 220ms ease ${520 + (index as number * 65)}ms, transform 220ms ease ${520 + (index as number* 65)}ms`,
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
          <svg viewBox="0 0 100 100" :class="ui.donutChart">
            <circle
              cx="50"
              cy="50"
              :r="donutRadius"
              fill="none"
              :stroke="isDark ? 'rgba(51,65,85,0.5)' : 'rgba(226,232,240,0.9)'"
              stroke-width="12"
            />
            <circle
              v-for="category in donutSlices"
              :key="category.name"
              cx="50"
              cy="50"
              :r="donutRadius"
              fill="none"
              :stroke="category.color"
              stroke-width="12"
              :stroke-dasharray="category.dashArray"
              :stroke-dashoffset="category.dashOffset"
              stroke-linecap="round"
            />
          </svg>
          <div :class="ui.donutCenter">
            <p :class="ui.donutValue" :style="donutValueStyle">{{ totalStockUnits.toLocaleString() }}</p>
            <p :class="ui.donutLabel" :style="mutedTextStyle">{{ t("dashboard.units") }}</p>
          </div>
        </div>

        <div :class="ui.categoryList">
          <div v-for="category in visibleStockByCategory" :key="category.name" :class="ui.categoryRow">
            <div :class="ui.categoryMeta">
              <span :class="ui.categoryDot" :style="{ backgroundColor: category.color, boxShadow: `0 0 0 4px ${category.color}18` }" />
              <span :class="ui.categoryName" :style="mutedTextStyle">{{ category.name }}</span>
            </div>
            <span :class="ui.categoryShare" :style="textStyle">{{ category.share }}</span>
          </div>
          <div v-if="!visibleStockByCategory.length" :class="ui.categoryRow">
            <span :class="ui.categoryName" :style="mutedTextStyle">No stock data yet.</span>
            <span :class="ui.categoryShare" :style="textStyle">0%</span>
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

        <div :class="ui.tableScroller">
          <table :class="ui.table">
            <thead :class="ui.tableHead" :style="{ ...mutedSurfaceStyle, ...mutedTextStyle }">
              <tr>
                <th :class="ui.tableHeadPrimaryCell">{{ t("dashboard.type") }}</th>
                <th :class="ui.tableHeadCell">{{ t("dashboard.reference") }}</th>
                <th :class="ui.tableHeadCell">{{ t("dashboard.amount") }}</th>
                <th :class="ui.tableHeadCell">{{ t("dashboard.date") }}</th>
                <th :class="ui.tableHeadStatusCell">{{ t("dashboard.status") }}</th>
              </tr>
            </thead>
            <tbody :class="ui.tableBody">
              <tr v-for="row in transactions" :key="row.reference" :class="ui.tableRow">
                <td :class="ui.tableTypeCell" :style="textStyle">{{ row.type }}</td>
                <td :class="ui.tableCell" :style="{ color: 'var(--app-fg-muted)' }">{{ row.reference }}</td>
                <td :class="[ui.tableAmountCell, amountTextClass(row.amount)]">
                  {{ row.amount }}
                </td>
                <td :class="ui.tableCell" :style="{ color: 'var(--app-fg-muted)' }">{{ row.date }}</td>
                <td :class="ui.tableStatusCell">
                  <span :class="[ui.tableStatus, statusToneClass(row.statusTone)]">
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
            <div :class="ui.alertsContent">
              <p :class="ui.alertsName" :style="textStyle">{{ item.name }}</p>
              <p :class="[ui.alertsCount, statusToneClass(item.leftTone)]">{{ item.left }}</p>
              <button :class="[ui.alertsMobileButton, ui.alertsButton]">{{ t("dashboard.reorder") }}</button>
            </div>
            <button :class="[ui.alertsDesktopButton, ui.alertsButton]">{{ t("dashboard.reorder") }}</button>
          </div>
        </div>

        <button :class="ui.alertsFooterButton" :style="{ ...surfaceStyle, ...mutedTextStyle }">{{ t("dashboard.manageAlerts") }}</button>
      </section>
    </div>
  </section>
</template>
