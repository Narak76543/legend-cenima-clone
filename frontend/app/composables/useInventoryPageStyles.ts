export const useInventoryPageStyles = () => {
  const { isDark } = useThemeMode()

  const ui = {
    page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
    hero: "flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between",
    titleBlock: "space-y-2",
    title: "text-3xl font-bold tracking-tight sm:text-4xl",
    subtitle: "max-w-3xl text-sm sm:text-base",
    heroActions: "flex items-center gap-3",
    topSearchRow: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
    topSearchWrap: "relative flex-1 lg:max-w-xl",
    searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
    searchInput: "h-12 w-full rounded-[10px] border pl-12 pr-4 text-sm outline-none transition focus:ring-2",
    primaryButton: "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60",
    secondaryButton: "inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
    statsGrid: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
    statCard: "rounded-[10px] border p-5 shadow-sm",
    statHeader: "flex items-start justify-between gap-3",
    statIcon: "flex h-12 w-12 items-center justify-center rounded-2xl text-lg",
    statDelta: "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
    statLabel: "mt-5 text-sm font-medium",
    statValue: "mt-2 text-4xl font-bold tracking-tight",
    filterBar: "flex flex-col gap-3 rounded-[10px] border p-4 shadow-sm xl:flex-row xl:items-center",
    filterSearchWrap: "relative flex-1",
    filterSelect: "h-12 rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    filterActions: "flex items-center gap-3",
    iconAction: "inline-flex h-12 w-12 items-center justify-center rounded-[10px] border transition",
    tablePanel: "overflow-hidden rounded-[10px] border shadow-sm",
    tableWrap: "overflow-x-auto",
    table: "min-w-[64rem] w-full table-fixed border-separate border-spacing-0",
    tableHead: "text-left text-sm font-medium",
    tableHeadCell: "border-b px-6 py-5 align-middle",
    tableBodyRow: "transition-colors last:[&>td]:border-b-0",
    tableCell: "border-b px-6 py-5 align-middle",
    productCell: "flex min-w-0 items-center gap-4",
    imageWrap: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
    image: "h-full w-full object-cover",
    imageFallback: "text-sm font-semibold",
    productName: "truncate text-sm font-semibold sm:text-base",
    productSub: "mt-1 text-xs sm:text-sm",
    stockCell: "space-y-2",
    stockValue: "text-sm font-semibold",
    stockBar: "h-2.5 w-full overflow-hidden rounded-full",
    stockBarFill: "h-full rounded-full",
    statusBadge: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
    actionsCell: "flex items-center justify-center gap-2",
    actionButton: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition",
    emptyState: "px-8 py-12 text-center text-sm",
    tableFooter: "flex flex-col gap-3 border-t px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between",
    modalOverlay: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4",
    modalCard: "w-full max-w-lg rounded-[10px] border shadow-2xl",
    modalHeader: "flex items-start justify-between gap-4 border-b px-6 py-5",
    modalTitle: "text-xl font-semibold",
    modalBody: "space-y-5 px-6 py-6",
    modalFooter: "flex items-center justify-end gap-3 border-t px-6 py-5",
    fieldGrid: "grid gap-4 sm:grid-cols-2",
    fieldGroup: "space-y-2",
    fieldFull: "space-y-2 sm:col-span-2",
    label: "text-sm font-semibold",
    input: "h-12 w-full rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    select: "h-12 w-full rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    helperText: "text-xs",
  } as const

  const surfaceStyle = {
    backgroundColor: "var(--app-surface)",
    borderColor: "var(--app-border)",
  } as const

  const mutedSurfaceStyle = {
    backgroundColor: "var(--app-surface-muted)",
    borderColor: "var(--app-border)",
  } as const

  const textStyle = {
    color: "var(--app-fg)",
  } as const

  const mutedTextStyle = {
    color: "var(--app-fg-muted)",
  } as const

  const inputSurfaceStyle = {
    backgroundColor: "var(--app-surface-muted)",
    borderColor: "var(--app-border)",
    color: "var(--app-fg)",
  } as const

  const primaryButtonStyle = {
    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
  } as const

  const statIconStyle = (tone: "primary" | "warning" | "danger" | "success") =>
    tone === "warning"
      ? { backgroundColor: "rgba(245,158,11,0.12)", color: "#d97706" }
      : tone === "danger"
        ? { backgroundColor: "rgba(244,63,94,0.12)", color: "#e11d48" }
        : tone === "success"
          ? { backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }
          : { backgroundColor: "rgba(59,130,246,0.12)", color: "#3b82f6" }

  const statDeltaStyle = (tone: "positive" | "negative" | "neutral") =>
    tone === "positive"
      ? { backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }
      : tone === "negative"
        ? { backgroundColor: "rgba(244,63,94,0.12)", color: "#e11d48" }
        : { backgroundColor: "rgba(148,163,184,0.12)", color: "var(--app-fg-muted)" }

  const statusBadgeStyle = (status: "in_stock" | "low_stock" | "out_of_stock") =>
    status === "in_stock"
      ? { backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }
      : status === "low_stock"
        ? { backgroundColor: "rgba(245,158,11,0.12)", color: "#d97706" }
        : { backgroundColor: "rgba(244,63,94,0.12)", color: "#e11d48" }

  const stockBarTrackStyle = computed(() => ({
    backgroundColor: isDark.value ? "rgba(71,85,105,0.45)" : "rgba(203,213,225,0.8)",
  }))

  const stockBarFillStyle = (status: "in_stock" | "low_stock" | "out_of_stock") =>
    status === "in_stock"
      ? { backgroundColor: "#10b981" }
      : status === "low_stock"
        ? { backgroundColor: "#f59e0b" }
        : { backgroundColor: "#f43f5e" }

  const tableRowClass = computed(() =>
    isDark.value ? "hover:bg-slate-900/25" : "hover:bg-slate-50/60",
  )

  return {
    inputSurfaceStyle,
    mutedSurfaceStyle,
    mutedTextStyle,
    primaryButtonStyle,
    statDeltaStyle,
    statIconStyle,
    statusBadgeStyle,
    stockBarFillStyle,
    stockBarTrackStyle,
    surfaceStyle,
    tableRowClass,
    textStyle,
    ui,
  }
}
