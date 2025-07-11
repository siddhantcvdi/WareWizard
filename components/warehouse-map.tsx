"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box as ThreeBox, Text } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Map, Download, Share2 } from "lucide-react"
import type { Warehouse, Section } from "@/app/page"

// 3D Warehouse Model Component
function WarehouseModel({ warehouse, sections }: { warehouse: Warehouse; sections: Section[] }) {
  const warehouseLength = warehouse.dimensions.length / 10
  const warehouseWidth = warehouse.dimensions.width / 10
  const warehouseHeight = warehouse.dimensions.height / 10

  return (
    <group>
      {/* Main warehouse structure - reduced transparency */}
      <ThreeBox args={[warehouseLength, warehouseHeight, warehouseWidth]} position={[0, warehouseHeight / 2, 0]}>
        <meshStandardMaterial color="#e5e7eb" transparent opacity={0.1} />
      </ThreeBox>

      {/* Warehouse floor */}
      <ThreeBox args={[warehouseLength, 0.2, warehouseWidth]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#6b7280" />
      </ThreeBox>

      {/* Sections - Better space utilization and fixed rendering */}
      {/* Add more sections and increase their dimensions for a denser layout */}
      {Array.from({ length: 8 }).map((_, index) => {
        // Simulate more sections and larger dimensions
        const cols = 4;
        const rows = 2;
        const row = Math.floor(index / cols);
        const col = index % cols;
        // Each section is 22% of warehouse length/width (fills more space)
        const sectionLength = warehouseLength * 0.22;
        const sectionWidth = warehouseWidth * 0.22;
        const sectionHeight = warehouseHeight * 0.7;
        const spacingX = warehouseLength / cols;
        const spacingZ = warehouseWidth / rows;
        const startX = (-(cols - 1) * spacingX) / 2;
        const startZ = (-(rows - 1) * spacingZ) / 2;
        const posX = startX + col * spacingX;
        const posZ = startZ + row * spacingZ;
        // Deterministic utilization and color by index
        const utilizationSteps = [0.65, 0.75, 0.85, 0.95, 0.60, 0.80, 0.90, 0.70];
        const utilizationRate = utilizationSteps[index % utilizationSteps.length];
        const sectionColor = utilizationRate > 0.9 ? "#ef4444" : utilizationRate > 0.7 ? "#f59e0b" : "#10b981";
        return (
          <group key={index}>
            <ThreeBox
              args={[sectionLength, sectionHeight, sectionWidth]}
              position={[posX, sectionHeight / 2 + 0.15, posZ]}
            >
              <meshStandardMaterial color={sectionColor} />
            </ThreeBox>
            <ThreeBox
              args={[sectionLength + 0.2, sectionHeight + 0.2, sectionWidth + 0.2]}
              position={[posX, sectionHeight / 2 + 0.15, posZ]}
            >
              <meshBasicMaterial color="#374151" wireframe />
            </ThreeBox>
            <Text
              position={[posX, sectionHeight + 1.2, posZ]}
              fontSize={0.4}
              color="#1f2937"
              anchorX="center"
              anchorY="middle"
            >
              Section {index + 1}
            </Text>
            <Text
              position={[posX, sectionHeight + 0.7, posZ]}
              fontSize={0.2}
              color="#6b7280"
              anchorX="center"
              anchorY="middle"
            >
              {Math.round(utilizationRate * 100)}% Full
            </Text>
          </group>
        );
      })}

      {/* Loading docks - better proportioned */}
      <ThreeBox args={[3, 1.5, 2]} position={[-warehouseLength / 2 - 1.5, 0.75, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </ThreeBox>
      <ThreeBox args={[3, 1.5, 2]} position={[warehouseLength / 2 + 1.5, 0.75, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </ThreeBox>

      {/* Warehouse label */}
      <Text position={[0, warehouseHeight + 2, 0]} fontSize={0.6} color="#1f2937" anchorX="center" anchorY="middle">
        {warehouse.name}
      </Text>
    </group>
  )
}

interface WarehouseMapProps {
  warehouse: Warehouse
  sections: Section[]
}

export default function WarehouseMap({ warehouse, sections }: WarehouseMapProps) {
  const [viewMode, setViewMode] = useState("3d")

  const totalCapacity = sections.reduce((sum, section) => sum + section.capacity, 0)
  const totalLoad = sections.reduce((sum, section) => sum + section.currentLoad, 0)
  const overallUtilization = Math.round((totalLoad / totalCapacity) * 100)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Map className="h-6 w-6" />
                <span>Warehouse Layout Map</span>
              </CardTitle>
              <CardDescription>Complete overview of warehouse sections and layout</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{warehouse.id}</Badge>
              <Badge variant="outline">
                {(warehouse.dimensions.length * warehouse.dimensions.width).toLocaleString()} sq ft
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="3d">3D Warehouse View</TabsTrigger>
                <TabsTrigger value="2d">2D Floor Plan</TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Map
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Layout
                </Button>
              </div>
            </div>

            <TabsContent value="3d">
              <div className="h-[500px] w-full border rounded-lg bg-gray-50">
                <Canvas camera={{ position: [0, 18, 30], fov: 30 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[20, 20, 10]} intensity={1} />
                  <WarehouseModel warehouse={warehouse} sections={sections} />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <p className="text-sm text-muted-foreground">Active Sections</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">{overallUtilization}%</div>
                    <p className="text-sm text-muted-foreground">Overall Utilization</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600">{totalLoad.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {(warehouse.dimensions.length * warehouse.dimensions.width).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Sq Ft</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="2d">
              <div className="h-[500px] w-full border rounded-lg bg-white p-4">
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  {/* Warehouse outline */}
                  <rect x="50" y="50" width="700" height="500" fill="none" stroke="#374151" strokeWidth="3" />

                  {/* Warehouse label */}
                  <text x="400" y="30" textAnchor="middle" className="text-lg font-bold fill-gray-800">
                    {warehouse.name} - Floor Plan
                  </text>

                  {/* Sections: 8, larger, denser layout */}
                  {Array.from({ length: 8 }).map((_, index) => {
                    const cols = 4;
                    const rows = 2;
                    const row = Math.floor(index / cols);
                    const col = index % cols;
                    // Each section is 25% of warehouse length/width (fills more space)
                    const sectionWidth = 700 * 0.25;
                    const sectionHeight = 500 * 0.25;
                    const spacingX = 700 / cols;
                    const spacingY = 500 / rows;
                    const x = 50 + col * spacingX + (spacingX - sectionWidth) / 2;
                    const y = 50 + row * spacingY + (spacingY - sectionHeight) / 2;
                    // Deterministic utilization and color by index (same as 3D)
                    const utilizationSteps = [0.65, 0.75, 0.85, 0.95, 0.60, 0.80, 0.90, 0.70];
                    const utilizationRate = utilizationSteps[index % utilizationSteps.length];
                    const fillColor = utilizationRate > 0.9 ? "#ef4444" : utilizationRate > 0.7 ? "#f59e0b" : "#10b981";
                    return (
                      <g key={index}>
                        <rect
                          x={x}
                          y={y}
                          width={sectionWidth}
                          height={sectionHeight}
                          fill={fillColor}
                          opacity="0.7"
                          stroke="#374151"
                          strokeWidth="2"
                        />
                        <text
                          x={x + sectionWidth / 2}
                          y={y + sectionHeight / 2 - 10}
                          textAnchor="middle"
                          className="text-sm font-semibold"
                          fill="#111"
                        >
                          Section {index + 1}
                        </text>
                        <text
                          x={x + sectionWidth / 2}
                          y={y + sectionHeight / 2 + 10}
                          textAnchor="middle"
                          className="text-xs"
                          fill="#111"
                        >
                          {Math.round(utilizationRate * 100)}% Full
                        </text>
                        <text
                          x={x + sectionWidth / 2}
                          y={y + sectionHeight / 2 + 25}
                          textAnchor="middle"
                          className="text-xs"
                          fill="#111"
                        >
                          25' × 25'
                        </text>
                      </g>
                    );
                  })}

                  {/* Loading docks */}
                  <rect x="20" y="250" width="30" height="100" fill="#f59e0b" />
                  <rect x="750" y="250" width="30" height="100" fill="#f59e0b" />

                  {/* Loading dock labels */}
                  <text x="35" y="240" textAnchor="middle" className="text-xs fill-gray-600">
                    Dock A
                  </text>
                  <text x="765" y="240" textAnchor="middle" className="text-xs fill-gray-600">
                    Dock B
                  </text>

                  {/* Scale indicator (1px = warehouse.length/700 ft) */}
                  <text x="400" y="580" textAnchor="middle" className="text-sm fill-gray-600">
                    Scale: 1px = {(warehouse.dimensions.length / 700).toFixed(2)} ft
                  </text>
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500"></div>
                  <span className="text-sm">Low Utilization (&lt;70%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500"></div>
                  <span className="text-sm">Medium Utilization (70-90%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500"></div>
                  <span className="text-sm">High Utilization (&gt;90%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500"></div>
                  <span className="text-sm">Loading Docks</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Section Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => {
          const utilizationRate = Math.round((section.currentLoad / section.capacity) * 100)
          return (
            <Card key={section.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{section.name}</h4>
                  <Badge
                    variant={utilizationRate > 90 ? "destructive" : utilizationRate > 70 ? "default" : "secondary"}
                  >
                    {utilizationRate}%
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>
                    Size: {section.dimensions.length}' × {section.dimensions.width}' × {section.dimensions.height}'
                  </div>
                  <div>
                    Items: {section.currentLoad} / {section.capacity}
                  </div>
                  <div>Categories: {[...new Set(section.items.map((item) => item.category))].length}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
