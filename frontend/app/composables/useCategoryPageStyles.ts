const ui = {
  page: "space-y-6 pb-8 sm:space-y-8 sm:pb-10",
  topbar: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
  titleBlock: "space-y-2",
  breadcrumb: "flex flex-wrap items-center gap-2 text-sm font-medium",
  breadcrumbCurrent: "font-semibold",
  title: "text-3xl font-bold tracking-tight sm:text-4xl",
  subtitle: "text-sm sm:text-base",
  toolbar: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  searchWrap: "relative flex-1",
  searchIcon: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
  searchInput: "h-12 w-full rounded-[10px] border pl-12 pr-4 text-sm outline-none transition",
  actionRow: "flex flex-col gap-3 sm:flex-row sm:items-center",
  secondaryButton: "inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-semibold transition",
  primaryButton: "inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60",
  statsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
  statCard: "flex items-center gap-4 rounded-[10px] border p-5 shadow-sm",
  statIcon: "flex h-14 w-14 items-center justify-center rounded-2xl",
  statLabel: "text-sm font-medium",
  statValueRow: "mt-1 flex items-end gap-2",
  statValue: "text-3xl font-bold tracking-tight",
  statMeta: "pb-1 text-sm font-semibold",
  alertCard: "flex items-start gap-3 rounded-[10px] border px-4 py-4",
  alertIcon: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl",
  alertTitle: "text-sm font-semibold",
  createPanel: "rounded-[2rem] border p-6 shadow-sm sm:p-8",
  createPanelHeader: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  sectionTitle: "text-lg font-semibold sm:text-xl",
  fieldGroup: "space-y-3",
  label: "text-sm font-semibold",
  input: "h-12 w-full rounded-3xl border px-5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4",
  createGrid: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]",
  uploadCard: "rounded-[1.75rem] border border-dashed p-5",
  uploadDropzone: "flex min-h-[14rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed px-6 py-8 text-center transition",
  uploadPreview: "h-full max-h-[16rem] w-full rounded-[1.25rem] object-cover",
  uploadIconWrap: "mb-4 flex h-16 w-16 items-center justify-center rounded-3xl",
  createAside: "space-y-4",
  toggleCard: "flex items-center justify-between gap-4 rounded-3xl border px-5 py-4",
  toggleTrack: "relative inline-flex h-8 w-14 items-center rounded-full transition",
  toggleThumb: "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition",
  asideCard: "rounded-[1.75rem] border p-5 shadow-sm",
  tipList: "space-y-4",
  tipRow: "flex items-start gap-3",
  tipDot: "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
  tipText: "text-sm leading-6",
  listPanel: "rounded-[10px] border shadow-sm",
  listHeader: "flex flex-col gap-3 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8",
  listTitle: "text-lg font-semibold sm:text-xl",
  listToolbar: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  badge: "inline-flex items-center gap-2 rounded-[5px] px-3 py-1 text-xs font-semibold",
  listTableWrap: "overflow-x-auto",
  listTable: "min-w-[72rem] w-full table-fixed border-separate border-spacing-0",
  tableHead: "text-left text-sm font-medium",
  tableHeadCell: "px-6 py-4 first:pl-8 last:pr-8",
  listBody: "divide-y",
  tableRow: "transition-colors",
  tableCell: "px-6 py-5 first:pl-8 last:pr-8",
  listMain: "flex min-w-0 items-center gap-4",
  listImage: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
  listMeta: "min-w-0",
  listName: "truncate text-sm font-semibold sm:text-base",
  listSubtext: "mt-1 text-xs sm:text-sm",
  progressWrap: "flex w-full items-center gap-3",
  progressBar: "h-2 flex-1 overflow-hidden rounded-full",
  progressFill: "h-full rounded-full",
  rowActions: "flex items-center justify-center gap-2",
  iconButton: "inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition disabled:cursor-not-allowed disabled:opacity-60",
  emptyState: "px-6 py-10 text-center text-sm sm:px-8",
  modalOverlay: "fixed inset-0 z-40 flex items-center justify-center bg-slate-950/55 px-4",
  modalCard: "w-full max-w-md rounded-[1.75rem] border p-6 shadow-2xl",
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

