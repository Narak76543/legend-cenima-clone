<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

type StockTone = "in_stock" | "low_stock" | "out_of_stock"
type EditableProduct = {
  id: string
  category_id: string
  name: string
  name_lc: string
  sku: string
  barcode: string | null
  description: string | null
  description_lc: string | null
  image_url: string | null
  cost_price: string | number
  sell_price: string | number
  stock_qty: number
  low_stock_threshold: number
  is_active: boolean
}

const route = useRoute()
const editingProductId = ref<string | null>(null)
const showProductDrawer = ref(false)
const showDeleteDialog = ref(false)
const productPendingDelete = ref<{ id: string, name: string } | null>(null)
const hasLoaded = ref(false)
const isSubmitting = ref(false)
const searchQuery = ref("")
const errorMessage = ref("")
const successMessage = ref("")

const productName = ref("")
const categoryId = ref("")
const sku = ref("")
const barcode = ref("")
const description = ref("")
const imageUrl = ref<string | null>(null)
const costPrice = ref("0")
const sellPrice = ref("0")
const stockQty = ref("0")
const lowStockThreshold = ref("5")
const isActive = ref(true)

const {
  categories,
  fetchCategories,
  isLoadingCategories,
} = useCategories()
const {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  isCreatingProduct,
  isDeletingProduct,
  isLoadingProducts,
  isUpdatingProduct,
  products,
  updateProduct,
} = useProducts()
const { prepareProfileImage } = useProfileImage()
const {
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
} = useProductPageStyles()

const resolvedNameLc = computed(() => productName.value.trim().toLowerCase())
const isEditing = computed(() => Boolean(editingProductId.value))

const filteredProducts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  if (!keyword) return products.value

  return products.value.filter((product) =>
    product.name.toLowerCase().includes(keyword)
    || product.sku.toLowerCase().includes(keyword)
    || product.id.toLowerCase().includes(keyword),
  )
})

const toNumber = (value: string, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toInteger = (value: string, fallback = 0) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

const getCategoryName = (categoryIdValue: string) =>
  categories.value.find((category) => category.id === categoryIdValue)?.name || "Unknown"

const getStockTone = (stockQtyValue: number, lowStockThresholdValue: number): StockTone => {
  if (stockQtyValue <= 0) return "out_of_stock"
  if (stockQtyValue <= lowStockThresholdValue) return "low_stock"
  return "in_stock"
}

const getStockLabel = (tone: StockTone) =>
  tone === "in_stock" ? "In Stock" : tone === "low_stock" ? "Low Stock" : "Out of Stock"

const formatCurrency = (value: string | number) => {
  const amount = typeof value === "number" ? value : Number.parseFloat(value)
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)
}

