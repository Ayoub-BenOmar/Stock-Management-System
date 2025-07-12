export interface DashboardStats {
  id: number
  totalSales: number
  totalProducts: number
  totalCategories: number
  totalSuppliers: number
  lowStockProducts: number
  outOfStockProducts: number
  monthlyRevenue: number
  dailySales: number
  topSellingProduct: number | null
  lastUpdated: string
  topProduct?: {
    id: number
    name: string
    price: number
  } | null
}

export interface ChartData {
  name: string
  value: number
  fill?: string
}
