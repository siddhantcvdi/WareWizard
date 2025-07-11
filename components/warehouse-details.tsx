"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Package, Plus, Grid3X3, BarChart3, Settings, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import type { Warehouse, Section, GoodsItem } from "@/app/page"
import WarehouseMap from "@/components/warehouse-map"

// Sample inventory data
const sampleGoods: GoodsItem[] = [
  {
    id: "G001",
    name: 'Samsung 55" Smart TV',
    category: "Electronics",
    quantity: 120,
    dimensions: { length: 48, width: 28, height: 3 },
    weight: 35,
    priority: "high",
  },
  {
    id: "G002",
    name: "Nike Air Max Shoes",
    category: "Footwear",
    quantity: 300,
    dimensions: { length: 12, width: 8, height: 5 },
    weight: 2,
    priority: "medium",
  },
  {
    id: "G003",
    name: "Office Chair",
    category: "Furniture",
    quantity: 85,
    dimensions: { length: 26, width: 26, height: 40 },
    weight: 45,
    priority: "low",
  },
  {
    id: "G004",
    name: "Canned Tomatoes",
    category: "Grocery",
    quantity: 500,
    dimensions: { length: 4, width: 4, height: 5 },
    weight: 1.5,
    priority: "high",
  },
  {
    id: "G005",
    name: "Winter Jackets",
    category: "Apparel",
    quantity: 200,
    dimensions: { length: 24, width: 18, height: 2 },
    weight: 3,
    priority: "medium",
  },
  {
    id: "G006",
    name: "Laptop Computers",
    category: "Electronics",
    quantity: 75,
    dimensions: { length: 14, width: 10, height: 1 },
    weight: 4,
    priority: "high",
  },
]

// Generate sections with organized goods
const generateSections = (goods: GoodsItem[]): Section[] => {
  return [
    {
      id: "SEC-A1",
      name: "Electronics Section A",
      dimensions: { length: 100, width: 80, height: 20 },
      position: { x: 0, y: 0, z: 0 },
      capacity: 150,
      currentLoad: 120,
      items: goods.filter((g) => g.category === "Electronics"),
    },
    {
      id: "SEC-B1",
      name: "Apparel & Footwear B",
      dimensions: { length: 60, width: 50, height: 15 },
      position: { x: 90, y: 0, z: 0 },
      capacity: 600,
      currentLoad: 500,
      items: goods.filter((g) => g.category === "Footwear" || g.category === "Apparel"),
    },
    {
      id: "SEC-C1",
      name: "Furniture Section C",
      dimensions: { length: 100, width: 60, height: 25 },
      position: { x: 0, y: 60, z: 0 },
      capacity: 100,
      currentLoad: 85,
      items: goods.filter((g) => g.category === "Furniture"),
    },
    {
      id: "SEC-D1",
      name: "Grocery Section D",
      dimensions: { length: 70, width: 45, height: 18 },
      position: { x: 110, y: 60, z: 0 },
      capacity: 800,
      currentLoad: 500,
      items: goods.filter((g) => g.category === "Grocery"),
    },
  ]
}

interface WarehouseDetailsProps {
  warehouse: Warehouse
  onBack: () => void
  onSectionSelect: (section: Section) => void
  inventoryConnected?: boolean
  onInventoryConnectionChange?: (connected: boolean) => void
}