const formatDate = (value: string | null) => {
  if (!value) return "Just now"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Just now"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

const inventoryValue = computed(() =>
  products.value.reduce((total, product) =>
    total + (Number(product.sell_price) || 0) * product.stock_qty, 0),
)

const lowStockCount = computed(() =>
  products.value.filter((product) =>
    product.stock_qty > 0 && product.stock_qty <= product.low_stock_threshold,
  ).length,
)

const outOfStockCount = computed(() =>
  products.value.filter((product) => product.stock_qty <= 0).length,
)

const statCards = computed(() => [
  {
    label: "Total Products",
    value: products.value.length.toLocaleString(),
    meta: `${filteredProducts.value.length} visible`,
    tone: "primary" as const,
    icon: "i-lucide-package-check",
  },
  {
    label: "Low Stock",
    value: lowStockCount.value.toString(),
    meta: lowStockCount.value ? "Needs reorder" : "Healthy",
    tone: "warning" as const,
    icon: "i-lucide-triangle-alert",
  },
  {
    label: "Out of Stock",
    value: outOfStockCount.value.toString(),
    meta: outOfStockCount.value ? "Requires action" : "None",
    tone: "danger" as const,
    icon: "i-lucide-badge-alert",
  },
  {
    label: "Inventory Value",
    value: formatCurrency(inventoryValue.value),
    meta: "Live valuation",
    tone: "success" as const,
    icon: "i-lucide-wallet",
  },
])

const resetForm = () => {
  editingProductId.value = null
  productName.value = ""
  categoryId.value = categories.value[0]?.id || ""
  sku.value = ""
  barcode.value = ""
  description.value = ""
  imageUrl.value = null
  costPrice.value = "0"
  sellPrice.value = "0"
  stockQty.value = "0"
  lowStockThreshold.value = "5"
  isActive.value = true
}

const openDrawerFromQuery = async () => {
  const requestedId = typeof route.query.edit === "string" ? route.query.edit : ""

  if (!requestedId) return

  const existingProduct = products.value.find((product) => product.id === requestedId)
  if (existingProduct) {
    openProductDrawer(existingProduct)
    return
  }

  try {
    const loadedProduct = await fetchProductById(requestedId)
    openProductDrawer(loadedProduct)
  } catch {
    errorMessage.value = "Unable to open the selected product for editing."
  }
}

const dismissAlerts = () => {
  errorMessage.value = ""
  successMessage.value = ""
}

const openProductDrawer = (product?: EditableProduct) => {
  dismissAlerts()

  if (product) {
    editingProductId.value = product.id
    productName.value = product.name
    categoryId.value = product.category_id
    sku.value = product.sku
    barcode.value = product.barcode || ""
    description.value = product.description || ""
    imageUrl.value = product.image_url
    costPrice.value = String(product.cost_price ?? "0")
    sellPrice.value = String(product.sell_price ?? "0")
    stockQty.value = String(product.stock_qty ?? 0)
    lowStockThreshold.value = String(product.low_stock_threshold ?? 5)
    isActive.value = product.is_active
  } else {
    resetForm()
  }

  showProductDrawer.value = true
}

const closeProductDrawer = () => {
  showProductDrawer.value = false
}

const loadProductData = async () => {
  try {
    await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ])

    if (!categoryId.value) {
      categoryId.value = categories.value[0]?.id || ""
    }

    hasLoaded.value = true
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to load product data."
  }
}

const syncProductImage = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (!file.type.startsWith("image/")) {
    errorMessage.value = "Please choose a valid image file."
    input.value = ""
    return
  }

  try {
    imageUrl.value = await prepareProfileImage(file)
    errorMessage.value = ""
  } catch {
    errorMessage.value = "Unable to process the selected image."
    input.value = ""
  }
}

const submitProduct = async () => {
  dismissAlerts()

  if (!productName.value.trim()) {
    errorMessage.value = "Product name is required."
    showProductDrawer.value = true
    return
  }

  if (!categoryId.value) {
    errorMessage.value = "Category is required."
    showProductDrawer.value = true
    return
  }

  if (!sku.value.trim()) {
    errorMessage.value = "SKU is required."
    showProductDrawer.value = true
    return
  }

  isSubmitting.value = true

  const payload = {
    category_id: categoryId.value,
    name: productName.value.trim(),
    name_lc: resolvedNameLc.value.trim(),
    sku: sku.value.trim(),
    barcode: barcode.value.trim() || null,
    description: description.value.trim() || null,
    description_lc: description.value.trim() || null,
    image_url: imageUrl.value,
    cost_price: toNumber(costPrice.value),
    sell_price: toNumber(sellPrice.value),
    stock_qty: toInteger(stockQty.value),
    low_stock_threshold: toInteger(lowStockThreshold.value, 5),
    is_active: isActive.value,
  }

  try {
    if (editingProductId.value) {
      await updateProduct(editingProductId.value, payload)
      successMessage.value = "Product updated successfully."
    } else {
      await createProduct(payload)
      successMessage.value = "Product created successfully."
    }

    resetForm()
    closeProductDrawer()
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || (editingProductId.value ? "Unable to update product." : "Unable to create product.")
  } finally {
    isSubmitting.value = false
  }
}

const askDeleteProduct = (id: string, name: string) => {
  dismissAlerts()
  productPendingDelete.value = { id, name }
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  productPendingDelete.value = null
}

const confirmDeleteProduct = async () => {
  if (!productPendingDelete.value) return

  try {
    await deleteProduct(productPendingDelete.value.id)
    successMessage.value = "Product deleted successfully."
    closeDeleteDialog()
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to delete product."
  }
}

onMounted(async () => {
  if (hasLoaded.value) return
  await loadProductData()
  await openDrawerFromQuery()
})
</script>

