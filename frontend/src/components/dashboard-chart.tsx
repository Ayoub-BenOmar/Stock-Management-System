"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ChartContainer } from "./ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { DashboardStats } from "../types/Dashboard"

interface DashboardChartsProps {
  stats: DashboardStats
}

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  // Stock Status Chart Data
  const stockData = [
    {
      name: "In Stock",
      value: stats.totalProducts - stats.lowStockProducts - stats.outOfStockProducts,
      fill: "#22c55e", // Green
    },
    {
      name: "Low Stock",
      value: stats.lowStockProducts,
      fill: "#eab308", // Yellow
    },
    {
      name: "Out of Stock",
      value: stats.outOfStockProducts,
      fill: "#ef4444", // Red
    },
  ]

  // Revenue Comparison Chart Data
  const revenueData = [
    {
      name: "Monthly Revenue",
      value: stats.monthlyRevenue,
      fill: "#3b82f6", // Blue
    },
    {
      name: "Total Sales",
      value: stats.totalSales,
      fill: "#8b5cf6", // Purple
    },
  ]

  // Inventory Overview Chart Data
  const inventoryData = [
    {
      name: "Products",
      value: stats.totalProducts,
      fill: "#3b82f6", // Blue
    },
    {
      name: "Categories",
      value: stats.totalCategories,
      fill: "#10b981", // Green
    },
    {
      name: "Suppliers",
      value: stats.totalSuppliers,
      fill: "#f59e0b", // Orange
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stock Status Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Status Overview</CardTitle>
          <CardDescription>Distribution of product stock levels</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              inStock: {
                label: "In Stock",
                color: "hsl(var(--chart-1))",
              },
              lowStock: {
                label: "Low Stock",
                color: "hsl(var(--chart-2))",
              },
              outOfStock: {
                label: "Out of Stock",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-4 mt-4">
            {stockData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Comparison Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly vs Total Revenue comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              monthly: {
                label: "Monthly Revenue",
                color: "hsl(var(--chart-1))",
              },
              total: {
                label: "Total Sales",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Inventory Overview Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>Products, Categories, and Suppliers count</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              products: {
                label: "Products",
                color: "hsl(var(--chart-1))",
              },
              categories: {
                label: "Categories",
                color: "hsl(var(--chart-2))",
              },
              suppliers: {
                label: "Suppliers",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sales Performance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Daily sales and revenue metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Daily Sales</p>
                <p className="text-2xl font-bold">{stats.dailySales}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-sm text-green-600">Today</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-sm text-blue-600">
                  {((stats.monthlyRevenue / stats.totalSales) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
