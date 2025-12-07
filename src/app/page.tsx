"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sprout, AlertTriangle, Calendar, Leaf, TrendingUp, Shield, CloudRain } from "lucide-react"
import WeatherDashboard from "@/components/WeatherDashboard"
import CropRecommendation from "@/components/CropRecommendation"
import RiskAssessment from "@/components/RiskAssessment"
import CropCalendar from "@/components/CropCalendar"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920')] bg-cover bg-center opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium">
              AD010 - Domain: Agriculture
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Weather-Based Crop Planning Assistant
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Make data-driven agricultural decisions with AI-powered weather analysis, 
              crop recommendations, risk forecasting, and dynamic scheduling for optimal yields.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => setActiveTab("weather")} className="gap-2">
                <Cloud className="h-5 w-5" />
                View Weather
              </Button>
              <Button size="lg" variant="outline" onClick={() => setActiveTab("recommendations")} className="gap-2">
                <Sprout className="h-5 w-5" />
                Get Crop Advice
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      {activeTab === "overview" && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Complete Agricultural Planning Suite</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to plan and manage your crop cycles based on scientific weather patterns and proven agricultural practices.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={() => setActiveTab("weather")}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                    <CloudRain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Weather Dashboard</CardTitle>
                  <CardDescription>
                    Real-time weather data and 7-day forecasts for precise planning
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={() => setActiveTab("recommendations")}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                    <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Crop Recommendations</CardTitle>
                  <CardDescription>
                    AI-powered suggestions based on soil, season, and climate
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={() => setActiveTab("risks")}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>
                    Flood, drought, and temperature alerts with mitigation plans
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={() => setActiveTab("calendar")}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Crop Calendar</CardTitle>
                  <CardDescription>
                    Dynamic scheduling for sowing, care, and harvesting
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Key Benefits */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-primary" />
                  Why Choose AgriPlanner?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <TrendingUp className="h-5 w-5" />
                      Increase Yields
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimize planting times and crop selection based on historical climate data and weather patterns
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <Shield className="h-5 w-5" />
                      Reduce Risks
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get early warnings for floods, droughts, and temperature extremes with actionable mitigation strategies
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <Calendar className="h-5 w-5" />
                      Perfect Timing
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Follow data-driven schedules for sowing, fertilization, irrigation, and harvesting activities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center space-y-4 py-8">
              <h3 className="text-2xl font-bold">Ready to Optimize Your Farming?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Start making data-driven decisions today. Explore our features and see how weather intelligence can transform your agricultural planning.
              </p>
              <Button size="lg" onClick={() => setActiveTab("weather")} className="gap-2">
                <Cloud className="h-5 w-5" />
                Get Started
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main Application Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="flex flex-col gap-1 py-3">
              <Leaf className="h-4 w-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex flex-col gap-1 py-3">
              <Cloud className="h-4 w-4" />
              <span className="text-xs">Weather</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex flex-col gap-1 py-3">
              <Sprout className="h-4 w-4" />
              <span className="text-xs">Crops</span>
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex flex-col gap-1 py-3">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Risks</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-col gap-1 py-3">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Calendar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weather" className="space-y-6">
            <WeatherDashboard />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <CropRecommendation />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RiskAssessment />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CropCalendar />
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AgriPlanner. Built for farmers, powered by data science.</p>
            <p className="mt-2">Registered: 2025-11-17 | Project ID: AD010</p>
          </div>
        </div>
      </footer>
    </div>
  )
}