const primaryButtonStyle = {
  backgroundImage: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
} as const

const inputSurfaceStyle = {
  borderColor: "var(--app-border)",
  backgroundColor: "var(--app-surface-muted)",
} as const

const toggleTrackStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? "#3b82f6" : "rgba(148, 163, 184, 0.35)",
})

const toggleThumbStyle = (isActive: boolean) => ({
  transform: isActive ? "translateX(1.5rem)" : "translateX(0.25rem)",
})

const alertToneStyle = (tone: "success" | "error") =>
  tone === "success"
    ? {
        borderColor: "rgba(16, 185, 129, 0.25)",
        backgroundColor: "rgba(236, 253, 245, 0.9)",
        color: "#047857",
      }
    : {
        borderColor: "rgba(244, 63, 94, 0.22)",
        backgroundColor: "rgba(255, 241, 242, 0.92)",
        color: "#be123c",
      }

const alertIconToneStyle = (tone: "success" | "error") =>
  tone === "success"
    ? {
        backgroundColor: "rgba(16, 185, 129, 0.16)",
        color: "#10b981",
      }
    : {
        backgroundColor: "rgba(244, 63, 94, 0.14)",
        color: "#f43f5e",
      }

const badgeToneStyle = (isActive: boolean) =>
  isActive
    ? {
        backgroundColor: "rgba(16, 185, 129, 0.12)",
        color: "#10b981",
      }
    : {
        backgroundColor: "rgba(148, 163, 184, 0.16)",
        color: "var(--app-fg-muted)",
      }

const summaryBadgeStyle = (tone: "primary" | "success") =>
  tone === "success"
    ? {
        backgroundColor: "rgba(16, 185, 129, 0.12)",
        color: "#10b981",
      }
    : {
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        color: "#3b82f6",
      }

const statIconStyle = (tone: "primary" | "success" | "warning") =>
  tone === "primary"
    ? { backgroundColor: "rgba(37, 99, 235, 0.14)", color: "#2563eb" }
    : tone === "success"
      ? { backgroundColor: "rgba(16, 185, 129, 0.14)", color: "#059669" }
      : { backgroundColor: "rgba(245, 158, 11, 0.14)", color: "#d97706" }

const statMetaStyle = (tone: "primary" | "success" | "warning") =>
  tone === "warning"
    ? { color: "#f43f5e" }
    : tone === "success"
      ? { color: "#10b981" }
      : { color: "#3b82f6" }

const progressTrackStyle = {
  backgroundColor: "rgba(148, 163, 184, 0.18)",
} as const

const progressFillStyle = (isActive: boolean, width: string) => ({
  width,
  backgroundColor: isActive ? "#10b981" : "#94a3b8",
})

const iconButtonStyle = {
  backgroundColor: "var(--app-surface-muted)",
  borderColor: "var(--app-border)",
  color: "var(--app-fg-muted)",
} as const

export const useCategoryPageStyles = () => {
  const { isDark } = useThemeMode()

  const uploadSurfaceStyle = computed(() => ({
    background: isDark.value
      ? "linear-gradient(180deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.92) 100%)"
      : "linear-gradient(180deg, rgba(248,250,252,0.88) 0%, rgba(241,245,249,0.95) 100%)",
    borderColor: isDark.value
      ? "rgba(148, 163, 184, 0.18)"
      : "rgba(148, 163, 184, 0.28)",
  }))

  const tableRowClass = computed(() =>
    isDark.value
      ? "hover:bg-slate-900/35"
      : "hover:bg-slate-50/35",
  )

  return {
    alertToneStyle,
    alertIconToneStyle,
    badgeToneStyle,
    iconButtonStyle,
    inputSurfaceStyle,
    mutedSurfaceStyle,
    mutedTextStyle,
    primaryButtonStyle,
    progressFillStyle,
    progressTrackStyle,
    searchSurfaceStyle,
    surfaceStyle,
    summaryBadgeStyle,
    statIconStyle,
    statMetaStyle,
    tableRowClass,
    textStyle,
    toggleThumbStyle,
    toggleTrackStyle,
    ui,
    uploadSurfaceStyle,
  }
}
