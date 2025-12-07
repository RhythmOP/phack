"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, TrendingUp, Droplets, ThermometerSun } from "lucide-react"

interface CropRecommendation {
  name: string
  expectedYield: string
  waterRequirement: string
  temperatureRange: string
  growthPeriod: string
  suitabilityScore: number
  benefits: string[]
}

const cropDatabase: Record<string, Record<string, CropRecommendation[]>> = {
  "Kharif": {
    "Clay Loam": [
      {
        name: "Rice",
        expectedYield: "5-6 tons/hectare",
        waterRequirement: "High (1200-1500mm)",
        temperatureRange: "20-35°C",
        growthPeriod: "120-150 days",
        suitabilityScore: 95,
        benefits: ["High market demand", "Good water retention soil", "Optimal monsoon season"]
      },
      {
        name: "Cotton",
        expectedYield: "2-3 tons/hectare",
        waterRequirement: "Medium (600-1000mm)",
        temperatureRange: "21-30°C",
        growthPeriod: "180-200 days",
        suitabilityScore: 88,
        benefits: ["Cash crop", "Good for clay soil", "Long growing season"]
      }
    ],
    "Sandy Loam": [
      {
        name: "Groundnut",
        expectedYield: "2.5-3 tons/hectare",
        waterRequirement: "Medium (500-750mm)",
        temperatureRange: "20-30°C",
        growthPeriod: "110-140 days",
        suitabilityScore: 92,
        benefits: ["Excellent drainage", "Nitrogen fixing", "Good market value"]
      },
      {
        name: "Maize",
        expectedYield: "6-8 tons/hectare",
        waterRequirement: "Medium (600-900mm)",
        temperatureRange: "18-27°C",
        growthPeriod: "90-120 days",
        suitabilityScore: 90,
        benefits: ["Fast growing", "Multiple uses", "Good for sandy soil"]
      }
    ],
    "Red Soil": [
      {
        name: "Millets",
        expectedYield: "1.5-2 tons/hectare",
        waterRequirement: "Low (400-600mm)",
        temperatureRange: "25-35°C",
        growthPeriod: "70-90 days",
        suitabilityScore: 94,
        benefits: ["Drought resistant", "Nutritious", "Low input cost"]
      }
    ]
  },
  "Rabi": {
    "Clay Loam": [
      {
        name: "Wheat",
        expectedYield: "4-5 tons/hectare",
        waterRequirement: "Medium (450-650mm)",
        temperatureRange: "10-25°C",
        growthPeriod: "120-150 days",
        suitabilityScore: 96,
        benefits: ["Staple crop", "Good market demand", "Excellent for clay loam"]
      },
      {
        name: "Chickpea",
        expectedYield: "2-2.5 tons/hectare",
        waterRequirement: "Low (350-500mm)",
        temperatureRange: "10-25°C",
        growthPeriod: "90-120 days",
        suitabilityScore: 89,
        benefits: ["Nitrogen fixing", "Low water requirement", "High protein"]
      }
    ],
    "Sandy Loam": [
      {
        name: "Mustard",
        expectedYield: "1.5-2 tons/hectare",
        waterRequirement: "Low (300-500mm)",
        temperatureRange: "10-25°C",
        growthPeriod: "90-110 days",
        suitabilityScore: 91,
        benefits: ["Oil crop", "Fast growing", "Good for sandy soil"]
      },
      {
        name: "Barley",
        expectedYield: "3-4 tons/hectare",
        waterRequirement: "Low (300-450mm)",
        temperatureRange: "12-20°C",
        growthPeriod: "100-120 days",
        suitabilityScore: 87,
        benefits: ["Drought tolerant", "Multiple uses", "Hardy crop"]
      }
    ],
    "Red Soil": [
      {
        name: "Sunflower",
        expectedYield: "1.5-2.5 tons/hectare",
        waterRequirement: "Medium (500-700mm)",
        temperatureRange: "15-25°C",
        growthPeriod: "80-100 days",
        suitabilityScore: 88,
        benefits: ["Oil crop", "Adaptable", "Good market price"]
      }
    ]
  },
  "Zaid": {
    "Clay Loam": [
      {
        name: "Watermelon",
        expectedYield: "25-30 tons/hectare",
        waterRequirement: "High (600-800mm)",
        temperatureRange: "24-35°C",
        growthPeriod: "70-90 days",
        suitabilityScore: 90,
        benefits: ["High yield", "Good summer crop", "High market demand"]
      }
    ],
    "Sandy Loam": [
      {
        name: "Cucumber",
        expectedYield: "15-20 tons/hectare",
        waterRequirement: "High (500-700mm)",
        temperatureRange: "20-30°C",
        growthPeriod: "50-70 days",
        suitabilityScore: 92,
        benefits: ["Fast harvest", "High value", "Good drainage needed"]
      },
      {
        name: "Muskmelon",
        expectedYield: "20-25 tons/hectare",
        waterRequirement: "Medium (500-600mm)",
        temperatureRange: "25-35°C",
        growthPeriod: "65-80 days",
        suitabilityScore: 89,
        benefits: ["Premium price", "Short duration", "Sandy soil ideal"]
      }
    ],
    "Red Soil": [
      {
        name: "Green Gram",
        expectedYield: "0.8-1.2 tons/hectare",
        waterRequirement: "Low (350-450mm)",
        temperatureRange: "25-35°C",
        growthPeriod: "60-75 days",
        suitabilityScore: 87,
        benefits: ["Pulse crop", "Quick harvest", "Soil enriching"]
      }
    ]
  }
}

export default function CropRecommendation() {
  const [season, setSeason] = useState("")
  const [soilType, setSoilType] = useState("")
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleGetRecommendations = () => {
    if (season && soilType) {
      const crops = cropDatabase[season]?.[soilType] || []
      setRecommendations(crops)
      setShowResults(true)
    }
  }

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return "bg-green-500/10 text-green-700 dark:text-green-400"
    if (score >= 80) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Crop Recommendation Engine</CardTitle>
          <CardDescription>Get personalized crop suggestions based on your conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="season">Growing Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif">Kharif (Monsoon: Jun-Oct)</SelectItem>
                  <SelectItem value="Rabi">Rabi (Winter: Nov-Apr)</SelectItem>
                  <SelectItem value="Zaid">Zaid (Summer: Mar-Jun)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil">Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger id="soil">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clay Loam">Clay Loam</SelectItem>
                  <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                  <SelectItem value="Red Soil">Red Soil</SelectItem>
                  <SelectItem value="Black Soil">Black Soil</SelectItem>
                  <SelectItem value="Alluvial">Alluvial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGetRecommendations} 
            className="w-full"
            disabled={!season || !soilType}
          >
            <Sprout className="h-4 w-4 mr-2" />
            Get Crop Recommendations
          </Button>
        </CardContent>
      </Card>

      {showResults && recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recommended Crops</h3>
          {recommendations.map((crop, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{crop.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Expected Yield: {crop.expectedYield}
                    </CardDescription>
                  </div>
                  <Badge className={getSuitabilityColor(crop.suitabilityScore)}>
                    {crop.suitabilityScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Water Requirement</div>
                        <div className="text-sm text-muted-foreground">{crop.waterRequirement}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ThermometerSun className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Temperature Range</div>
                        <div className="text-sm text-muted-foreground">{crop.temperatureRange}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Growth Period</div>
                        <div className="text-sm text-muted-foreground">{crop.growthPeriod}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Key Benefits</div>
                    <ul className="space-y-2">
                      {crop.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showResults && recommendations.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No recommendations available for this combination. Try different selections.
          </CardContent>
        </Card>
      )}
    </div>
  )
}