<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

type StockTone = "in_stock" | "low_stock" | "out_of_stock"
type QuickActionKey = "copy_sku" | "copy_id" | "refresh" | "back"

const route = useRoute()

const product = ref<ProductItem | null>(null)
const isLoadingPage = ref(false)
const errorMessage = ref("")
const successMessage = ref("")
const showDeleteDialog = ref(false)
const showStockDialog = ref(false)
const stockDraft = ref("0")

const productId = computed(() => {
  const rawId = route.params.id
  return Array.isArray(rawId) ? rawId[0] || "" : String(rawId || "")
})

const {
  categories,
  fetchCategories,
} = useCategories()
const {
  deleteProduct,
  fetchProductById,
  isDeletingProduct,
  isLoadingProduct,
  isUpdatingProduct,
  updateProduct,
} = useProducts()
const {
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
  textStyle,
  ui,
} = useProductDetailStyles()

const categoryName = computed(() => {
  if (!product.value) return "Unassigned"
  return categories.value.find((category) => category.id === product.value?.category_id)?.name || "Unknown category"
})

const stockTone = computed<StockTone>(() => {
  if (!product.value) return "out_of_stock"
  if (product.value.stock_qty <= 0) return "out_of_stock"
  if (product.value.stock_qty <= product.value.low_stock_threshold) return "low_stock"
  return "in_stock"
})

const stockLabel = computed(() =>
  stockTone.value === "in_stock"
    ? "Available"
    : stockTone.value === "low_stock"
      ? "Low Stock"
      : "Out of Stock",
)

const formattedCreatedAt = computed(() => {
  if (!product.value?.created_at) return "Recently added"

  const createdAt = new Date(product.value.created_at)
  if (Number.isNaN(createdAt.getTime())) return "Recently added"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(createdAt)
})

const inventoryValue = computed(() => {
  if (!product.value) return 0
  return (Number(product.value.sell_price) || 0) * product.value.stock_qty
})

const costValue = computed(() => Number(product.value?.cost_price || 0))
const sellValue = computed(() => Number(product.value?.sell_price || 0))
const profitPerUnit = computed(() => sellValue.value - costValue.value)

const marginPercent = computed(() => {
  if (!sellValue.value) return 0
  return Math.max(0, (profitPerUnit.value / sellValue.value) * 100)
})

const thresholdRatio = computed(() => {
  if (!product.value) return 0

  const threshold = Math.max(product.value.low_stock_threshold, 1)
  return (product.value.stock_qty / threshold) * 100
})

const narrativeText = computed(() =>
  product.value?.description || "No product narrative has been added yet.",
)

const quickActions = [
  {
    key: "copy_sku" as const,
    label: "Copy SKU",
    icon: "i-lucide-scan-line",
    tone: "primary" as const,
  },
  {
    key: "copy_id" as const,
    label: "Copy Product ID",
    icon: "i-lucide-copy",
    tone: "neutral" as const,
  },
  {
    key: "refresh" as const,
    label: "Refresh Data",
    icon: "i-lucide-refresh-cw",
    tone: "neutral" as const,
  },
  {
    key: "back" as const,
    label: "Back To List",
    icon: "i-lucide-arrow-left",
    tone: "neutral" as const,
  },
]

const activityItems = computed(() => {
  if (!product.value) return []

  return [
    {
      icon: "i-lucide-package-plus",
      label: "Product record loaded",
      detail: `${product.value.name} is synced from the API.`,
      tone: "success" as const,
    },
    {
      icon: "i-lucide-box",
      label: `${product.value.stock_qty} units on hand`,
      detail: `${stockLabel.value} with a reorder threshold of ${product.value.low_stock_threshold}.`,
      tone: "primary" as const,
    },
    {
      icon: "i-lucide-calendar-clock",
      label: "Last updated",
      detail: product.value.updated_at || product.value.created_at || "No update timestamp available.",
      tone: "neutral" as const,
    },
  ]
})

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)

const dismissAlerts = () => {
  errorMessage.value = ""
  successMessage.value = ""
}

const loadProduct = async () => {
  if (!productId.value) {
    errorMessage.value = "Missing product ID."
    return
  }

  isLoadingPage.value = true
  dismissAlerts()

  try {
    const [loadedProduct] = await Promise.all([
      fetchProductById(productId.value),
      fetchCategories().catch(() => null),
    ])

    product.value = loadedProduct
    stockDraft.value = String(loadedProduct.stock_qty)
  } catch (error: any) {
    product.value = null
    errorMessage.value = error?.data?.detail || "Unable to load product detail."
  } finally {
    isLoadingPage.value = false
  }
}

const openEditScreen = async () => {
  await navigateTo({
    path: "/dashboard/products",
    query: { edit: productId.value },
  })
}

