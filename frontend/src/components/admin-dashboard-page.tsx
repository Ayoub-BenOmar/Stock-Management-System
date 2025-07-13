"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { RefreshCw, AlertCircle, TrendingUp, Menu } from "lucide-react"
import AdminSidebar from "./admin-sidebar"
import DashboardStatsCards from "./dashboard-stats-card"
import DashboardCharts from "./dashboard-chart"
import type { DashboardStats } from "../types/Dashboard"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchDashboardStats = async () => {
    try {
      setError(null)
      const response = await fetch("http://localhost:3000/api/dashboard")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard stats")
      console.error("Error fetching dashboard stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateDashboardStats = async () => {
    try {
      setIsUpdating(true)
      setError(null)

      const response = await fetch("http://localhost:3000/api/dashboard/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dashboard stats")
      console.error("Error updating dashboard stats:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <AdminSidebar activeItem="dashboard" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col md:ml-64">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <button className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </header>
          <div className="flex-1 space-y-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !stats) {
    return (
      <div className="flex h-screen">
        <AdminSidebar activeItem="dashboard" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col md:ml-64">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <button className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
          </header>
          <div className="flex-1 space-y-4 p-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={fetchDashboardStats} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar activeItem="dashboard" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <button className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <Button onClick={updateDashboardStats} disabled={isUpdating} variant="outline" className="hidden sm:flex">
              <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`} />
              {isUpdating ? "Updating..." : "Update Stats"}
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {stats && (
            <>
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-900">Welcome to Your Dashboard</CardTitle>
                  <CardDescription className="text-red-700">
                    Here's an overview of your business performance and key metrics.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Stats Cards */}
              <DashboardStatsCards stats={stats} />

              {/* Charts Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Analytics & Insights</h2>
                <DashboardCharts stats={stats} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
