"use client"

import { useState } from "react"
import { BarChart3, Zap, Target, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const optimizationData = [
  {
    section: "Section A",
    efficiency: 92,
    capacity: "85%",
    items: ["Electronics - TVs", "Electronics - Laptops"],
    color: "bg-blue-500",
    recommendation: "Optimal placement achieved",
  },
  {
    section: "Section B",
    efficiency: 78,
    capacity: "65%",
    items: ["Clothing - Winter Jackets", "Clothing - Shoes"],
    color: "bg-green-500",
    recommendation: "Consider consolidating similar items",
  },
  {
    section: "Section C",
    efficiency: 85,
    capacity: "90%",
    items: ["Home & Garden - Furniture"],
    color: "bg-purple-500",
    recommendation: "Near capacity - monitor closely",
  },
  {
    section: "Section D",
    efficiency: 95,
    capacity: "70%",
    items: ["Food - Canned Goods", "Food - Beverages"],
    color: "bg-orange-500",
    recommendation: "Excellent optimization",
  },
]

export default function SectionOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    setTimeout(() => setIsOptimizing(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6" />
                <span>Section Optimization</span>
              </CardTitle>
              <CardDescription>AI-powered optimal placement recommendations for maximum efficiency</CardDescription>
            </div>
            <Button onClick={handleOptimize} disabled={isOptimizing}>
              <Zap className="h-4 w-4 mr-2" />
              {isOptimizing ? "Optimizing..." : "Re-optimize Layout"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-sm text-muted-foreground">Overall Efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">+12%</div>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-2xl font-bold">4.2</div>
                  <p className="text-sm text-muted-foreground">Avg Pick Time (min)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-sm text-muted-foreground">Space Utilization</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Section Layout Optimization</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {optimizationData.map((section, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{section.section}</CardTitle>
                      <Badge
                        variant={
                          section.efficiency >= 90 ? "default" : section.efficiency >= 80 ? "secondary" : "outline"
                        }
                      >
                        {section.efficiency}% Efficient
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Capacity Utilization</span>
                        <span>{section.capacity}</span>
                      </div>
                      <Progress value={Number.parseInt(section.capacity)} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Stored Items:</p>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${section.color}`}></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Recommendation:</p>
                      <p className="text-sm">{section.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Optimization Insights</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• High-frequency items placed near loading docks for faster access</li>
              <li>• Heavy items stored in lower sections to reduce handling time</li>
              <li>• Similar product categories grouped together for efficient picking</li>
              <li>• Temperature-sensitive items allocated to climate-controlled zones</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
