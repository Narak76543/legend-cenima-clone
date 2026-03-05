const surfaceStyle = {
  backgroundColor: "var(--app-surface)",
  borderColor: "var(--app-border)",
} as const

const mutedSurfaceStyle = {
  backgroundColor: "var(--app-surface-muted)",
} as const

const textStyle = {
  color: "var(--app-fg)",
} as const

const mutedTextStyle = {
  color: "var(--app-fg-muted)",
} as const

const ui = {
  page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
  summaryGrid: "grid gap-2 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6",
  summaryCard: "group rounded-[15px] border p-4 shadow-sm transition-all hover:shadow-md sm:p-5",
  summaryHeader: "flex items-start justify-between",
  summaryIconBase: "flex h-10 w-10 items-center justify-center rounded-full shadow-sm sm:h-14 sm:w-14",
  summaryDeltaBase: "flex items-center justify-end gap-1 text-sm font-bold sm:text-base",
  summaryDeltaLabel: "mt-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px]",
  summaryTitle: "mt-6 text-[12px] font-medium sm:mt-8 sm:text-sm",
  summaryValueRow: "mt-2 flex items-end justify-between gap-3 sm:gap-4",
  summaryValue: "text-xl font-bold tracking-tight sm:text-2xl",
  summarySparklineWrap: "pb-1 sm:pb-2",
  summarySparkline: "h-5 w-12 sm:h-6 sm:w-[60px]",
  panelGrid: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-8",
  panel: "rounded-xl border p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10",
  compactPanel: "rounded-xl border p-5 shadow-sm sm:p-6 lg:p-6 xl:p-8",
  panelHeader: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
  panelTitle: "text-xl font-bold tracking-tight sm:text-2xl",
  panelSubtitle: "mt-1 text-xs font-medium sm:text-sm",
  legend: "flex flex-wrap items-center gap-4 text-xs font-bold sm:gap-8 sm:text-sm",
  legendItem: "flex items-center gap-3",
  chartWrap: "mt-8 sm:mt-12",
  chartSvg: "aspect-16/6 w-full overflow-visible",
  donutWrap: "relative mx-auto mt-8 flex h-52 w-52 items-center justify-center sm:mt-10 sm:h-60 sm:w-60 lg:mt-12 lg:h-64 lg:w-64",
  donutChart: "h-full w-full -rotate-90 scale-105 sm:scale-110",
  donutCenter: "absolute inset-0 flex flex-col items-center justify-center text-center",
  donutValue: "text-3xl font-bold leading-none tracking-tight sm:text-4xl",
  donutLabel: "mt-2 text-[9px] font-semibold uppercase tracking-[0.25em] sm:text-[10px]",
  categoryList: "mt-8 space-y-4 sm:mt-10 sm:space-y-5 lg:mt-12",
  categoryRow: "flex items-center justify-between gap-4",
  categoryMeta: "flex items-center gap-4",
  categoryDot: "h-2.5 w-2.5 rounded-full shadow-sm",
  categoryName: "text-xs font-medium sm:text-sm",
  categoryShare: "text-xs font-semibold sm:text-sm",
  tablePanel: "overflow-hidden rounded-xl border shadow-sm",
  tableHeader: "flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6 lg:px-10 lg:py-8",
  tableTitle: "text-xl font-semibold tracking-tight sm:text-2xl",
  tableAction: "text-xs font-medium transition hover:underline sm:text-sm",
  tableScroller: "overflow-x-auto lg:overflow-visible",
  table: "w-full border-separate border-spacing-0",
  tableHead: "text-left text-[9px] font-semibold uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]",
  tableHeadPrimaryCell: "px-5 py-4 sm:px-8 lg:px-10 lg:py-5",
  tableHeadCell: "px-4 py-4 sm:px-6 lg:py-5",
  tableHeadStatusCell: "px-5 py-4 text-center sm:px-8 lg:px-10 lg:py-5",
  tableBody: "divide-y divide-slate-100",
  tableRow: "group transition-colors hover:bg-slate-50/30",
  tableTypeCell: "px-5 py-4 text-xs font-semibold sm:px-8 sm:py-5 sm:text-sm lg:px-10 lg:py-6 lg:text-base",
  tableCell: "px-4 py-4 text-xs font-normal sm:px-6 sm:py-5 sm:text-sm lg:py-6",
  tableAmountCell: "px-4 py-4 text-xs font-semibold sm:px-6 sm:py-5 sm:text-sm lg:py-6 lg:text-base",
  tableStatusCell: "px-5 py-4 text-center sm:px-8 sm:py-5 lg:px-10 lg:py-6",
  tableStatus: "inline-flex min-w-[6.5rem] items-center justify-center rounded-[5px] border px-3 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.14em] sm:min-w-[7rem] sm:px-4 sm:py-1.5 sm:text-[10px]",
  alertsHeader: "mb-6 sm:mb-8",
  alertsTitle: "text-center text-xl font-semibold tracking-tight sm:text-2xl",
  alertsSubtitle: "mt-1 text-center text-xs font-medium sm:text-sm",
  alertsList: "space-y-3 sm:space-y-4",
  alertsItem: "grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-2.5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-4",
  alertsIconWrap: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 shadow-sm sm:h-14 sm:w-14",
  alertsContent: "min-w-0 flex-1",
  alertsName: "text-sm font-semibold leading-5 sm:text-[0.95rem]",
  alertsCount: "mt-1 inline-flex items-center rounded-[5px] px-2.5 py-1 text-[11px] font-semibold leading-none whitespace-nowrap",
  alertsButton: "inline-flex h-9 items-center justify-center rounded-[10px] bg-slate-800 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-slate-700 active:scale-95 sm:h-10 sm:px-3.5",
  alertsMobileButton: "mt-3 sm:hidden",
  alertsDesktopButton: "hidden sm:inline-flex",
  alertsFooterButton: "mt-6 w-full rounded-2xl border py-4 text-sm font-medium transition hover:opacity-90 active:scale-[0.98] sm:mt-8 sm:py-5 sm:text-base",
} as const

const summaryIconClassByColor: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  slate: "bg-slate-50 text-slate-600",
  amber: "bg-amber-50 text-amber-600",
}

const summaryValueStyleByColor: Record<string, Record<string, string>> = {
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

const statusToneClassByTone: Record<string, string> = {
  success: "border-teal-200 bg-teal-50/80 text-teal-700",
  warning: "border-amber-200 bg-amber-50/80 text-amber-700",
  info: "border-violet-200 bg-violet-50/80 text-violet-700",
  danger: "border-rose-200 bg-rose-50/80 text-rose-700",
}

const amountTextClass = (amount: string) =>
  amount.startsWith("-") ? "text-red-500" : "text-slate-700"

const summaryDeltaClass = (deltaTrend: string, color: string) => {
  if (deltaTrend === "down") return "text-red-500"
  if (color === "amber") return "text-amber-500"
  return "text-emerald-600"
}

const summaryIconClass = (color: string) => summaryIconClassByColor[color] ?? summaryIconClassByColor.slate
const summaryValueStyle = (color: string) => summaryValueStyleByColor[color] ?? summaryValueStyleByColor.slate
const statusToneClass = (tone: string) => statusToneClassByTone[tone] ?? statusToneClassByTone.info

const donutValueStyle = {
  backgroundImage: "linear-gradient(135deg, #111c4e 0%, #3559f6 55%, #14b8a6 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "0 10px 24px rgba(37, 99, 235, 0.16)",
} as const

export const useDashboardStyles = () => ({
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
})
