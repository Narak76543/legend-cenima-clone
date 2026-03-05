<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
})

const name                  = ref("")
const imageUrl              = ref<string | null>(null)
const isActive              = ref(true)
const editingCategoryId     = ref<string | null>(null)
const isSubmitting          = ref(false)
const hasLoaded             = ref(false)
const showCreateForm        = ref(false)
const searchQuery           = ref("")
const errorMessage          = ref("")
const successMessage        = ref("")
const showDeleteDialog      = ref(false)
const categoryPendingDelete = ref<{ id: string, name: string } | null>(null)

const {
  categories,
  createCategory,
  deleteCategory,
  fetchCategories,
  isCreatingCategory,
  isDeletingCategory,
  isLoadingCategories,
  isUpdatingCategory,
  updateCategory,
} = useCategories()
const { prepareProfileImage } = useProfileImage()
const {
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
} = useCategoryPageStyles()

const resolvedNameLc = computed(() => name.value.trim().toLowerCase())
const isEditing = computed(() => Boolean(editingCategoryId.value))

const filteredCategories = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  if (!keyword) return categories.value

  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(keyword)
    || category.id.toLowerCase().includes(keyword),
  )
})

const totalCategories = computed(() => categories.value.length)
const activeCategories = computed(() => categories.value.filter((category) => category.is_active).length)
const inactiveCategories = computed(() => totalCategories.value - activeCategories.value)

const statCards = computed(() => [
  {
    label: "Total Categories",
    value: totalCategories.value,
    meta: `${filteredCategories.value.length} visible`,
    tone: "primary" as const,
    icon: "i-lucide-tags",
  },
  {
    label: "Active Categories",
    value: activeCategories.value,
    meta: totalCategories.value ? `${Math.round((activeCategories.value / totalCategories.value) * 100)}% live` : "0% live",
    tone: "success" as const,
    icon: "i-lucide-badge-check",
  },
  {
    label: "Inactive Categories",
    value: inactiveCategories.value,
    meta: inactiveCategories.value ? "Needs review" : "All categories active",
    tone: "warning" as const,
    icon: "i-lucide-triangle-alert",
  },
])

const resetForm = () => {
  editingCategoryId.value = null
  name.value = ""
  imageUrl.value = null
  isActive.value = true
}

const openCreateForm = (category?: {
  id: string
  name: string
  image_url: string | null
  is_active: boolean
}) => {
  dismissAlerts()

  if (category) {
    editingCategoryId.value = category.id
    name.value = category.name
    imageUrl.value = category.image_url
    isActive.value = category.is_active
  } else {
    resetForm()
  }

  showCreateForm.value = true
}

const dismissAlerts = () => {
  errorMessage.value = ""
  successMessage.value = ""
}

const loadCategories = async () => {
  try {
    await fetchCategories()
    hasLoaded.value = true
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to load categories."
  }
}

