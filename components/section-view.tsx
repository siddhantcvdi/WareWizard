"use client"

import { useState } from "react"
import { ArrowLeft, Box, Package, BarChart3, Grid3X3 } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box as ThreeBox, Text } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Section, Warehouse } from "@/app/page"

// 3D Section Component
function SectionModel({ section }: { section: Section }) {
  const boxesPerRow = Math.ceil(Math.sqrt(section.items.length))

  return (
    <group>
      {/* Section boundaries */}
      <ThreeBox args={[section.dimensions.length / 10, 0.1, section.dimensions.width / 10]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </ThreeBox>

      {/* Section walls (wireframe) */}
      <ThreeBox
        args={[section.dimensions.length / 10, section.dimensions.height / 10, section.dimensions.width / 10]}
        position={[0, section.dimensions.height / 20, 0]}
      >
        <meshStandardMaterial color="#6b7280" transparent opacity={0.1} wireframe />
      </ThreeBox>

      {/* Individual item boxes */}
      {section.items.map((item, index) => {
        const row = Math.floor(index / boxesPerRow)
        const col = index % boxesPerRow
        const spacing = 1.5
        const startX = (-(boxesPerRow - 1) * spacing) / 2
        const startZ = (-(Math.ceil(section.items.length / boxesPerRow) - 1) * spacing) / 2

        return (
          <group key={item.id}>
            <ThreeBox
              args={[
                Math.max(0.3, item.dimensions.length / 50),
                Math.max(0.3, item.dimensions.height / 50),
                Math.max(0.3, item.dimensions.width / 50),
              ]}
              position={[startX + col * spacing, item.dimensions.height / 50 / 2 + 0.1, startZ + row * spacing]}
            >
              <meshStandardMaterial
                color={item.priority === "high" ? "#ef4444" : item.priority === "medium" ? "#f59e0b" : "#10b981"}
              />
            </ThreeBox>
            <Text
              position={[startX + col * spacing, item.dimensions.height / 50 + 0.3, startZ + row * spacing]}
              fontSize={0.1}
              color="#1f2937"
              anchorX="center"
              anchorY="middle"
            >
              {item.id}
            </Text>
          </group>
        )
      })}

      {/* Section label */}
      <Text
        position={[0, section.dimensions.height / 10 + 1, 0]}
        fontSize={0.3}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        {section.name}
      </Text>
    </group>
  )
}

interface SectionViewProps {
  section: Section
  warehouse: Warehouse
  onBack: () => void
}

export default function SectionView({ section, warehouse, onBack }: SectionViewProps) {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d")

  const utilizationRate = Math.round((section.currentLoad / section.capacity) * 100)
  const categoryStats = section.items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {warehouse.name}
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{section.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {section.dimensions.length}' × {section.dimensions.width}' × {section.dimensions.height}' •{" "}
                  {section.items.length} item types
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{section.id}</Badge>
              <Badge variant={utilizationRate > 90 ? "destructive" : utilizationRate > 70 ? "default" : "secondary"}>
                {utilizationRate}% Full
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Box className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{section.items.length}</div>
                  <p className="text-sm text-muted-foreground">Item Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{section.currentLoad}</div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{utilizationRate}%</div>
                  <p className="text-sm text-muted-foreground">Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <div className="text-2xl font-bold">{Object.keys(categoryStats).length}</div>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "3d" | "grid")} className="space-y-6">
          <TabsList>
            <TabsTrigger value="3d">3D Section View</TabsTrigger>
            <TabsTrigger value="grid">Grid Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="3d">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid3X3 className="h-5 w-5" />
                  <span>3D Section Layout</span>
                </CardTitle>
                <CardDescription>Interactive 3D view showing item placement within the section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full border rounded-lg bg-gray-50">
                  <Canvas camera={{ position: [0, 5, 12], fov: 30 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <SectionModel section={section} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Canvas>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500"></div>
                    <span className="text-sm">High Priority Items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500"></div>
                    <span className="text-sm">Medium Priority Items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500"></div>
                    <span className="text-sm">Low Priority Items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Items in Section</CardTitle>
                    <CardDescription>Detailed view of all items stored in this section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <Badge
                                variant={
                                  item.priority === "high"
                                    ? "destructive"
                                    : item.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="font-medium">Quantity:</span> {item.quantity}
                              </div>
                              <div>
                                <span className="font-medium">Weight:</span> {item.weight} lbs
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Dimensions: {item.dimensions.length}" × {item.dimensions.width}" ×{" "}
                              {item.dimensions.height}"
                            </div>
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs">
                                ID: {item.id}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Section Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Capacity Utilization</span>
                        <span>{utilizationRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {section.currentLoad} / {section.capacity} items
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(categoryStats).map(([category, count]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-sm">{category}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Section Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Section ID:</span>
                      <span>{section.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length:</span>
                      <span>{section.dimensions.length} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Width:</span>
                      <span>{section.dimensions.width} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span>{section.dimensions.height} ft</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-muted-foreground">Floor Area:</span>
                      <span>{(section.dimensions.length * section.dimensions.width).toLocaleString()} sq ft</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
