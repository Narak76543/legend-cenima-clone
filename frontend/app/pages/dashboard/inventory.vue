<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

type InventoryStatusFilter = "all" | "in_stock" | "low_stock" | "out_of_stock"
type AdjustMode = "increase" | "decrease" | "set"

const searchQuery = ref("")
const selectedCategoryId = ref("")
const selectedStatus = ref<InventoryStatusFilter>("all")
const isAdjustModalOpen = ref(false)
const adjustProductId = ref("")
const adjustMode = ref<AdjustMode>("increase")
const adjustAmount = ref("0")
const isSubmittingAdjustment = ref(false)
const errorMessage = ref("")
const successMessage = ref("")

const {
  adjustStock,
  fetchInventoryOverview,
  inventoryOverview,
  isAdjustingInventory,
  isLoadingInventory,
} = useInventory()
const {
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
} = useInventoryPageStyles()

const summary = computed(() => inventoryOverview.value?.summary ?? {
  total_products: 0,
  low_stock_items: 0,
  out_of_stock_items: 0,
  total_quantity: 0,
})

const categories = computed(() => inventoryOverview.value?.categories ?? [])
const items = computed(() => inventoryOverview.value?.items ?? [])

const selectedProduct = computed(() =>
  items.value.find((item) => item.id === adjustProductId.value) || null,
)

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value)

const formatTimeAgo = (value: string | null) => {
  if (!value) return "Just now"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Just now"

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 172800) return "Yesterday"
  return `${Math.floor(seconds / 86400)} days ago`
}