const goBackToProducts = async () => {
  await navigateTo("/dashboard/products")
}

const openStockDialog = () => {
  if (!product.value) return
  stockDraft.value = String(product.value.stock_qty)
  showStockDialog.value = true
}

const closeStockDialog = () => {
  showStockDialog.value = false
}

const applyStockAdjustment = async () => {
  if (!product.value) return

  const nextStock = Math.max(0, Number.parseInt(stockDraft.value, 10) || 0)

  try {
    const updated = await updateProduct(product.value.id, {
      category_id: product.value.category_id,
      name: product.value.name,
      name_lc: product.value.name_lc,
      sku: product.value.sku,
      barcode: product.value.barcode,
      description: product.value.description,
      description_lc: product.value.description_lc,
      image_url: product.value.image_url,
      cost_price: Number(product.value.cost_price) || 0,
      sell_price: Number(product.value.sell_price) || 0,
      stock_qty: nextStock,
      low_stock_threshold: product.value.low_stock_threshold,
      is_active: product.value.is_active,
    })

    product.value = updated
    stockDraft.value = String(updated.stock_qty)
    successMessage.value = "Stock updated successfully."
    closeStockDialog()
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to adjust stock."
  }
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
}

const confirmDelete = async () => {
  if (!product.value) return

  try {
    await deleteProduct(product.value.id)
    await navigateTo("/dashboard/products")
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to delete product."
  }
}

const handleQuickAction = async (action: QuickActionKey) => {
  if (!product.value) return

  try {
    if (action === "copy_sku") {
      if (import.meta.client) {
        await navigator.clipboard.writeText(product.value.sku)
      }
      successMessage.value = "SKU copied."
      return
    }

    if (action === "copy_id") {
      if (import.meta.client) {
        await navigator.clipboard.writeText(product.value.id)
      }
      successMessage.value = "Product ID copied."
      return
    }

    if (action === "refresh") {
      await loadProduct()
      successMessage.value = "Product data refreshed."
      return
    }

    await navigateTo("/dashboard/products")
  } catch {
    errorMessage.value = "Unable to complete that action."
  }
}

watch(productId, async () => {
  await loadProduct()
}, { immediate: true })
</script>

