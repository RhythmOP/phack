"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Droplets, Sprout, Package } from "lucide-react"
import { Label } from "@/components/ui/label"

interface CropActivity {
  phase: string
  activity: string
  week: number
  description: string
  icon: "sowing" | "fertilization" | "irrigation" | "harvest"
  status: "upcoming" | "current" | "completed"
}

interface CropSchedule {
  cropName: string
  totalDuration: string
  activities: CropActivity[]
}

const cropSchedules: Record<string, CropSchedule> = {
  "Rice": {
    cropName: "Rice",
    totalDuration: "120-150 days",
    activities: [
      { phase: "Land Preparation", activity: "Field leveling and puddling", week: 1, description: "Prepare field with proper drainage", icon: "sowing", status: "completed" },
      { phase: "Sowing", activity: "Transplant seedlings", week: 2, description: "20-25 day old seedlings, 20x15 cm spacing", icon: "sowing", status: "completed" },
      { phase: "Early Growth", activity: "First irrigation", week: 3, description: "Maintain 2-5 cm water level", icon: "irrigation", status: "completed" },
      { phase: "Tillering", activity: "First fertilization (Urea)", week: 4, description: "Apply 60 kg N/ha", icon: "fertilization", status: "current" },
      { phase: "Active Growth", activity: "Weed management", week: 6, description: "Manual or herbicide application", icon: "sowing", status: "upcoming" },
      { phase: "Panicle Initiation", activity: "Second fertilization", week: 8, description: "Apply 30 kg N/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Flowering", activity: "Maintain water level", week: 10, description: "Critical water requirement period", icon: "irrigation", status: "upcoming" },
      { phase: "Grain Filling", activity: "Monitor for pests", week: 13, description: "Check for diseases and pests", icon: "sowing", status: "upcoming" },
      { phase: "Maturity", activity: "Drain water", week: 16, description: "Stop irrigation 10 days before harvest", icon: "irrigation", status: "upcoming" },
      { phase: "Harvest", activity: "Harvest crop", week: 18, description: "When 80% grains turn golden yellow", icon: "harvest", status: "upcoming" }
    ]
  },
  "Wheat": {
    cropName: "Wheat",
    totalDuration: "120-150 days",
    activities: [
      { phase: "Pre-Sowing", activity: "Soil preparation", week: 1, description: "Deep plowing and leveling", icon: "sowing", status: "completed" },
      { phase: "Sowing", activity: "Seed sowing", week: 2, description: "100-125 kg/ha, row spacing 20-22.5 cm", icon: "sowing", status: "completed" },
      { phase: "Germination", activity: "First irrigation", week: 3, description: "Light irrigation for germination", icon: "irrigation", status: "completed" },
      { phase: "Crown Root", activity: "First fertilization", week: 4, description: "Apply 60 kg N + 30 kg P2O5/ha", icon: "fertilization", status: "current" },
      { phase: "Tillering", activity: "Second irrigation", week: 6, description: "Crown root initiation stage", icon: "irrigation", status: "upcoming" },
      { phase: "Late Tillering", activity: "Second fertilization", week: 7, description: "Apply 40 kg N/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Jointing", activity: "Third irrigation", week: 9, description: "Support stem elongation", icon: "irrigation", status: "upcoming" },
      { phase: "Flowering", activity: "Fourth irrigation", week: 11, description: "Critical for grain setting", icon: "irrigation", status: "upcoming" },
      { phase: "Milk Stage", activity: "Fifth irrigation", week: 13, description: "Grain filling support", icon: "irrigation", status: "upcoming" },
      { phase: "Dough Stage", activity: "Final irrigation", week: 15, description: "Last irrigation before harvest", icon: "irrigation", status: "upcoming" },
      { phase: "Maturity", activity: "Harvest preparation", week: 17, description: "Monitor grain moisture content", icon: "sowing", status: "upcoming" },
      { phase: "Harvest", activity: "Harvesting", week: 18, description: "When grains are hard and golden", icon: "harvest", status: "upcoming" }
    ]
  },
  "Cotton": {
    cropName: "Cotton",
    totalDuration: "180-200 days",
    activities: [
      { phase: "Pre-Sowing", activity: "Deep plowing", week: 1, description: "Prepare soil with deep tillage", icon: "sowing", status: "completed" },
      { phase: "Sowing", activity: "Seed planting", week: 2, description: "15-20 kg/ha, row spacing 60-90 cm", icon: "sowing", status: "completed" },
      { phase: "Germination", activity: "Light irrigation", week: 3, description: "Ensure soil moisture", icon: "irrigation", status: "completed" },
      { phase: "Seedling", activity: "Thinning and gap filling", week: 4, description: "Maintain plant population", icon: "sowing", status: "current" },
      { phase: "Vegetative", activity: "First fertilization", week: 6, description: "Apply 60 kg N/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Square Formation", activity: "Pest monitoring", week: 8, description: "Check for bollworm and aphids", icon: "sowing", status: "upcoming" },
      { phase: "Flowering", activity: "Second fertilization", week: 10, description: "Apply 40 kg N/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Boll Development", activity: "Regular irrigation", week: 14, description: "Critical water requirement", icon: "irrigation", status: "upcoming" },
      { phase: "Boll Maturity", activity: "Reduce irrigation", week: 20, description: "Prepare for harvest", icon: "irrigation", status: "upcoming" },
      { phase: "Harvest", activity: "First picking", week: 24, description: "When 60-70% bolls open", icon: "harvest", status: "upcoming" }
    ]
  },
  "Maize": {
    cropName: "Maize",
    totalDuration: "90-120 days",
    activities: [
      { phase: "Pre-Sowing", activity: "Field preparation", week: 1, description: "Plow and level field", icon: "sowing", status: "completed" },
      { phase: "Sowing", activity: "Seed planting", week: 2, description: "20-25 kg/ha, spacing 60x20 cm", icon: "sowing", status: "completed" },
      { phase: "Germination", activity: "First irrigation", week: 3, description: "Light irrigation for emergence", icon: "irrigation", status: "completed" },
      { phase: "4-Leaf Stage", activity: "First fertilization", week: 4, description: "Apply 60 kg N/ha", icon: "fertilization", status: "current" },
      { phase: "8-Leaf Stage", activity: "Second irrigation", week: 5, description: "Support vegetative growth", icon: "irrigation", status: "upcoming" },
      { phase: "Pre-Tasseling", activity: "Second fertilization", week: 7, description: "Apply 40 kg N/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Tasseling", activity: "Third irrigation", week: 8, description: "Critical water requirement", icon: "irrigation", status: "upcoming" },
      { phase: "Silking", activity: "Ensure adequate moisture", week: 9, description: "Most critical stage for yield", icon: "irrigation", status: "upcoming" },
      { phase: "Grain Filling", activity: "Monitor for pests", week: 11, description: "Check for stem borers", icon: "sowing", status: "upcoming" },
      { phase: "Maturity", activity: "Stop irrigation", week: 12, description: "Allow grains to dry", icon: "irrigation", status: "upcoming" },
      { phase: "Harvest", activity: "Harvesting", week: 14, description: "When kernels are hard and dry", icon: "harvest", status: "upcoming" }
    ]
  },
  "Groundnut": {
    cropName: "Groundnut",
    totalDuration: "110-140 days",
    activities: [
      { phase: "Pre-Sowing", activity: "Soil preparation", week: 1, description: "Fine tilth for good germination", icon: "sowing", status: "completed" },
      { phase: "Sowing", activity: "Seed sowing", week: 2, description: "100-125 kg/ha, spacing 30x10 cm", icon: "sowing", status: "completed" },
      { phase: "Germination", activity: "Light irrigation", week: 3, description: "Ensure uniform emergence", icon: "irrigation", status: "completed" },
      { phase: "Seedling", activity: "First weeding", week: 4, description: "Remove weeds manually", icon: "sowing", status: "current" },
      { phase: "Vegetative", activity: "First fertilization", week: 5, description: "Apply 20 kg N + 40 kg P2O5/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Flowering", activity: "Irrigation management", week: 7, description: "Maintain soil moisture", icon: "irrigation", status: "upcoming" },
      { phase: "Pegging", activity: "Earthing up", week: 9, description: "Create ridges for peg penetration", icon: "sowing", status: "upcoming" },
      { phase: "Pod Development", activity: "Critical irrigation", week: 11, description: "Support pod formation", icon: "irrigation", status: "upcoming" },
      { phase: "Pod Filling", activity: "Gypsum application", week: 13, description: "Apply 200-300 kg/ha", icon: "fertilization", status: "upcoming" },
      { phase: "Maturity", activity: "Stop irrigation", week: 15, description: "Allow pods to mature", icon: "irrigation", status: "upcoming" },
      { phase: "Harvest", activity: "Harvesting", week: 17, description: "When leaves turn yellow", icon: "harvest", status: "upcoming" }
    ]
  }
}

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState("Rice")
  const schedule = cropSchedules[selectedCrop]

  const getActivityIcon = (icon: string) => {
    switch (icon) {
      case "sowing": return <Sprout className="h-5 w-5" />
      case "fertilization": return <Package className="h-5 w-5" />
      case "irrigation": return <Droplets className="h-5 w-5" />
      case "harvest": return <Calendar className="h-5 w-5" />
      default: return <Calendar className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "current": return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "upcoming": return "bg-muted text-muted-foreground border-border"
      default: return ""
    }
  }

  const getIconColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 dark:text-green-400 bg-green-500/10"
      case "current": return "text-blue-600 dark:text-blue-400 bg-blue-500/10"
      case "upcoming": return "text-muted-foreground bg-muted"
      default: return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Crop Calendar</CardTitle>
          <CardDescription>Personalized schedule for planting, care, and harvesting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="crop-select">Select Crop</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger id="crop-select">
                <SelectValue placeholder="Choose a crop" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(cropSchedules).map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {schedule && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{schedule.cropName} Growing Schedule</CardTitle>
                <CardDescription className="mt-1">
                  Total Duration: {schedule.totalDuration}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {schedule.activities.filter(a => a.status === "completed").length}/{schedule.activities.length} Completed
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border" />
              
              {schedule.activities.map((activity, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Timeline node */}
                  <div className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 ${getIconColor(activity.status)}`}>
                    {getActivityIcon(activity.icon)}
                  </div>
                  
                  {/* Activity card */}
                  <Card className={`flex-1 border ${getStatusColor(activity.status)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{activity.activity}</h4>
                            {activity.status === "current" && (
                              <Badge className="bg-blue-500 text-white">In Progress</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="font-medium">{activity.phase}</span>
                            <span>•</span>
                            <span>Week {activity.week}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Calendar Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>All timings are approximate and may vary based on weather conditions and crop variety</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Adjust irrigation schedules based on rainfall and soil moisture levels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Follow local agricultural extension guidelines for specific varieties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Monitor weather forecasts and risk alerts for timely interventions</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}