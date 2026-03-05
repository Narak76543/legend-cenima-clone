export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock"

export type InventorySummary = {
  total_products: number
  low_stock_items: number
  out_of_stock_items: number
  total_quantity: number
}

export type InventoryCategory = {
  id: string
  name: string
}

export type InventoryItem = {
  id: string
  category_id: string
  category_name: string
  name: string
  sku: string
  image_url: string | null
  stock_qty: number
  low_stock_threshold: number
  sell_price: string | number
  status: InventoryStatus
  last_updated: string | null
}

export type InventoryOverview = {
  summary: InventorySummary
  categories: InventoryCategory[]
  items: InventoryItem[]
}

export type InventoryFilters = {
  q?: string
  category_id?: string
  status?: "all" | InventoryStatus
}

export type StockAdjustmentPayload = {
  mode: "increase" | "decrease" | "set"
  amount: number
}

export const useInventory = () => {
  const { api } = useApiClient()

  const inventoryOverview = useState<InventoryOverview | null>("inventory_overview", () => null)
  const isLoadingInventory = useState<boolean>("inventory_loading", () => false)
  const isAdjustingInventory = useState<boolean>("inventory_adjusting", () => false)

  const fetchInventoryOverview = async (filters: InventoryFilters = {}) => {
    isLoadingInventory.value = true

    try {
      const query = new URLSearchParams()

      if (filters.q?.trim()) {
        query.set("q", filters.q.trim())
      }

      if (filters.category_id) {
        query.set("category_id", filters.category_id)
      }

      if (filters.status) {
        query.set("status", filters.status)
      }

      const queryString = query.toString()
      const path = queryString
        ? `/api/inventory/overview?${queryString}`
        : "/api/inventory/overview"

      const response = await api<InventoryOverview>(path, {
        requireAuth: true,
      })

      inventoryOverview.value = response
      return response
    } finally {
      isLoadingInventory.value = false
    }
  }

  const adjustStock = async (id: string, payload: StockAdjustmentPayload) => {
    isAdjustingInventory.value = true

    try {
      const response = await api<InventoryItem, StockAdjustmentPayload>(`/api/inventory/${id}/adjust-stock`, {
        method: "POST",
        requireAuth: true,
        body: payload,
      })

      if (inventoryOverview.value) {
        inventoryOverview.value = {
          ...inventoryOverview.value,
          items: inventoryOverview.value.items.map((item) =>
            item.id === id ? response : item,
          ),
        }
      }

      return response
    } finally {
      isAdjustingInventory.value = false
    }
  }

  return {
    adjustStock,
    fetchInventoryOverview,
    inventoryOverview,
    isAdjustingInventory,
    isLoadingInventory,
  }
}
