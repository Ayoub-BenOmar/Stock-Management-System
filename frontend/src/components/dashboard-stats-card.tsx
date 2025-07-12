"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import {
  DollarSign,
  Package,
  FolderTree,
  Building2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ShoppingCart,
  Crown,
} from "lucide-react"
import type { DashboardStats } from "../types/Dashboard"

interface DashboardStatsCardsProps {
  stats: DashboardStats
}

export default function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const statsCards = [
    {
      title: "Total Sales",
      value: formatCurrency(stats.totalSales),
      icon: DollarSign,
      description: "All time revenue",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      icon: TrendingUp,
      description: "This month's earnings",
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
    {
      title: "Daily Sales",
      value: stats.dailySales.toString(),
      icon: ShoppingCart,
      description: "Sales today",
      color: "text-red-800",
      bgColor: "bg-red-200",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      description: "Products in inventory",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Categories",
      value: stats.totalCategories.toString(),
      icon: FolderTree,
      description: "Product categories",
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
    {
      title: "Suppliers",
      value: stats.totalSuppliers.toString(),
      icon: Building2,
      description: "Active suppliers",
      color: "text-red-800",
      bgColor: "bg-red-200",
    },
    {
      title: "Low Stock",
      value: stats.lowStockProducts.toString(),
      icon: AlertTriangle,
      description: "Products running low",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStockProducts.toString(),
      icon: XCircle,
      description: "Products unavailable",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Selling Product Card */}
      {stats.topProduct && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              Top Selling Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{stats.topProduct.name}</h3>
                <p className="text-sm text-muted-foreground">Price: {formatCurrency(stats.topProduct.price)}</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Best Seller
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Last updated: {formatDate(stats.lastUpdated)}</p>
      </div>
    </div>
  )
}
