export type ProductItem = {
  id                 : string
  category_id        : string
  name               : string
  name_lc            : string
  sku                : string
  barcode            : string | null
  description        : string | null
  description_lc     : string | null
  image_url          : string | null
  cost_price         : string | number
  sell_price         : string | number
  stock_qty          : number
  low_stock_threshold: number
  is_active          : boolean
  created_at         : string | null
  updated_at         : string | null
}

export type ProductPayload = {
  category_id        : string
  name               : string
  name_lc            : string
  sku                : string
  barcode            : string | null
  description        : string | null
  description_lc     : string | null
  image_url          : string | null
  cost_price         : number
  sell_price         : number
  stock_qty          : number
  low_stock_threshold: number
  is_active          : boolean
}

export const useProducts = () => {
  const { api } = useApiClient()
  const products          = useState<ProductItem[]>("products_items", () => [])
  const isLoadingProducts = useState<boolean>("products_loading", () => false)
  const isLoadingProduct  = useState<boolean>("product_loading", () => false)
  const isCreatingProduct = useState<boolean>("products_creating", () => false)
  const isUpdatingProduct = useState<boolean>("products_updating", () => false)
  const isDeletingProduct = useState<boolean>("products_deleting", () => false)

  const fetchProducts = async () => {
    isLoadingProducts.value = true

    try {
      const response = await api<ProductItem[]>("/api/products", {
        requireAuth: true,
      })

      products.value = response
      return response
    } finally {
      isLoadingProducts.value = false
    }
  }

  const fetchProductById = async (id: string) => {
    isLoadingProduct.value = true

    try {
      const response = await api<ProductItem>(`/api/products/${id}`, {
        requireAuth: true,
      })

      const existingIndex = products.value.findIndex((product) => product.id === id)
      if (existingIndex >= 0) {
        products.value.splice(existingIndex, 1, response)
      } else {
        products.value = [response, ...products.value]
      }

      return response
    } finally {
      isLoadingProduct.value = false
    }
  }

  const createProduct = async (payload: ProductPayload) => {
    isCreatingProduct.value = true

    try {
      const response = await api<ProductItem, ProductPayload>("/api/products", {
        method: "POST",
        requireAuth: true,
        body: payload,
      })

      products.value = [response, ...products.value]
      return response
    } finally {
      isCreatingProduct.value = false
    }
  }

  const updateProduct = async (id: string, payload: ProductPayload) => {
    isUpdatingProduct.value = true

    try {
      const response = await api<ProductItem, ProductPayload>(`/api/products/${id}`, {
        method: "PUT",
        requireAuth: true,
        body: payload,
      })

      products.value = products.value.map((product) =>
        product.id === id ? response : product,
      )

      return response
    } finally {
      isUpdatingProduct.value = false
    }
  }

  const deleteProduct = async (id: string) => {
    isDeletingProduct.value = true

    try {
      await api(`/api/products/${id}`, {
        method: "DELETE",
        requireAuth: true,
      })

      products.value = products.value.filter((product) => product.id !== id)
    } finally {
      isDeletingProduct.value = false
    }
  }

  return {
    createProduct,
    deleteProduct,
    fetchProductById,
    fetchProducts,
    isCreatingProduct,
    isDeletingProduct,
    isLoadingProduct,
    isLoadingProducts,
    isUpdatingProduct,
    products,
    updateProduct,
  }
}
