export type CategoryItem = {
  id: string
  name: string
  name_lc: string
  image_url: string | null
  is_active: boolean
  created_at: string | null
}

export type CategoryPayload = {
  name: string
  name_lc: string
  image_url: string | null
  is_active: boolean
}

export const useCategories = () => {
  const { api } = useApiClient()

  const categories = useState<CategoryItem[]>("categories_items", () => [])
  const isLoadingCategories = useState<boolean>("categories_loading", () => false)
  const isCreatingCategory = useState<boolean>("categories_creating", () => false)
  const isUpdatingCategory = useState<boolean>("categories_updating", () => false)
  const isDeletingCategory = useState<boolean>("categories_deleting", () => false)

  const fetchCategories = async () => {
    isLoadingCategories.value = true

    try {
      const response = await api<CategoryItem[]>("/api/categories", {
        requireAuth: true,
      })

      categories.value = response
      return response
    } finally {
      isLoadingCategories.value = false
    }
  }

  const createCategory = async (payload: CategoryPayload) => {
    isCreatingCategory.value = true

    try {
      const response = await api<CategoryItem, CategoryPayload>("/api/categories", {
        method: "POST",
        requireAuth: true,
        body: payload,
      })

      categories.value = [response, ...categories.value]
      return response
    } finally {
      isCreatingCategory.value = false
    }
  }

  const updateCategory = async (id: string, payload: CategoryPayload) => {
    isUpdatingCategory.value = true

    try {
      const response = await api<CategoryItem, CategoryPayload>(`/api/categories/${id}`, {
        method: "PUT",
        requireAuth: true,
        body: payload,
      })

      categories.value = categories.value.map((category) =>
        category.id === id ? response : category,
      )

      return response
    } finally {
      isUpdatingCategory.value = false
    }
  }

  const deleteCategory = async (id: string) => {
    isDeletingCategory.value = true

    try {
      await api(`/api/categories/${id}`, {
        method: "DELETE",
        requireAuth: true,
      })

      categories.value = categories.value.filter((category) => category.id !== id)
    } finally {
      isDeletingCategory.value = false
    }
  }

  return {
    categories,
    createCategory,
    deleteCategory,
    fetchCategories,
    isCreatingCategory,
    isDeletingCategory,
    isLoadingCategories,
    isUpdatingCategory,
    updateCategory,
  }
}
