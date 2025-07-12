"use client"

import * as React from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  content?: React.ComponentType<any>
  formatter?: (value: any, name: string) => [string, string]
  labelFormatter?: (label: string) => string
}

export function ChartTooltip({ content, formatter, labelFormatter }: ChartTooltipProps) {
  return null // This is handled by recharts internally
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[] // Changed from ChartData[] to any[]
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-sm font-medium">{entry.name}:</span>
            <span className="text-sm text-muted-foreground">
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 