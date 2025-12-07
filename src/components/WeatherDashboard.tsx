"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from "lucide-react"

interface WeatherData {
  location: string
  current: {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    pressure: number
    feelsLike: number
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
  }>
}

const mockWeatherData: WeatherData = {
  location: "Punjab, India",
  current: {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    feelsLike: 30
  },
  forecast: [
    { day: "Mon", high: 30, low: 22, condition: "Sunny", precipitation: 10 },
    { day: "Tue", high: 29, low: 21, condition: "Partly Cloudy", precipitation: 20 },
    { day: "Wed", high: 27, low: 20, condition: "Cloudy", precipitation: 40 },
    { day: "Thu", high: 26, low: 19, condition: "Rainy", precipitation: 80 },
    { day: "Fri", high: 28, low: 21, condition: "Partly Cloudy", precipitation: 30 },
    { day: "Sat", high: 30, low: 22, condition: "Sunny", precipitation: 5 },
    { day: "Sun", high: 31, low: 23, condition: "Sunny", precipitation: 5 }
  ]
}

export default function WeatherDashboard() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!location.trim()) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setWeather({
        ...mockWeatherData,
        location: location
      })
      setLoading(false)
    }, 1000)
  }

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes("rain")) return <CloudRain className="h-8 w-8" />
    if (lower.includes("cloud")) return <Cloud className="h-8 w-8" />
    return <Sun className="h-8 w-8" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weather Dashboard</CardTitle>
          <CardDescription>Get real-time weather data for your location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your location (e.g., Punjab, India)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Loading..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
            <CardDescription>{weather.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold">{weather.current.temp}°C</div>
                  <div className="text-muted-foreground mt-2">{weather.current.condition}</div>
                  <div className="text-sm text-muted-foreground">Feels like {weather.current.feelsLike}°C</div>
                </div>
                <div className="text-primary">
                  {getWeatherIcon(weather.current.condition)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div className="font-medium">{weather.current.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                    <div className="font-medium">{weather.current.windSpeed} km/h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Visibility</div>
                    <div className="font-medium">{weather.current.visibility} km</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pressure</div>
                    <div className="font-medium">{weather.current.pressure} mb</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
            <CardDescription>Weekly weather outlook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="font-medium w-12">{day.day}</div>
                    <div className="text-primary">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-sm text-muted-foreground flex-1">{day.condition}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <Droplets className="h-3 w-3 inline mr-1" />
                      {day.precipitation}%
                    </div>
                    <div className="flex gap-2 font-medium">
                      <span>{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}