"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Cloud, Droplets, ThermometerSun, TrendingDown, TrendingUp } from "lucide-react"

interface RiskAlert {
  type: "flood" | "drought" | "temperature"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  probability: number
  timeframe: string
  mitigation: string[]
}

interface ClimateData {
  month: string
  avgTemp: number
  rainfall: number
  historical: { year: number; temp: number; rainfall: number }[]
}

const riskAlerts: RiskAlert[] = [
  {
    type: "flood",
    severity: "medium",
    title: "Moderate Flood Risk",
    description: "Heavy rainfall expected in the next 5-7 days. Water accumulation possible in low-lying areas.",
    probability: 65,
    timeframe: "Next 7 days",
    mitigation: [
      "Ensure proper drainage systems are functional",
      "Harvest mature crops if possible",
      "Prepare water pumps and drainage equipment",
      "Monitor weather forecasts daily"
    ]
  },
  {
    type: "drought",
    severity: "low",
    title: "Low Drought Risk",
    description: "Current season shows adequate rainfall patterns. Monitor water levels for next month.",
    probability: 25,
    timeframe: "30-45 days",
    mitigation: [
      "Maintain water conservation practices",
      "Check irrigation system efficiency",
      "Plan water storage for dry spells"
    ]
  },
  {
    type: "temperature",
    severity: "high",
    title: "Heat Stress Alert",
    description: "Temperatures expected to exceed 38°C for extended periods. Risk to heat-sensitive crops.",
    probability: 80,
    timeframe: "Next 10-14 days",
    mitigation: [
      "Increase irrigation frequency",
      "Apply mulching to retain soil moisture",
      "Provide shade nets for sensitive crops",
      "Schedule irrigation during cooler hours"
    ]
  }
]

const climateData: ClimateData[] = [
  { month: "Jan", avgTemp: 18, rainfall: 15, historical: [
    { year: 2023, temp: 17, rainfall: 12 },
    { year: 2022, temp: 19, rainfall: 18 },
    { year: 2021, temp: 18, rainfall: 14 }
  ]},
  { month: "Feb", avgTemp: 22, rainfall: 20, historical: [
    { year: 2023, temp: 21, rainfall: 22 },
    { year: 2022, temp: 23, rainfall: 18 },
    { year: 2021, temp: 22, rainfall: 21 }
  ]},
  { month: "Mar", avgTemp: 28, rainfall: 30, historical: [
    { year: 2023, temp: 27, rainfall: 28 },
    { year: 2022, temp: 29, rainfall: 32 },
    { year: 2021, temp: 28, rainfall: 31 }
  ]},
  { month: "Apr", avgTemp: 33, rainfall: 40, historical: [
    { year: 2023, temp: 32, rainfall: 38 },
    { year: 2022, temp: 34, rainfall: 42 },
    { year: 2021, temp: 33, rainfall: 40 }
  ]},
  { month: "May", avgTemp: 35, rainfall: 60, historical: [
    { year: 2023, temp: 34, rainfall: 55 },
    { year: 2022, temp: 36, rainfall: 65 },
    { year: 2021, temp: 35, rainfall: 58 }
  ]},
  { month: "Jun", avgTemp: 32, rainfall: 150, historical: [
    { year: 2023, temp: 31, rainfall: 145 },
    { year: 2022, temp: 33, rainfall: 155 },
    { year: 2021, temp: 32, rainfall: 148 }
  ]}
]

export default function RiskAssessment() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-500 bg-red-50 dark:bg-red-950/20"
      case "high": return "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "medium": return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "low": return "border-green-500 bg-green-50 dark:bg-green-950/20"
      default: return ""
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white"
      case "high": return "bg-orange-500 text-white"
      case "medium": return "bg-yellow-500 text-black"
      case "low": return "bg-green-500 text-white"
      default: return ""
    }
  }

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "flood": return <Droplets className="h-5 w-5" />
      case "drought": return <Cloud className="h-5 w-5" />
      case "temperature": return <ThermometerSun className="h-5 w-5" />
      default: return <AlertTriangle className="h-5 w-5" />
    }
  }

  const maxRainfall = Math.max(...climateData.map(d => d.rainfall))
  const maxTemp = Math.max(...climateData.map(d => d.avgTemp))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Dashboard</CardTitle>
          <CardDescription>Monitor and prepare for climate risks</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Active Risk Alerts
        </h3>
        {riskAlerts.map((alert, index) => (
          <Card key={index} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-muted-foreground mt-1">
                    {getRiskIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <Badge className={getSeverityBadge(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>{alert.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-medium mb-2">Risk Probability</div>
                  <div className="flex items-center gap-3">
                    <Progress value={alert.probability} className="flex-1" />
                    <span className="text-sm font-medium">{alert.probability}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Timeframe</div>
                  <div className="text-sm text-muted-foreground">{alert.timeframe}</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Mitigation Actions</div>
                <ul className="space-y-1.5">
                  {alert.mitigation.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historical Climate Data</CardTitle>
          <CardDescription>6-month climate patterns and trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {climateData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="w-12">{data.month}</span>
                  <div className="flex items-center gap-4 flex-1 ml-4">
                    <div className="flex items-center gap-2 flex-1">
                      <ThermometerSun className="h-4 w-4 text-orange-500" />
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all"
                          style={{ width: `${(data.avgTemp / maxTemp) * 100}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-muted-foreground">{data.avgTemp}°C</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                          style={{ width: `${(data.rainfall / maxRainfall) * 100}%` }}
                        />
                      </div>
                      <span className="w-16 text-right text-muted-foreground">{data.rainfall}mm</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-14 text-xs text-muted-foreground flex gap-4">
                  <div className="flex items-center gap-1">
                    Trend: 
                    {data.avgTemp > data.historical[0].temp ? (
                      <TrendingUp className="h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-blue-500" />
                    )}
                  </div>
                  <div>
                    3-yr avg: {Math.round(data.historical.reduce((sum, h) => sum + h.temp, 0) / data.historical.length)}°C, 
                    {' '}{Math.round(data.historical.reduce((sum, h) => sum + h.rainfall, 0) / data.historical.length)}mm
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3 pt-4 border-t">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">+2.3°C</div>
              <div className="text-sm text-muted-foreground mt-1">Avg Temp Increase</div>
              <div className="text-xs text-muted-foreground">vs. 5-year average</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">-15%</div>
              <div className="text-sm text-muted-foreground mt-1">Rainfall Change</div>
              <div className="text-xs text-muted-foreground">vs. 5-year average</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">82%</div>
              <div className="text-sm text-muted-foreground mt-1">Prediction Accuracy</div>
              <div className="text-xs text-muted-foreground">last 12 months</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}