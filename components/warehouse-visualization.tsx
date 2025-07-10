"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Text } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Share2 } from "lucide-react"

function WarehouseModel() {
  return (
    <group>
      {/* Main warehouse structure */}
      <Box args={[20, 8, 12]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#e5e7eb" transparent opacity={0.3} />
      </Box>

      {/* Floor */}
      <Box args={[20, 0.2, 12]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#6b7280" />
      </Box>

      {/* Storage sections */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} args={[2, 3, 2]} position={[-7 + i * 2.5, 1.5, -3]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>
      ))}

      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i + 6} args={[2, 3, 2]} position={[-7 + i * 2.5, 1.5, 3]}>
          <meshStandardMaterial color="#10b981" />
        </Box>
      ))}

      {/* Labels */}
      <Text position={[0, 6, 0]} fontSize={1} color="#1f2937" anchorX="center" anchorY="middle">
        Walmart Distribution Center - WH-001
      </Text>
    </group>
  )
}

export default function WarehouseVisualization() {
  const [viewMode, setViewMode] = useState("3d")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6" />
                <span>Warehouse Visualization</span>
              </CardTitle>
              <CardDescription>3D model and 2D floor plan generated from your warehouse specifications</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">WH-001</Badge>
              <Badge variant="outline">500 x 300 x 30 ft</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode} onValueChange={setViewMode}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="3d">3D Model</TabsTrigger>
                <TabsTrigger value="2d">2D Floor Plan</TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <TabsContent value="3d">
              <div className="h-96 w-full border rounded-lg bg-gray-50">
                <Canvas camera={{ position: [25, 15, 25], fov: 60 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <WarehouseModel />
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">150,000</div>
                    <p className="text-sm text-muted-foreground">Total Sq Ft</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <p className="text-sm text-muted-foreground">Storage Sections</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <p className="text-sm text-muted-foreground">Space Efficiency</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="2d">
              <div className="h-96 w-full border rounded-lg bg-white p-4">
                <svg viewBox="0 0 500 300" className="w-full h-full">
                  {/* Warehouse outline */}
                  <rect x="50" y="50" width="400" height="200" fill="none" stroke="#374151" strokeWidth="2" />

                  {/* Storage sections */}
                  {Array.from({ length: 6 }, (_, i) => (
                    <rect key={i} x={70 + i * 60} y={80} width={40} height={60} fill="#3b82f6" opacity="0.7" />
                  ))}

                  {Array.from({ length: 6 }, (_, i) => (
                    <rect key={i + 6} x={70 + i * 60} y={160} width={40} height={60} fill="#10b981" opacity="0.7" />
                  ))}

                  {/* Loading docks */}
                  <rect x="50" y="120" width="20" height="60" fill="#f59e0b" />
                  <rect x="430" y="120" width="20" height="60" fill="#f59e0b" />

                  {/* Labels */}
                  <text x="250" y="30" textAnchor="middle" className="text-sm font-semibold">
                    Walmart Distribution Center - Floor Plan
                  </text>
                  <text x="250" y="280" textAnchor="middle" className="text-xs">
                    Scale: 1" = 50 ft
                  </text>
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 opacity-70"></div>
                  <span className="text-sm">Storage Section A</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 opacity-70"></div>
                  <span className="text-sm">Storage Section B</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-600"></div>
                  <span className="text-sm">Loading Docks</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
