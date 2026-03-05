export const useProductDetailStyles = () => {
  const { isDark } = useThemeMode()

  const ui = {
    page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
    topbar: "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
    titleBlock: "space-y-3",
    breadcrumb: "flex flex-wrap items-center gap-2 text-sm font-medium",
    breadcrumbCurrent: "font-semibold",
    titleMeta: "flex flex-wrap items-center gap-2",
    badge: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
    title: "text-3xl font-bold tracking-tight sm:text-4xl",
    subtitle: "text-base italic sm:text-lg",
    actionRow: "flex flex-wrap items-center gap-3",
    secondaryButton: "inline-flex h-12 items-center justify-center rounded-[10px] border px-5 text-sm font-semibold transition",
    primaryButton: "inline-flex h-12 items-center justify-center rounded-[10px] px-6 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60",
    contentGrid: "grid gap-6 xl:grid-cols-[minmax(0,2fr)_23rem]",
    mainStack: "space-y-6",
    heroCard: "overflow-hidden rounded-[10px] border shadow-sm",
    heroGrid: "grid gap-0 lg:grid-cols-[22rem_minmax(0,1fr)]",
    mediaPanel: "relative min-h-[20rem] p-5",
    mediaImageWrap: "overflow-hidden rounded-[10px] border",
    mediaImage: "h-full min-h-[18rem] w-full object-cover",
    featureBadge: "absolute bottom-8 left-8 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
    infoPanel: "flex flex-col justify-between p-6",
    infoGrid: "grid gap-5 sm:grid-cols-2",
    infoBlock: "space-y-2",
    infoLabel: "text-xs font-semibold",
    infoValue: "text-lg font-semibold",
    infoSub: "text-sm",
    infoFooter: "mt-6 flex flex-wrap items-center gap-3 border-t pt-5",
    avatar: "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
    card: "rounded-[10px] border p-6 shadow-sm",
    tabRow: "flex flex-wrap items-center gap-3 border-b pb-4",
    tabButton: "rounded-[10px] px-4 py-2 text-sm font-semibold transition",
    sectionTitle: "text-2xl font-semibold",
    paragraph: "mt-4 text-base leading-8",
    chipGrid: "mt-6 grid gap-3 sm:grid-cols-2",
    chip: "inline-flex items-center gap-2 rounded-[10px] border px-4 py-4 text-sm font-medium",
    summaryGrid: "grid gap-6 lg:grid-cols-2",
    summaryCard: "rounded-[10px] border p-6 shadow-sm",
    summaryLabel: "text-xs font-semibold",
    summaryValue: "mt-4 text-5xl font-bold tracking-tight",
    summaryMeta: "mt-2 text-base",
    metricRow: "mt-8 grid gap-4 sm:grid-cols-2",
    metricTile: "rounded-[10px] border p-4",
    metricTileLabel: "text-xs font-semibold",
    metricTileValue: "mt-2 text-3xl font-bold",
    stockCard: "rounded-[10px] border p-6 shadow-sm",
    stockValue: "mt-10 text-center text-7xl font-bold tracking-tight",
    stockSub: "mt-3 text-center text-lg italic",
    progressCard: "mt-10 rounded-[10px] border p-5",
    progressLabel: "flex items-center justify-between gap-3 text-sm font-semibold",
    progressTrack: "mt-4 h-3 overflow-hidden rounded-full",
    progressFill: "h-full rounded-full",
    sideStack: "space-y-6",
    quickGrid: "mt-6 grid grid-cols-2 gap-3",
    quickButton: "flex min-h-[7.5rem] flex-col items-center justify-center gap-3 rounded-[10px] border p-4 text-center text-sm font-semibold transition",
    activityList: "mt-5 space-y-4",
    activityItem: "flex items-start gap-3 rounded-[10px] border p-4",
    activityIcon: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
    emptyState: "rounded-[10px] border px-6 py-10 text-center text-sm",
    dialogOverlay: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4",
    dialogCard: "w-full max-w-md rounded-[10px] border p-6 shadow-2xl",
    dialogTitle: "text-lg font-semibold",
    dialogText: "mt-2 text-sm leading-6",
    dialogActions: "mt-6 flex justify-end gap-3",
    input: "h-12 w-full rounded-[10px] border px-4 text-sm outline-none transition focus:ring-2",
    errorState: "rounded-[10px] border px-6 py-10 text-center text-sm",
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

  const heroMediaStyle = computed(() => ({
    background: isDark.value
      ? "linear-gradient(160deg, rgba(8,47,73,0.9) 0%, rgba(15,23,42,0.9) 100%)"
      : "linear-gradient(160deg, rgba(186,230,253,0.8) 0%, rgba(241,245,249,0.95) 100%)",
    borderColor: "var(--app-border)",
  }))

  const primaryButtonStyle = {
    backgroundImage: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
  } as const

  const statusBadgeStyle = (isActive: boolean) =>
    isActive
      ? { backgroundColor: "rgba(16,185,129,0.14)", color: "#10b981" }
      : { backgroundColor: "rgba(244,63,94,0.14)", color: "#f43f5e" }

  const stockBadgeStyle = (tone: "in_stock" | "low_stock" | "out_of_stock") =>
    tone === "in_stock"
      ? { backgroundColor: "rgba(16,185,129,0.14)", color: "#10b981" }
      : tone === "low_stock"
        ? { backgroundColor: "rgba(245,158,11,0.14)", color: "#f59e0b" }
        : { backgroundColor: "rgba(244,63,94,0.14)", color: "#f43f5e" }

  const progressTrackStyle = computed(() => ({
    backgroundColor: isDark.value ? "rgba(30,41,59,0.9)" : "rgba(226,232,240,0.9)",
  }))

  const progressFillStyle = (ratio: number) => ({
    width: `${Math.max(8, Math.min(100, ratio))}%`,
    background: ratio <= 35
      ? "linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)"
      : ratio <= 70
        ? "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)"
        : "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)",
  })

  const tabButtonStyle = (active: boolean) =>
    active
      ? {
          backgroundColor: isDark.value ? "rgba(37,99,235,0.14)" : "rgba(37,99,235,0.1)",
          color: "#3b82f6",
          borderColor: "rgba(59,130,246,0.24)",
        }
      : {
          backgroundColor: "transparent",
          color: "var(--app-fg-muted)",
          borderColor: "transparent",
        }

  const quickActionStyle = (tone: "primary" | "neutral") =>
    tone === "primary"
      ? {
          backgroundColor: isDark.value ? "rgba(37,99,235,0.1)" : "rgba(37,99,235,0.06)",
          borderColor: "rgba(59,130,246,0.2)",
          color: "#3b82f6",
        }
      : {
          backgroundColor: "var(--app-surface-muted)",
          borderColor: "var(--app-border)",
          color: "var(--app-fg)",
        }

  return {
    heroMediaStyle,
    mutedSurfaceStyle,
    mutedTextStyle,
    primaryButtonStyle,
    progressFillStyle,
    progressTrackStyle,
    quickActionStyle,
    statusBadgeStyle,
    stockBadgeStyle,
    surfaceStyle,
    tabButtonStyle,
    textStyle,
    ui,
  }
}