<template>
  <section :class="ui.page">
    <div
      v-if="showDeleteDialog && productPendingDelete"
      :class="ui.modalOverlay"
      @click.self="closeDeleteDialog"
    >
      <div :class="ui.modalCard" :style="surfaceStyle">
        <h3 :class="ui.modalTitle" :style="textStyle">Delete Product</h3>
        <p :class="ui.modalBody" :style="mutedTextStyle">
          Are you sure you want to delete
          <span class="font-semibold" :style="textStyle">{{ productPendingDelete.name }}</span>
          ? This action cannot be undone.
        </p>
        <div :class="ui.modalActions">
          <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="closeDeleteDialog">Cancel</button>
          <button type="button" :disabled="isDeletingProduct" :class="ui.primaryButton" :style="primaryButtonStyle" @click="confirmDeleteProduct">
            <UIcon v-if="isDeletingProduct" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showProductDrawer"
      :class="ui.drawerOverlay"
      @click.self="closeProductDrawer"
    >
      <aside :class="ui.drawerPanel" :style="surfaceStyle">
        <div :class="ui.drawerHeader" :style="{ borderColor: 'var(--app-border)' }">
          <div>
            <h2 :class="ui.drawerTitle" :style="textStyle">{{ isEditing ? "Update Product" : "New Product" }}</h2>
            <p class="mt-1 text-sm" :style="mutedTextStyle">Add or update product information from the inventory panel.</p>
          </div>
          <button type="button" :class="ui.iconButton" :style="iconButtonStyle" @click="closeProductDrawer">
            <UIcon name="i-lucide-x" class="h-4 w-4" />
          </button>
        </div>

        <div :class="ui.drawerBody">
          <div :class="ui.drawerSection">
            <p :class="ui.drawerSectionTitle" :style="mutedTextStyle">Basic Information</p>
            <div :class="ui.fieldGrid">
              <div :class="ui.fieldGroupFull">
                <label :class="ui.label" :style="textStyle">Product Name (EN)</label>
                <input v-model.trim="productName" type="text" :class="ui.input" :style="inputSurfaceStyle" placeholder="e.g. Wireless Headphones" />
              </div>
              <div :class="ui.fieldGroupFull">
                <label :class="ui.label" :style="textStyle">Category</label>
                <select v-model="categoryId" :class="ui.select" :style="inputSurfaceStyle">
                  <option value="" disabled>Select category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <div :class="ui.drawerSection" class="mt-8">
            <p :class="ui.drawerSectionTitle" :style="mutedTextStyle">Inventory & Tracking</p>
            <div :class="ui.fieldGrid">
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">SKU</label>
                <input v-model.trim="sku" type="text" :class="ui.input" :style="inputSurfaceStyle" placeholder="e.g. SNY-WH1000-XM5" />
              </div>
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">Barcode</label>
                <input v-model.trim="barcode" type="text" :class="ui.input" :style="inputSurfaceStyle" placeholder="EAN / UPC" />
              </div>
            </div>
          </div>

          <div :class="ui.drawerSection" class="mt-8">
            <p :class="ui.drawerSectionTitle" :style="mutedTextStyle">Pricing & Stock</p>
            <div :class="ui.fieldGrid">
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">Sell Price</label>
                <input v-model="sellPrice" type="number" min="0" step="0.01" :class="ui.input" :style="inputSurfaceStyle" />
              </div>
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">Cost Price</label>
                <input v-model="costPrice" type="number" min="0" step="0.01" :class="ui.input" :style="inputSurfaceStyle" />
              </div>
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">Initial Stock</label>
                <input v-model="stockQty" type="number" min="0" step="1" :class="ui.input" :style="inputSurfaceStyle" />
              </div>
              <div :class="ui.fieldGroup">
                <label :class="ui.label" :style="textStyle">Low Stock Threshold</label>
                <input v-model="lowStockThreshold" type="number" min="0" step="1" :class="ui.input" :style="inputSurfaceStyle" />
              </div>
            </div>
          </div>

          <div :class="ui.drawerSection" class="mt-8">
            <p :class="ui.drawerSectionTitle" :style="mutedTextStyle">Media & Description</p>
            <div :class="ui.fieldGrid">
              <div :class="ui.fieldGroupFull">
                <label :class="ui.label" :style="textStyle">Description</label>
                <textarea v-model.trim="description" rows="4" :class="ui.textarea" :style="inputSurfaceStyle" placeholder="Describe the product features and details..." />
              </div>
              <div :class="ui.fieldGroupFull">
                <label :class="ui.label" :style="textStyle">Product Image</label>
                <div :class="ui.uploadCard" :style="uploadSurfaceStyle">
                  <label :class="ui.uploadDropzone" :style="uploadSurfaceStyle">
                    <img v-if="imageUrl" :src="imageUrl" alt="Product preview" :class="ui.uploadPreview" />
                    <template v-else>
                      <div :class="ui.uploadIconWrap" class="bg-blue-100 text-blue-700">
                        <UIcon name="i-lucide-upload" class="h-7 w-7" />
                      </div>
                      <p class="text-sm font-semibold" :style="textStyle">Click to upload product image</p>
                      <p class="mt-2 text-sm" :style="mutedTextStyle">The image is stored in the API as `image_url`.</p>
                    </template>
                    <input type="file" accept="image/*" class="hidden" @change="syncProductImage" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :class="ui.drawerFooter" :style="{ borderColor: 'var(--app-border)' }">
          <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="closeProductDrawer">Discard</button>
          <button
            type="button"
            :disabled="isSubmitting || isCreatingProduct || isUpdatingProduct"
            :class="ui.primaryButton"
            :style="primaryButtonStyle"
            @click="submitProduct"
          >
            <UIcon v-if="isSubmitting || isCreatingProduct || isUpdatingProduct" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
            {{ isEditing ? "Update Product" : "Save Product" }}
          </button>
        </div>
      </aside>
    </div>

    <div :class="ui.topbar">
      <div :class="ui.titleBlock">
        <div :class="ui.breadcrumb" :style="mutedTextStyle">
          <span>Inventory</span>
          <span>/</span>
          <span :class="ui.breadcrumbCurrent" :style="textStyle">Products</span>
        </div>
        <div>
          <h1 :class="ui.title" :style="textStyle">Product Management</h1>
          <p :class="ui.subtitle" :style="mutedTextStyle">Real-time oversight of SKU performance, pricing, and availability.</p>
        </div>
      </div>
    </div>

    <div :class="ui.toolbar">
      <div :class="ui.searchWrap">
        <div :class="ui.searchIcon" :style="mutedTextStyle">
          <UIcon name="i-lucide-search" class="h-5 w-5" />
        </div>
        <input
          v-model.trim="searchQuery"
          type="text"
          placeholder="Search product name, SKU, or ID..."
          :class="ui.searchInput"
          :style="searchSurfaceStyle"
        />
      </div>

      <div :class="ui.actionRow">
        <button type="button" :class="ui.secondaryButton" :style="mutedSurfaceStyle" @click="loadProductData">
          <UIcon name="i-lucide-refresh-cw" class="mr-2 h-4 w-4" :class="{ 'animate-spin': isLoadingProducts || isLoadingCategories }" />
          Refresh
        </button>
        <button type="button" :class="ui.primaryButton" :style="primaryButtonStyle" @click="openProductDrawer()">
          <UIcon name="i-lucide-plus" class="mr-2 h-4 w-4" />
          New Product
        </button>
      </div>
    </div>

    <div :class="ui.statsGrid">
      <article v-for="card in statCards" :key="card.label" :class="ui.statCard" :style="surfaceStyle">
        <div :class="ui.statHeader">
          <p :class="ui.statLabel" :style="mutedTextStyle">{{ card.label }}</p>
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl" :style="statIconStyle(card.tone)">
            <UIcon :name="card.icon" class="h-6 w-6" />
          </span>
        </div>
        <div :class="ui.statValueRow">
          <p :class="ui.statValue" :style="textStyle">{{ card.value }}</p>
          <span :class="ui.statMeta" :style="statMetaStyle(card.tone)">{{ card.meta }}</span>
        </div>
      </article>
    </div>

    <div v-if="successMessage" class="rounded-[10px] border px-4 py-4" :style="{ borderColor: 'rgba(16,185,129,0.25)', backgroundColor: 'rgba(236,253,245,0.9)', color: '#047857' }">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="rounded-[10px] border px-4 py-4" :style="{ borderColor: 'rgba(244,63,94,0.22)', backgroundColor: 'rgba(255,241,242,0.92)', color: '#be123c' }">
      {{ errorMessage }}
    </div>

    <section :class="ui.tablePanel" :style="surfaceStyle">
      <div :class="ui.tableHeader" :style="{ borderColor: 'var(--app-border)' }">
        <div>
          <h2 :class="ui.tableTitle" :style="textStyle">Recent Inventory Items</h2>
          <p class="mt-1 text-sm" :style="mutedTextStyle">Showing {{ filteredProducts.length }} of {{ products.length }} products from the API.</p>
        </div>
        <div :class="ui.tableBadgeRow">
          <span :class="ui.badge" :style="summaryBadgeStyle('primary')">{{ products.length }} total</span>
          <span :class="ui.badge" :style="summaryBadgeStyle('success')">{{ filteredProducts.length }} visible</span>
        </div>
      </div>

      <div v-if="isLoadingProducts" :class="ui.emptyState" :style="mutedTextStyle">Loading products...</div>
      <div v-else-if="!filteredProducts.length" :class="ui.emptyState" :style="mutedTextStyle">No products found. Add a product to get started.</div>
      <div v-else :class="ui.tableWrap">
        <table :class="ui.table">
          <thead :class="ui.tableHead" :style="mutedTextStyle">
            <tr>
              <th :class="ui.tableHeadCell">Product</th>
              <th :class="ui.tableHeadCell">Category</th>
              <th :class="ui.tableHeadCell">Status</th>
              <th :class="ui.tableHeadCell">Stock</th>
              <th :class="ui.tableHeadCell">Value</th>
              <th :class="ui.tableHeadCell">Actions</th>
            </tr>
          </thead>
          <tbody :class="ui.tableBody" :style="{ borderColor: 'var(--app-border)' }">
            <tr v-for="product in filteredProducts" :key="product.id" :class="[ui.tableRow, tableRowClass]">
              <td :class="ui.tableCell">
                <NuxtLink :to="`/dashboard/products/${product.id}`" :class="ui.productMain">
                  <div :class="ui.productImage" :style="mutedSurfaceStyle">
                    <img v-if="product.image_url" :src="product.image_url" :alt="product.name" class="h-full w-full object-cover" />
                    <UIcon v-else name="i-lucide-package-2" class="h-5 w-5" :style="mutedTextStyle" />
                  </div>
                  <div :class="ui.productMeta">
                    <p :class="ui.productName" :style="textStyle">{{ product.name }}</p>
                    <p :class="ui.productSub" :style="mutedTextStyle">SKU: {{ product.sku }}</p>
                  </div>
                </NuxtLink>
              </td>
              <td :class="ui.tableCell">
                <span class="text-sm" :style="mutedTextStyle">{{ getCategoryName(product.category_id) }}</span>
              </td>
              <td :class="ui.tableCell">
                <span :class="ui.badge" :style="statusBadgeStyle(getStockTone(product.stock_qty, product.low_stock_threshold))">
                  {{ getStockLabel(getStockTone(product.stock_qty, product.low_stock_threshold)) }}
                </span>
              </td>
              <td :class="ui.tableCell">
                <div :class="ui.stockWrap">
                  <p :class="ui.stockValue" :style="textStyle">{{ product.stock_qty }}</p>
                  <p :class="ui.stockUnit" :style="mutedTextStyle">Units</p>
                </div>
              </td>
              <td :class="ui.tableCell">
                <span :class="ui.valueText" :style="textStyle">{{ formatCurrency((Number(product.sell_price) || 0) * product.stock_qty) }}</span>
                <p :class="ui.productSub" :style="mutedTextStyle">{{ formatDate(product.updated_at || product.created_at) }}</p>
              </td>
              <td :class="ui.tableCell">
                <div :class="ui.rowActions">
                  <button type="button" :class="ui.iconButton" :style="iconButtonStyle" @click="openProductDrawer(product)">
                    <UIcon name="i-lucide-pencil" class="h-4 w-4" />
                  </button>
                  <button type="button" :disabled="isDeletingProduct" :class="ui.iconButton" :style="iconButtonStyle" @click="askDeleteProduct(product.id, product.name)">
                    <UIcon name="i-lucide-trash-2" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