const syncCategoryImage = async (event: Event) => {
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

const submitCategory = async () => {
  dismissAlerts()

  if (!name.value.trim()) {
    errorMessage.value = "Category name is required."
    showCreateForm.value = true
    return
  }

  isSubmitting.value = true

  const payload = {
    name: name.value.trim(),
    name_lc: resolvedNameLc.value.trim(),
    image_url: imageUrl.value,
    is_active: isActive.value,
  }

  try {
    if (editingCategoryId.value) {
      await updateCategory(editingCategoryId.value, payload)
      successMessage.value = "Category updated successfully."
    } else {
      await createCategory(payload)
      successMessage.value = "Category created successfully."
    }

    resetForm()
    showCreateForm.value = false
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || (editingCategoryId.value ? "Unable to update category." : "Unable to create category.")
  } finally {
    isSubmitting.value = false
  }
}

const removeCategory = async (categoryId: string, categoryName: string) => {
  dismissAlerts()
  categoryPendingDelete.value = { id: categoryId, name: categoryName }
  showDeleteDialog.value = true
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  categoryPendingDelete.value = null
}

const confirmDeleteCategory = async () => {
  if (!categoryPendingDelete.value) return

  try {
    await deleteCategory(categoryPendingDelete.value.id)
    successMessage.value = "Category deleted successfully."
    closeDeleteDialog()
  } catch (error: any) {
    errorMessage.value = error?.data?.detail || "Unable to delete category."
  }
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

const reachLabel = (index: number) => {
  const base = 42 + ((index * 17) % 49)
  return `${base}%`
}

onMounted(async () => {
  if (hasLoaded.value) return
  await loadCategories()
})
</script>

<template>
  <section :class="ui.page">
    <div
      v-if="showDeleteDialog && categoryPendingDelete"
      :class="ui.modalOverlay"
      @click.self="closeDeleteDialog"
    >
      <div :class="ui.modalCard" :style="surfaceStyle">
        <h3 :class="ui.modalTitle" :style="textStyle">Delete Category</h3>
        <p :class="ui.modalBody" :style="mutedTextStyle">
          Are you sure you want to delete
          <span class="font-semibold" :style="textStyle">{{ categoryPendingDelete.name }}</span>
          ? This action cannot be undone.
        </p>
        <div :class="ui.modalActions">
          <button
            type="button"
            :class="ui.secondaryButton"
            :style="mutedSurfaceStyle"
            @click="closeDeleteDialog"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="isDeletingCategory"
            :class="ui.primaryButton"
            :style="primaryButtonStyle"
            @click="confirmDeleteCategory"
          >
            <UIcon v-if="isDeletingCategory" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <div :class="ui.topbar">
      <div :class="ui.titleBlock">
        <div :class="ui.breadcrumb" :style="mutedTextStyle">
          <span>Inventory</span>
          <span>/</span>
          <span :class="ui.breadcrumbCurrent" :style="textStyle">Categories</span>
        </div>
        <div>
          <h1 :class="ui.title" :style="textStyle">Category List</h1>
          <p :class="ui.subtitle" :style="mutedTextStyle">
            Manage category records, review status, and create new categories without leaving the dashboard flow.
          </p>
        </div>
      </div>

      <div :class="ui.actionRow">
        <button
          type="button"
          :class="ui.secondaryButton"
          :style="mutedSurfaceStyle"
          @click="loadCategories"
        >
          <UIcon name="i-lucide-refresh-cw" class="mr-2 h-4 w-4" :class="{ 'animate-spin': isLoadingCategories }" />
          Refresh
        </button>

        <button
          type="button"
          :class="ui.primaryButton"
          :style="primaryButtonStyle"
          @click="showCreateForm ? (showCreateForm = false) : openCreateForm()"
        >
          <UIcon :name="showCreateForm ? 'i-lucide-x' : 'i-lucide-plus'" class="mr-2 h-4 w-4" />
          {{ showCreateForm ? "Close Form" : "New Category" }}
        </button>
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
          placeholder="Search category name, slug, or ID..."
          :class="ui.searchInput"
          :style="searchSurfaceStyle"
        />
      </div>
    </div>

    <div :class="ui.statsGrid">
      <article
        v-for="card in statCards"
        :key="card.label"
        :class="ui.statCard"
        :style="surfaceStyle"
      >
        <div :class="ui.statIcon" :style="statIconStyle(card.tone)">
          <UIcon :name="card.icon" class="h-7 w-7" />
        </div>
        <div class="min-w-0">
          <p :class="ui.statLabel" :style="mutedTextStyle">{{ card.label }}</p>
          <div :class="ui.statValueRow">
            <p :class="ui.statValue" :style="textStyle">{{ card.value }}</p>
            <span :class="ui.statMeta" :style="statMetaStyle(card.tone)">{{ card.meta }}</span>
          </div>
        </div>
      </article>
    </div>

    <div
      v-if="successMessage"
      :class="ui.alertCard"
      :style="alertToneStyle('success')"
    >
      <div :class="ui.alertIcon" :style="alertIconToneStyle('success')">
        <UIcon name="i-lucide-check" class="h-4 w-4" />
      </div>
      <div class="min-w-0 flex-1">
        <p :class="ui.alertTitle">{{ successMessage }}</p>
      </div>
      <button type="button" class="text-current/70 transition hover:text-current" @click="successMessage = ''">
        <UIcon name="i-lucide-x" class="h-4 w-4" />
      </button>
    </div>

    <div
      v-if="errorMessage"
      :class="ui.alertCard"
      :style="alertToneStyle('error')"
    >
      <div :class="ui.alertIcon" :style="alertIconToneStyle('error')">
        <UIcon name="i-lucide-alert-circle" class="h-4 w-4" />
      </div>
      <div class="min-w-0 flex-1">
        <p :class="ui.alertTitle">{{ errorMessage }}</p>
      </div>
      <button type="button" class="text-current/70 transition hover:text-current" @click="errorMessage = ''">
        <UIcon name="i-lucide-x" class="h-4 w-4" />
      </button>
    </div>

    <section v-if="showCreateForm" :class="ui.createPanel" :style="surfaceStyle">
      <div :class="ui.createPanelHeader">
        <div>
          <h2 :class="ui.sectionTitle" :style="textStyle">Create Category</h2>
          <p class="mt-1 text-sm" :style="mutedTextStyle">
            {{ isEditing ? "Update the selected category and keep the list in sync." : "Add a category and it will appear in the list immediately after the API returns." }}
          </p>
        </div>
      </div>

      <div :class="ui.createGrid" class="mt-6">
        <div class="space-y-6">
          <div :class="ui.fieldGroup">
            <label :class="ui.label" :style="textStyle">Category Name</label>
            <input
              v-model.trim="name"
              type="text"
              placeholder="e.g. Mechanical Keyboards"
              :class="ui.input"
              :style="{ ...inputSurfaceStyle, ...textStyle }"
            />
          </div>

          <div :class="ui.fieldGroup">
            <label :class="ui.label" :style="textStyle">Category Image</label>
            <div :class="ui.uploadCard" :style="uploadSurfaceStyle">
              <label :class="ui.uploadDropzone" :style="uploadSurfaceStyle">
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Category preview"
                  :class="ui.uploadPreview"
                />
                <template v-else>
                  <div :class="ui.uploadIconWrap" class="bg-blue-100 text-blue-700">
                    <UIcon name="i-lucide-image-up" class="h-8 w-8" />
                  </div>
                  <p class="text-base font-semibold" :style="textStyle">Click to upload</p>
                  <p class="mt-2 text-sm" :style="mutedTextStyle">Image data is sent to the API as `image_url`.</p>
                </template>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="syncCategoryImage"
                />
              </label>
            </div>
          </div>
        </div>

        <div :class="ui.createAside">
          <div :class="ui.toggleCard" :style="mutedSurfaceStyle">
            <div>
              <p class="text-sm font-semibold" :style="textStyle">Status</p>
              <p class="mt-1 text-sm" :style="mutedTextStyle">Enable this category immediately.</p>
            </div>
            <button
              type="button"
              :class="ui.toggleTrack"
              :style="toggleTrackStyle(isActive)"
              @click="isActive = !isActive"
            >
              <span :class="ui.toggleThumb" :style="toggleThumbStyle(isActive)" />
            </button>
          </div>

          <div :class="ui.asideCard" :style="surfaceStyle">
            <h3 class="text-sm font-semibold" :style="textStyle">Guidelines</h3>
            <div :class="ui.tipList" class="mt-4">
              <div :class="ui.tipRow">
                <div :class="ui.tipDot" class="bg-blue-100 text-blue-700">1</div>
                <p :class="ui.tipText" :style="mutedTextStyle">Names should be unique to keep your category list clean.</p>
              </div>
              <div :class="ui.tipRow">
                <div :class="ui.tipDot" class="bg-blue-100 text-blue-700">2</div>
                <p :class="ui.tipText" :style="mutedTextStyle">Uploaded images are kept as data URLs, so lighter files are better.</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              :class="ui.secondaryButton"
              :style="mutedSurfaceStyle"
              @click="resetForm(); dismissAlerts(); showCreateForm = false"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="isSubmitting || isCreatingCategory || isUpdatingCategory"
              :class="ui.primaryButton"
              :style="primaryButtonStyle"
              @click="submitCategory"
            >
              <UIcon v-if="isSubmitting || isCreatingCategory || isUpdatingCategory" name="i-lucide-loader-circle" class="mr-2 h-4 w-4 animate-spin" />
              {{ isEditing ? "Update Category" : "Save Category" }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section :class="ui.listPanel" :style="surfaceStyle">
      <div :class="ui.listHeader" :style="{ borderColor: 'var(--app-border)' }">
        <div>
          <h2 :class="ui.listTitle" :style="textStyle">Category List</h2>
          <p class="mt-1 text-sm" :style="mutedTextStyle">
            Showing {{ filteredCategories.length }} of {{ totalCategories }} categories from the API.
          </p>
        </div>

        <div :class="ui.listToolbar">
          <span :class="ui.badge" :style="summaryBadgeStyle('primary')">{{ totalCategories }} total</span>
          <span :class="ui.badge" :style="summaryBadgeStyle('success')">{{ activeCategories }} active</span>
        </div>
      </div>

      <div v-if="isLoadingCategories" class="px-8 py-10 text-sm" :style="mutedTextStyle">
        Loading categories...
      </div>

      <div v-else-if="!filteredCategories.length" :class="ui.emptyState" :style="mutedTextStyle">
        No matching categories found. Try another search or create a new category.
      </div>

      <div v-else :class="ui.listTableWrap">
        <table :class="ui.listTable">
          <thead :class="ui.tableHead" :style="mutedTextStyle">
            <tr>
              <th :class="ui.tableHeadCell" class="w-[32%]">Category Name</th>
              <th :class="ui.tableHeadCell" class="w-[14%] text-center">Status</th>
              <th :class="ui.tableHeadCell" class="w-[30%]">Inventory Reach</th>
              <th :class="ui.tableHeadCell" class="w-[14%]">Last Sync</th>
              <th :class="ui.tableHeadCell" class="w-[10%] text-center">Actions</th>
            </tr>
          </thead>

          <tbody :class="ui.listBody" :style="{ borderColor: 'var(--app-border)' }">
            <tr
              v-for="(category, index) in filteredCategories"
              :key="category.id"
              :class="[ui.tableRow, tableRowClass]"
            >
              <td :class="ui.tableCell">
                <div :class="ui.listMain">
                  <div :class="ui.listImage" :style="mutedSurfaceStyle">
                    <img
                      v-if="category.image_url"
                      :src="category.image_url"
                      :alt="category.name"
                      class="h-full w-full object-cover"
                    />
                    <UIcon v-else name="i-lucide-package-2" class="h-5 w-5" :style="mutedTextStyle" />
                  </div>

                  <div :class="ui.listMeta">
                    <p :class="ui.listName" :style="textStyle">{{ category.name }}</p>
                    <p :class="ui.listSubtext" :style="mutedTextStyle">{{ category.id }}</p>
                  </div>
                </div>
              </td>

              <td :class="ui.tableCell" class="text-center">
                <span :class="ui.badge" :style="badgeToneStyle(category.is_active)">
                  <span class="h-1.5 w-1.5 rounded-full" :class="category.is_active ? 'bg-emerald-500' : 'bg-slate-400'" />
                  {{ category.is_active ? "Active" : "Inactive" }}
                </span>
              </td>

              <td :class="ui.tableCell">
                <div :class="ui.progressWrap">
                  <div :class="ui.progressBar" :style="progressTrackStyle">
                    <div :class="ui.progressFill" :style="progressFillStyle(category.is_active, reachLabel(index))" />
                  </div>
                  <span class="text-xs font-semibold" :style="mutedTextStyle">{{ reachLabel(index) }}</span>
                </div>
              </td>

              <td :class="ui.tableCell">
                <span class="text-sm" :style="mutedTextStyle">{{ formatDate(category.created_at) }}</span>
              </td>

              <td :class="ui.tableCell" class="text-center">
                <div :class="ui.rowActions">
                  <button
                    type="button"
                    :class="ui.iconButton"
                    :style="iconButtonStyle"
                    @click="openCreateForm(category)"
                  >
                    <UIcon name="i-lucide-pencil" class="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    :disabled="isDeletingCategory"
                    :class="ui.iconButton"
                    :style="iconButtonStyle"
                    @click="removeCategory(category.id, category.name)"
                  >
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