const formatTimestamp = (value: string | null) => {
  if (!value) return "No timestamp"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "No timestamp"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

const statusLabel = (status: "in_stock" | "low_stock" | "out_of_stock") =>
  status === "in_stock"
    ? "In Stock"
    : status === "low_stock"
      ? "Low Stock"
      : "Out of Stock"

const stockRatio = (item: typeof items.value[number]) => {
  const baseline = Math.max(item.low_stock_threshold * 4, item.stock_qty, 1)
  return Math.max(6, Math.min(100, Math.round((item.stock_qty / baseline) * 100)))
}

const stockLevelLabel = (item: typeof items.value[number]) =>
  `${formatNumber(item.stock_qty)} / ${formatNumber(Math.max(item.low_stock_threshold * 4, item.stock_qty))}`

const resetAdjustForm = () => {
  adjustProductId.value = items.value[0]?.id || ""
  adjustMode.value = "increase"
  adjustAmount.value = "0"
}

const dismissAlerts = () => {
  errorMessage.value = ""
  successMessage.value = ""
}

const loadInventory = async () => {
  dismissAlerts()

  try {
    await fetchInventoryOverview({
      q: searchQuery.value,
      category_id: selectedCategoryId.value || undefined,
      status: selectedStatus.value,
    })

    if (!adjustProductId.value && items.value.length) {
      adjustProductId.value = items.value[0].id
    }
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to load inventory data."
  }
}

const openAdjustModal = (productId?: string) => {
  dismissAlerts()
  adjustProductId.value = productId || items.value[0]?.id || ""
  adjustMode.value = "increase"
  adjustAmount.value = "0"
  isAdjustModalOpen.value = true
}

const closeAdjustModal = () => {
  isAdjustModalOpen.value = false
}

const submitAdjustment = async () => {
  dismissAlerts()

  if (!adjustProductId.value) {
    errorMessage.value = "Please choose a product first."
    return
  }

  const amount = Number.parseInt(adjustAmount.value, 10)
  if (!Number.isFinite(amount) || amount < 0) {
    errorMessage.value = "Amount must be a valid non-negative number."
    return
  }

  isSubmittingAdjustment.value = true

  try {
    await adjustStock(adjustProductId.value, {
      mode: adjustMode.value,
      amount,
    })

    await loadInventory()
    successMessage.value = "Stock adjusted successfully."
    closeAdjustModal()
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to adjust stock."
  } finally {
    isSubmittingAdjustment.value = false
  }
}

const statCards = computed(() => [
  {
    label: "Total Products",
    value: formatNumber(summary.value.total_products),
    delta: `${items.value.length} visible`,
    deltaTone: "positive" as const,
    icon: "i-lucide-package",
    iconTone: "primary" as const,
  },
  {
    label: "Low Stock Items",
    value: formatNumber(summary.value.low_stock_items),
    delta: summary.value.low_stock_items ? "Needs attention" : "Stable",
    deltaTone: summary.value.low_stock_items ? "negative" as const : "neutral" as const,
    icon: "i-lucide-triangle-alert",
    iconTone: "warning" as const,
  },
  {
    label: "Out of Stock",
    value: formatNumber(summary.value.out_of_stock_items),
    delta: summary.value.out_of_stock_items ? "Requires action" : "Covered",
    deltaTone: summary.value.out_of_stock_items ? "negative" as const : "neutral" as const,
    icon: "i-lucide-ban",
    iconTone: "danger" as const,
  },
  {
    label: "Total Quantity",
    value: formatNumber(summary.value.total_quantity),
    delta: "Across all products",
    deltaTone: "positive" as const,
    icon: "i-lucide-database",
    iconTone: "success" as const,
  },
])

watch([searchQuery, selectedCategoryId, selectedStatus], () => {
  loadInventory()
})

onMounted(async () => {
  await loadInventory()
  resetAdjustForm()
})
</script>

<template>
  <section :class="ui.page">
    <div :class="ui.hero">
      <div :class="ui.titleBlock">
        <h1 :class="ui.title" :style="textStyle">
          Inventory Management
        </h1>
        <p :class="ui.subtitle" :style="mutedTextStyle">
          Manage product stock and monitor inventory levels across all available categories.
        </p>
      </div>

      <div :class="ui.heroActions">
        <button
          type="button"
          :class="ui.primaryButton"
          :style="primaryButtonStyle"
          :disabled="!items.length"
          @click="openAdjustModal()"
        >
          <UIcon name="i-lucide-plus" class="h-4 w-4" />
          Add Stock
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="rounded-[10px] border px-4 py-3 text-sm font-medium text-rose-500" :style="{ backgroundColor: 'rgba(244,63,94,0.08)', borderColor: 'rgba(244,63,94,0.18)' }">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="rounded-[10px] border px-4 py-3 text-sm font-medium text-emerald-500" :style="{ backgroundColor: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.18)' }">
      {{ successMessage }}
    </div>

    <div :class="ui.statsGrid">
      <article
        v-for="card in statCards"
        :key="card.label"
        :class="ui.statCard"
        :style="surfaceStyle"
      >
        <div :class="ui.statHeader">
          <span :class="ui.statIcon" :style="statIconStyle(card.iconTone)">
            <UIcon :name="card.icon" class="h-5 w-5" />
          </span>
          <span :class="ui.statDelta" :style="statDeltaStyle(card.deltaTone)">
            {{ card.delta }}
          </span>
        </div>
        <p :class="ui.statLabel" :style="mutedTextStyle">
          {{ card.label }}
        </p>
        <p :class="ui.statValue" :style="textStyle">
          {{ card.value }}
        </p>
      </article>
    </div>

    <div :class="ui.filterBar" :style="surfaceStyle">
      <div :class="ui.filterSearchWrap">
        <div :class="ui.searchIcon" :style="mutedTextStyle">
          <UIcon name="i-lucide-search" class="h-4 w-4" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          :class="ui.searchInput"
          :style="inputSurfaceStyle"
          placeholder="Search products by name or SKU..."
        >
      </div>

      <div :class="ui.filterActions">
        <select v-model="selectedCategoryId" :class="ui.filterSelect" :style="inputSurfaceStyle">
          <option value="">
            All Categories
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <select v-model="selectedStatus" :class="ui.filterSelect" :style="inputSurfaceStyle">
          <option value="all">
            Stock Status
          </option>
          <option value="in_stock">
            In Stock
          </option>
          <option value="low_stock">
            Low Stock
          </option>
          <option value="out_of_stock">
            Out of Stock
          </option>
        </select>

        <button
          type="button"
          :class="ui.iconAction"
          :style="mutedSurfaceStyle"
          :disabled="isLoadingInventory"
          @click="loadInventory()"
        >
          <UIcon name="i-lucide-refresh-cw" class="h-4 w-4" />
        </button>
      </div>
    </div>

    <section :class="ui.tablePanel" :style="surfaceStyle">
      <div :class="ui.tableWrap">
        <table :class="ui.table">
          <thead :class="ui.tableHead" :style="mutedTextStyle">
            <tr>
              <th :class="ui.tableHeadCell" class="w-[30%]">
                Product
              </th>
              <th :class="ui.tableHeadCell" class="w-[16%]">
                Category
              </th>
              <th :class="ui.tableHeadCell" class="w-[22%]">
                Stock Level
              </th>
              <th :class="ui.tableHeadCell" class="w-[14%]">
                Status
              </th>
              <th :class="ui.tableHeadCell" class="w-[12%]">
                Last Updated
              </th>
              <th :class="ui.tableHeadCell" class="w-[12%] text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="isLoadingInventory">
              <td :class="ui.emptyState" colspan="6" :style="mutedTextStyle">
                Loading inventory...
              </td>
            </tr>

            <tr v-else-if="!items.length">
              <td :class="ui.emptyState" colspan="6" :style="mutedTextStyle">
                No inventory items found for the current filters.
              </td>
            </tr>

            <tr
              v-for="item in items"
              v-else
              :key="item.id"
              :class="[ui.tableBodyRow, tableRowClass]"
            >
              <td :class="ui.tableCell">
                <div :class="ui.productCell">
                  <div :class="ui.imageWrap" :style="mutedSurfaceStyle">
                    <img
                      v-if="item.image_url"
                      :src="item.image_url"
                      :alt="item.name"
                      :class="ui.image"
                    >
                    <span v-else :class="ui.imageFallback" :style="mutedTextStyle">
                      {{ item.name.slice(0, 2).toUpperCase() }}
                    </span>
                  </div>

                  <div class="min-w-0">
                    <p :class="ui.productName" :style="textStyle">
                      {{ item.name }}
                    </p>
                    <p :class="ui.productSub" :style="mutedTextStyle">
                      SKU: {{ item.sku }}
                    </p>
                  </div>
                </div>
              </td>

              <td :class="ui.tableCell" :style="textStyle">
                {{ item.category_name }}
              </td>

              <td :class="ui.tableCell">
                <div :class="ui.stockCell">
                  <div :class="ui.stockValue" :style="textStyle">
                    {{ stockLevelLabel(item) }}
                  </div>
                  <div :class="ui.stockBar" :style="stockBarTrackStyle">
                    <div
                      :class="ui.stockBarFill"
                      :style="{
                        ...stockBarFillStyle(item.status),
                        width: `${stockRatio(item)}%`,
                      }"
                    />
                  </div>
                </div>
              </td>

              <td :class="ui.tableCell">
                <span :class="ui.statusBadge" :style="statusBadgeStyle(item.status)">
                  <span class="h-1.5 w-1.5 rounded-full bg-current" />
                  {{ statusLabel(item.status) }}
                </span>
              </td>

              <td :class="ui.tableCell">
                <div class="space-y-1">
                  <p class="text-sm font-medium" :style="textStyle">
                    {{ formatTimeAgo(item.last_updated) }}
                  </p>
                  <p class="text-xs" :style="mutedTextStyle">
                    {{ formatTimestamp(item.last_updated) }}
                  </p>
                </div>
              </td>

              <td :class="ui.tableCell">
                <div :class="ui.actionsCell">
                  <NuxtLink
                    :to="`/dashboard/products/${item.id}`"
                    :class="ui.actionButton"
                    :style="mutedSurfaceStyle"
                  >
                    <UIcon name="i-lucide-eye" class="h-4 w-4" />
                  </NuxtLink>
                  <button
                    type="button"
                    :class="ui.actionButton"
                    :style="mutedSurfaceStyle"
                    @click="openAdjustModal(item.id)"
                  >
                    <UIcon name="i-lucide-plus" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div :class="ui.tableFooter" :style="mutedTextStyle">
        <span>
          Showing {{ items.length }} of {{ summary.total_products }} entries
        </span>
        <span>
          Total quantity: {{ formatNumber(summary.total_quantity) }}
        </span>
      </div>
    </section>

    <div
      v-if="isAdjustModalOpen"
      :class="ui.modalOverlay"
      @click.self="closeAdjustModal()"
    >
      <div :class="ui.modalCard" :style="surfaceStyle">
        <div :class="ui.modalHeader">
          <div>
            <h2 :class="ui.modalTitle" :style="textStyle">
              Adjust Stock
            </h2>
            <p class="mt-1 text-sm" :style="mutedTextStyle">
              Apply a manual stock update and keep the inventory page in sync immediately.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
            :style="mutedSurfaceStyle"
            @click="closeAdjustModal()"
          >
            <UIcon name="i-lucide-x" class="h-5 w-5" />
          </button>
        </div>

        <div :class="ui.modalBody">
          <div :class="ui.fieldFull">
            <label :class="ui.label" :style="textStyle">Product</label>
            <select v-model="adjustProductId" :class="ui.select" :style="inputSurfaceStyle">
              <option
                v-for="item in items"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }} ({{ item.sku }})
              </option>
            </select>
          </div>

          <div :class="ui.fieldGrid">
            <div :class="ui.fieldGroup">
              <label :class="ui.label" :style="textStyle">Mode</label>
              <select v-model="adjustMode" :class="ui.select" :style="inputSurfaceStyle">
                <option value="increase">
                  Increase
                </option>
                <option value="decrease">
                  Decrease
                </option>
                <option value="set">
                  Set exact value
                </option>
              </select>
            </div>

            <div :class="ui.fieldGroup">
              <label :class="ui.label" :style="textStyle">Amount</label>
              <input
                v-model="adjustAmount"
                type="number"
                min="0"
                :class="ui.input"
                :style="inputSurfaceStyle"
              >
            </div>
          </div>

          <p :class="ui.helperText" :style="mutedTextStyle">
            <template v-if="selectedProduct">
              Current stock for {{ selectedProduct.name }}: {{ formatNumber(selectedProduct.stock_qty) }} units.
            </template>
            <template v-else>
              Select a product to continue.
            </template>
          </p>
        </div>

        <div :class="ui.modalFooter">
          <button
            type="button"
            :class="ui.secondaryButton"
            :style="mutedSurfaceStyle"
            @click="closeAdjustModal()"
          >
            Cancel
          </button>
          <button
            type="button"
            :class="ui.primaryButton"
            :style="primaryButtonStyle"
            :disabled="isSubmittingAdjustment || isAdjustingInventory"
            @click="submitAdjustment()"
          >
            Save Stock
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