export default function WarehouseDetails({
  warehouse,
  onBack,
  onSectionSelect,
  inventoryConnected: externalInventoryConnected,
  onInventoryConnectionChange,
}: WarehouseDetailsProps) {
  const [goods] = useState<GoodsItem[]>(sampleGoods)
  const [sections] = useState<Section[]>(generateSections(sampleGoods))
  const [localInventoryConnected, setLocalInventoryConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Use external state if provided, otherwise use local state
  const inventoryConnected =
    externalInventoryConnected !== undefined ? externalInventoryConnected : localInventoryConnected

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      console.log("Inventory file selected:", file.name)
    }
  }

  const handleConnectInventory = async () => {
    if (!selectedFile) {
      alert("Please select an inventory file first")
      return
    }

    setIsConnecting(true)
    setConnectionProgress(0)

    // Simulate file processing and connection
    for (let i = 0; i <= 100; i += 10) {
      setConnectionProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // Update inventory connection state
    if (onInventoryConnectionChange) {
      onInventoryConnectionChange(true)
    } else {
      setLocalInventoryConnected(true)
    }

    setIsConnecting(false)
    setConnectionProgress(0)
  }

  const totalCapacity = sections.reduce((sum, section) => sum + section.capacity, 0)
  const totalLoad = sections.reduce((sum, section) => sum + section.currentLoad, 0)
  const utilizationRate = Math.round((totalLoad / totalCapacity) * 100)

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold">Connecting Inventory System</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Processing Inventory Connection</CardTitle>
              <CardDescription>Analyzing inventory data and generating optimal sections...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={connectionProgress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                {connectionProgress < 30
                  ? "Reading inventory file..."
                  : connectionProgress < 60
                    ? "Analyzing product categories..."
                    : connectionProgress < 90
                      ? "Generating optimal sections..."
                      : "Finalizing connection..."}
              </p>
              {selectedFile && (
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    Processing: {selectedFile.name}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{warehouse.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {warehouse.location} • {warehouse.type}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{warehouse.id}</Badge>
              <Badge variant="default">{warehouse.status}</Badge>
              {inventoryConnected && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Inventory Connected
                </Badge>
              )}
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
                <Grid3X3 className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{inventoryConnected ? sections.length : 0}</div>
                  <p className="text-sm text-muted-foreground">Active Sections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{inventoryConnected ? goods.length : 0}</div>
                  <p className="text-sm text-muted-foreground">Product Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{inventoryConnected ? utilizationRate : 0}%</div>
                  <p className="text-sm text-muted-foreground">Space Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <div className="text-2xl font-bold">{inventoryConnected ? totalLoad.toLocaleString() : 0}</div>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList>
            {inventoryConnected && <TabsTrigger value="map">Warehouse Map</TabsTrigger>}
            <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
            {inventoryConnected && <TabsTrigger value="sections">Section Overview</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {inventoryConnected && (
            <TabsContent value="map" className="space-y-6">
              <WarehouseMap warehouse={warehouse} sections={sections} />
            </TabsContent>
          )}

          <TabsContent value="inventory" className="space-y-6">
            {!inventoryConnected ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Inventory System</CardTitle>
                  <CardDescription>Upload your inventory file to organize goods into optimal sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Organize Your Inventory</h3>
                    <p className="text-muted-foreground mb-6">
                      Upload your inventory file and we'll analyze your goods to create optimal section layouts
                    </p>
                  </div>

                  {/* File Upload Section */}
                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-lg font-medium">Upload Inventory File</p>
                        <p className="text-sm text-muted-foreground">Supported formats: CSV, Excel (.xlsx), JSON</p>
                      </div>

                      {selectedFile && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge variant="secondary" className="text-sm">
                            {selectedFile.name}
                          </Badge>
                        </div>
                      )}

                      <input
                        type="file"
                        id="inventory-file"
                        accept=".csv,.xlsx,.xls,.json"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button variant="outline" onClick={() => document.getElementById("inventory-file")?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        {selectedFile ? "Change File" : "Choose File"}
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Button onClick={handleConnectInventory} size="lg" disabled={!selectedFile}>
                      <Plus className="h-4 w-4 mr-2" />
                      Connect Inventory & Generate Sections
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have an inventory file? We'll use sample data to demonstrate the system.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">✓ Inventory Connected & Organized</CardTitle>
                  <CardDescription>Your goods have been analyzed and organized into optimal sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goods.map((item) => (
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
                              <span className="font-medium">Qty:</span> {item.quantity}
                            </div>
                            <div>
                              <span className="font-medium">Weight:</span> {item.weight} lbs
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.dimensions.length}" × {item.dimensions.width}" × {item.dimensions.height}"
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            {inventoryConnected ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Sections</CardTitle>
                    <CardDescription>AI-optimized sections based on your inventory analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sections.map((section) => (
                        <Card
                          key={section.id}
                          className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                          onClick={() => onSectionSelect(section)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{section.name}</CardTitle>
                              <Badge variant="outline">{section.id}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <div className="font-medium">{section.dimensions.length}'</div>
                                <div className="text-muted-foreground">Length</div>
                              </div>
                              <div>
                                <div className="font-medium">{section.dimensions.width}'</div>
                                <div className="text-muted-foreground">Width</div>
                              </div>
                              <div>
                                <div className="font-medium">{section.dimensions.height}'</div>
                                <div className="text-muted-foreground">Height</div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Capacity Utilization</span>
                                <span>{Math.round((section.currentLoad / section.capacity) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${(section.currentLoad / section.capacity) * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {section.currentLoad} / {section.capacity} items
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium">Stored Categories:</p>
                              <div className="flex flex-wrap gap-1">
                                {[...new Set(section.items.map((item) => item.category))].map((category) => (
                                  <Badge key={category} variant="secondary" className="text-xs">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              View Section Details →
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Grid3X3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sections Not Generated Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your inventory first to generate optimized sections
                  </p>
                  <Button variant="outline" onClick={() => document.querySelector('[value="inventory"]')?.click()}>
                    Go to Inventory Management
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Warehouse Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warehouse ID:</span>
                        <span>{warehouse.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{warehouse.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default">{warehouse.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Dimensions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Length:</span>
                        <span>{warehouse.dimensions.length} ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Width:</span>
                        <span>{warehouse.dimensions.width} ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Height:</span>
                        <span>{warehouse.dimensions.height} ft</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-muted-foreground">Total Area:</span>
                        <span>{(warehouse.dimensions.length * warehouse.dimensions.width).toLocaleString()} sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
