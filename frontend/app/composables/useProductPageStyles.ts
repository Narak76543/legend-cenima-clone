export const useProductPageStyles = () => {
  const { isDark } = useThemeMode()

  const ui = {
    page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
    topbar: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
    titleBlock: "space-y-2",
    breadcrumb: "flex flex-wrap items-center gap-2 text-sm font-medium",
    breadcrumbCurrent: "font-semibold",
    title: "text-3xl font-bold tracking-tight sm:text-4xl",
    subtitle: "text-sm sm:text-base",
    toolbar: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
    searchWrap: "relative flex-1 lg:max-w-xl",
    searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
    searchInput: "h-12 w-full rounded-[10px] border pl-12 pr-4 text-sm outline-none transition focus:ring-2",
    actionRow: "flex flex-col gap-3 sm:flex-row sm:items-center",
    secondaryButton: "inline-flex h-12 items-center justify-center rounded-[10px] border px-5 text-sm font-semibold transition",
    primaryButton: "inline-flex h-12 items-center justify-center rounded-[10px] px-6 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60",
    statsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
    statCard: "rounded-[10px] border p-5 shadow-sm",
    statHeader: "flex items-center justify-between gap-3",
    statLabel: "text-sm font-medium",
    statValueRow: "mt-4 flex items-end gap-2",
    statValue: "text-4xl font-bold tracking-tight",
    statMeta: "pb-1 text-sm font-semibold",
    tablePanel: "rounded-[10px] border shadow-sm overflow-hidden",
    tableHeader: "flex flex-col gap-3 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8",
    tableTitle: "text-xl font-semibold",
    tableBadgeRow: "flex flex-wrap items-center gap-2",
    badge: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
    tableWrap: "overflow-x-auto",
    table: "w-full border-separate border-spacing-0",
    tableHead: "text-left text-sm font-medium",
    tableHeadCell: "px-6 py-4 first:pl-8 last:pr-8",
    tableBody: "divide-y",
    tableRow: "transition-colors",
    tableCell: "px-6 py-5 first:pl-8 last:pr-8",
    productMain: "flex min-w-[18rem] items-center gap-4",
    productImage: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
    productMeta: "min-w-0",
    productName: "truncate text-sm font-semibold sm:text-base",
    productSub: "mt-1 text-xs sm:text-sm",
    stockWrap: "min-w-[7rem]",
    stockValue: "text-2xl font-bold",
    stockUnit: "text-xs font-medium",
    valueText: "text-lg font-semibold",
    rowActions: "flex items-center gap-2",
    iconButton: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition disabled:cursor-not-allowed disabled:opacity-60",
    emptyState: "px-8 py-12 text-center text-sm",
    drawerOverlay: "fixed inset-0 z-40 flex justify-end bg-slate-950/55",
    drawerPanel: "flex h-full w-full max-w-2xl flex-col border-l shadow-2xl",
    drawerHeader: "flex items-start justify-between gap-4 border-b px-6 py-6",
    drawerTitle: "text-2xl font-semibold",
    drawerBody: "flex-1 overflow-y-auto px-6 py-6",
    drawerSection: "space-y-4",
    drawerSectionTitle: "text-xs font-semibold uppercase tracking-[0.12em]",
    fieldGrid: "grid gap-4 sm:grid-cols-2",
    fieldGroup: "space-y-2",
    fieldGroupFull: "space-y-2 sm:col-span-2",
    label: "text-sm font-semibold",
    input: "h-12 w-full rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    textarea: "w-full rounded-[10px] border px-4 py-3 text-sm outline-none transition focus:ring-2",
    select: "h-12 w-full rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    uploadCard: "rounded-[10px] border border-dashed p-4",
    uploadDropzone: "flex min-h-[12rem] flex-col items-center justify-center rounded-[10px] border border-dashed px-6 py-8 text-center transition",
    uploadPreview: "h-full max-h-[14rem] w-full rounded-[10px] object-cover",
    uploadIconWrap: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
    drawerFooter: "flex items-center justify-end gap-3 border-t px-6 py-5",
    modalOverlay: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4",
    modalCard: "w-full max-w-md rounded-[10px] border p-6 shadow-2xl",
    modalTitle: "text-lg font-semibold",
    modalBody: "mt-2 text-sm leading-6",
    modalActions: "mt-6 flex justify-end gap-3",
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

  const searchSurfaceStyle = {
    backgroundColor: "var(--app-surface-muted)",
    borderColor: "var(--app-border)",
    color: "var(--app-fg)",
  } as const

  const inputSurfaceStyle = {
    backgroundColor: "var(--app-surface-muted)",
    borderColor: "var(--app-border)",
    color: "var(--app-fg)",
  } as const

  const primaryButtonStyle = {
    backgroundImage: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
  } as const

  const statusBadgeStyle = (tone: "in_stock" | "low_stock" | "out_of_stock") =>
    tone === "in_stock"
      ? { backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }
      : tone === "low_stock"
        ? { backgroundColor: "rgba(245,158,11,0.14)", color: "#f59e0b" }
        : { backgroundColor: "rgba(244,63,94,0.14)", color: "#f43f5e" }

  const statMetaStyle = (tone: "primary" | "success" | "warning" | "danger") =>
    tone === "success"
      ? { color: "#10b981" }
      : tone === "warning"
        ? { color: "#f59e0b" }
        : tone === "danger"
          ? { color: "#f43f5e" }
          : { color: "#3b82f6" }

  const statIconStyle = (tone: "primary" | "success" | "warning" | "danger") =>
    tone === "success"
      ? { backgroundColor: "rgba(16,185,129,0.14)", color: "#10b981" }
      : tone === "warning"
        ? { backgroundColor: "rgba(245,158,11,0.14)", color: "#f59e0b" }
        : tone === "danger"
          ? { backgroundColor: "rgba(244,63,94,0.14)", color: "#f43f5e" }
          : { backgroundColor: "rgba(59,130,246,0.14)", color: "#3b82f6" }

  const summaryBadgeStyle = (tone: "primary" | "success") =>
    tone === "success"
      ? { backgroundColor: "rgba(16,185,129,0.12)", color: "#10b981" }
      : { backgroundColor: "rgba(59,130,246,0.12)", color: "#3b82f6" }

  const iconButtonStyle = {
    backgroundColor: "var(--app-surface-muted)",
    borderColor: "var(--app-border)",
    color: "var(--app-fg-muted)",
  } as const

  const uploadSurfaceStyle = computed(() => ({
    background: isDark.value
      ? "linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.92) 100%)"
      : "linear-gradient(180deg, rgba(248,250,252,0.88) 0%, rgba(241,245,249,0.95) 100%)",
    borderColor: isDark.value
      ? "rgba(148,163,184,0.18)"
      : "rgba(148,163,184,0.28)",
  }))

  const tableRowClass = computed(() =>
    isDark.value ? "hover:bg-slate-900/35" : "hover:bg-slate-50/35",
  )

  return {
    iconButtonStyle,
    inputSurfaceStyle,
    mutedSurfaceStyle,
    mutedTextStyle,
    primaryButtonStyle,
    searchSurfaceStyle,
    statIconStyle,
    statMetaStyle,
    statusBadgeStyle,
    summaryBadgeStyle,
    surfaceStyle,
    tableRowClass,
    textStyle,
    ui,
    uploadSurfaceStyle,
  }
}