<template>
  <section :class="ui.page">
    <div
      v-if="showDeleteDialog"
      :class="ui.dialogOverlay"
      @click.self="closeDeleteDialog"
    >
      <div :class="ui.dialogCard" :style="surfaceStyle">
        <h3 :class="ui.dialogTitle" :style="textStyle">Delete Product</h3>
        <p :class="ui.dialogText" :style="mutedTextStyle">
          Delete this product record permanently? This action cannot be undone.
        </p>
        <div :class="ui.dialogActions">
          <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="closeDeleteDialog">Cancel</button>
          <button type="button" :disabled="isDeletingProduct" :class="ui.primaryButton" :style="primaryButtonStyle" @click="confirmDelete">
            <UIcon v-if="isDeletingProduct" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showStockDialog"
      :class="ui.dialogOverlay"
      @click.self="closeStockDialog"
    >
      <div :class="ui.dialogCard" :style="surfaceStyle">
        <h3 :class="ui.dialogTitle" :style="textStyle">Adjust Stock</h3>
        <p :class="ui.dialogText" :style="mutedTextStyle">
          Update the current stock quantity for this product.
        </p>
        <div class="mt-5">
          <input v-model="stockDraft" type="number" min="0" step="1" :class="ui.input" :style="mutedSurfaceStyle" />
        </div>
        <div :class="ui.dialogActions">
          <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="closeStockDialog">Cancel</button>
          <button type="button" :disabled="isUpdatingProduct" :class="ui.primaryButton" :style="primaryButtonStyle" @click="applyStockAdjustment">
            <UIcon v-if="isUpdatingProduct" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
            Save Stock
          </button>
        </div>
      </div>
    </div>

    <div :class="ui.topbar">
      <div :class="ui.titleBlock">
        <div :class="ui.breadcrumb" :style="mutedTextStyle">
          <NuxtLink to="/dashboard">Inventory</NuxtLink>
          <span>/</span>
          <NuxtLink to="/dashboard/products">Products</NuxtLink>
          <span>/</span>
          <span :class="ui.breadcrumbCurrent" :style="textStyle">Product Detail</span>
        </div>

        <template v-if="product">
          <div :class="ui.titleMeta">
            <span :class="ui.badge" :style="mutedSurfaceStyle">SKU: {{ product.sku }}</span>
            <span :class="ui.badge" :style="statusBadgeStyle(product.is_active)">
              <span class="h-2 w-2 rounded-full bg-current" />
              {{ product.is_active ? "Active" : "Inactive" }}
            </span>
            <span :class="ui.badge" :style="stockBadgeStyle(stockTone)">
              {{ stockLabel }}
            </span>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="goBackToProducts">
                <UIcon name="i-lucide-arrow-left" class="mr-2 h-4 w-4" />
                Back
              </button>
              <h1 :class="ui.title" :style="textStyle">{{ product.name }}</h1>
            </div>
          </div>
        </template>
      </div>

      <div v-if="product" :class="ui.actionRow">
        <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="showDeleteDialog = true">
          <UIcon name="i-lucide-trash-2" class="mr-2 h-4 w-4" />
          Delete
        </button>
        <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="openEditScreen">
          <UIcon name="i-lucide-pencil" class="mr-2 h-4 w-4" />
          Edit
        </button>
        <button type="button" :class="ui.primaryButton" :style="primaryButtonStyle" @click="openStockDialog">
          <UIcon name="i-lucide-arrow-left-right" class="mr-2 h-4 w-4" />
          Adjust Stock
        </button>
      </div>
    </div>

    <div v-if="successMessage" class="rounded-[10px] border px-4 py-4" :style="{ borderColor: 'rgba(16,185,129,0.25)', backgroundColor: 'rgba(236,253,245,0.9)', color: '#047857' }">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" :class="ui.errorState" :style="{ borderColor: 'rgba(244,63,94,0.22)', backgroundColor: 'rgba(255,241,242,0.92)', color: '#be123c' }">
      {{ errorMessage }}
    </div>

    <div v-else-if="isLoadingPage || isLoadingProduct" :class="ui.emptyState" :style="mutedSurfaceStyle">
      <span :style="mutedTextStyle">Loading product detail...</span>
    </div>

    <div v-else-if="product" :class="ui.contentGrid">
      <div :class="ui.mainStack">
        <section :class="ui.heroCard" :style="surfaceStyle">
          <div :class="ui.heroGrid">
            <div :class="ui.mediaPanel" :style="heroMediaStyle">
              <div :class="ui.mediaImageWrap" :style="surfaceStyle">
                <img v-if="product.image_url" :src="product.image_url" :alt="product.name" :class="ui.mediaImage" />
                <div v-else class="flex min-h-[14rem] items-center justify-center" :style="mutedSurfaceStyle">
                  <UIcon name="i-lucide-image-off" class="h-10 w-10" :style="mutedTextStyle" />
                </div>
              </div>
              <span :class="ui.featureBadge" :style="statusBadgeStyle(product.is_active)">
                {{ product.is_active ? "Catalog Ready" : "Needs Review" }}
              </span>
            </div>

            <div :class="ui.infoPanel">
              <div :class="ui.infoGrid">
                <div :class="ui.infoBlock">
                  <p :class="ui.infoLabel" :style="mutedTextStyle">Product ID</p>
                  <p :class="ui.infoValue" :style="textStyle">{{ product.id }}</p>
                </div>
                <div :class="ui.infoBlock">
                  <p :class="ui.infoLabel" :style="mutedTextStyle">Category</p>
                  <p :class="ui.infoValue" :style="textStyle">{{ categoryName }}</p>
                </div>
                <div :class="ui.infoBlock">
                  <p :class="ui.infoLabel" :style="mutedTextStyle">Barcode</p>
                  <p :class="ui.infoValue" :style="textStyle">{{ product.barcode || "Not assigned" }}</p>
                </div>
                <div :class="ui.infoBlock">
                  <p :class="ui.infoLabel" :style="mutedTextStyle">Added On</p>
                  <p :class="ui.infoValue" :style="textStyle">{{ formattedCreatedAt }}</p>
                </div>
              </div>

              <div :class="ui.infoFooter" :style="{ borderColor: 'var(--app-border)' }">
                <span :class="ui.avatar" :style="{ backgroundColor: 'rgba(59,130,246,0.14)', color: '#3b82f6' }">PR</span>
                <span :class="ui.avatar" :style="{ backgroundColor: 'rgba(15,23,42,0.14)', color: 'var(--app-fg)' }">ID</span>
                <p :class="ui.infoSub" :style="mutedTextStyle">Live product record with API-backed pricing and stock values.</p>
              </div>
            </div>
          </div>
        </section>

        <section :class="ui.card" :style="surfaceStyle">
          <div class="pt-1">
            <h2 :class="ui.sectionTitle" :style="textStyle">Product Narrative</h2>
            <p :class="ui.paragraph" :style="mutedTextStyle">{{ narrativeText }}</p>

            <div :class="ui.chipGrid">
              <div :class="ui.chip" :style="mutedSurfaceStyle">
                <UIcon name="i-lucide-shield-check" class="h-4 w-4 text-blue-500" />
                <span :style="textStyle">Threshold: {{ product.low_stock_threshold }} units</span>
              </div>
            </div>
          </div>
        </section>

        <div :class="ui.summaryGrid">
          <section :class="ui.summaryCard" :style="surfaceStyle">
            <p :class="ui.summaryLabel" :style="mutedTextStyle">Financial Summary</p>
            <p :class="ui.summaryValue" :style="textStyle">{{ formatCurrency(sellValue) }}</p>
            <p :class="ui.summaryMeta" :style="mutedTextStyle">Retail price per unit</p>

            <div :class="ui.metricRow">
              <div :class="ui.metricTile" :style="mutedSurfaceStyle">
                <p :class="ui.metricTileLabel" :style="mutedTextStyle">Cost</p>
                <p :class="ui.metricTileValue" :style="textStyle">{{ formatCurrency(costValue) }}</p>
              </div>
              <div :class="ui.metricTile" :style="mutedSurfaceStyle">
                <p :class="ui.metricTileLabel" :style="mutedTextStyle">Profit / Unit</p>
                <p :class="ui.metricTileValue" :style="{ color: '#10b981' }">{{ formatCurrency(profitPerUnit) }}</p>
              </div>
            </div>
          </section>

          <section :class="ui.summaryCard" :style="surfaceStyle">
            <p :class="ui.summaryLabel" :style="{ color: '#3b82f6' }">Profit Margin</p>
            <p :class="ui.summaryValue" :style="textStyle">{{ marginPercent.toFixed(1) }}%</p>
            <p :class="ui.summaryMeta" :style="mutedTextStyle">{{ formatCurrency(inventoryValue) }} total inventory value</p>

            <div class="mt-8 flex h-24 items-end gap-2">
              <span v-for="bar in [28, 41, 56, 64, 82]" :key="bar" class="flex-1 rounded-t-[10px]" :style="{ height: `${bar}%`, backgroundColor: bar === 82 ? '#3b82f6' : 'rgba(59,130,246,0.22)' }" />
            </div>
          </section>
        </div>
      </div>

      <div :class="ui.sideStack">
        <section :class="ui.stockCard" :style="surfaceStyle">
          <div class="flex items-center justify-between gap-3">
            <p :class="ui.summaryLabel" :style="mutedTextStyle">Available Stock</p>
            <UIcon name="i-lucide-chart-column-big" class="h-5 w-5 text-blue-500" />
          </div>
          <p :class="ui.stockValue" :style="textStyle">{{ product.stock_qty }}</p>
          <p :class="ui.stockSub" :style="mutedTextStyle">Current units available</p>

          <div :class="ui.progressCard" :style="mutedSurfaceStyle">
            <div :class="ui.progressLabel" :style="textStyle">
              <span>Low Stock Threshold</span>
              <span>{{ product.low_stock_threshold }} Units</span>
            </div>
            <div :class="ui.progressTrack" :style="progressTrackStyle">
              <div :class="ui.progressFill" :style="progressFillStyle(thresholdRatio)" />
            </div>
          </div>

          <button type="button" class="mt-5 w-full" :class="ui.primaryButton" :style="primaryButtonStyle" @click="openStockDialog">
            Create Reorder PO
          </button>
        </section>

        <section :class="ui.card" :style="surfaceStyle">
          <h3 :class="ui.sectionTitle" :style="textStyle">Quick Actions</h3>
          <div :class="ui.quickGrid">
            <button
              v-for="action in quickActions"
              :key="action.key"
              type="button"
              :class="ui.quickButton"
              :style="quickActionStyle(action.tone)"
              @click="handleQuickAction(action.key)"
            >
              <UIcon :name="action.icon" class="h-6 w-6" />
              <span>{{ action.label }}</span>
            </button>
          </div>
        </section>

        <section :class="ui.card" :style="surfaceStyle">
          <h3 :class="ui.sectionTitle" :style="textStyle">Recent Activity</h3>
          <div :class="ui.activityList">
            <div v-for="item in activityItems" :key="item.label" :class="ui.activityItem" :style="mutedSurfaceStyle">
              <span
                :class="ui.activityIcon"
                :style="item.tone === 'success'
                  ? { backgroundColor: 'rgba(16,185,129,0.14)', color: '#10b981' }
                  : item.tone === 'primary'
                    ? { backgroundColor: 'rgba(59,130,246,0.14)', color: '#3b82f6' }
                    : { backgroundColor: 'rgba(148,163,184,0.14)', color: 'var(--app-fg-muted)' }"
              >
                <UIcon :name="item.icon" class="h-4 w-4" />
              </span>
              <div>
                <p class="text-sm font-semibold" :style="textStyle">{{ item.label }}</p>
                <p class="mt-1 text-sm leading-6" :style="mutedTextStyle">{{ item.detail }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
