"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, ImageIcon, Building, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import type { Warehouse } from "@/app/page"

interface WarehouseRegistrationProps {
  onRegistrationComplete: (warehouse: Warehouse) => void
  onCancel: () => void
}

export default function WarehouseRegistration({ onRegistrationComplete, onCancel }: WarehouseRegistrationProps) {
  const [formData, setFormData] = useState({
    warehouseId: "",
    warehouseName: "",
    location: "",
    warehouseType: "",
    length: "",
    width: "",
    height: "",
    description: "",
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission and processing
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    const newWarehouse: Warehouse = {
      id: formData.warehouseId,
      name: formData.warehouseName,
      location: formData.location,
      type: formData.warehouseType,
      dimensions: {
        length: Number.parseInt(formData.length),
        width: Number.parseInt(formData.width),
        height: Number.parseInt(formData.height),
      },
      status: "setup",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setTimeout(() => {
      onRegistrationComplete(newWarehouse)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-2xl pt-8">
          <Card>
            <CardHeader>
              <CardTitle>Processing Warehouse Registration</CardTitle>
              <CardDescription>Uploading files and generating 3D models...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                {uploadProgress < 50
                  ? "Uploading blueprints and images..."
                  : uploadProgress < 80
                    ? "Generating 3D warehouse model..."
                    : "Finalizing registration..."}
              </p>
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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">Register New Warehouse</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-6 w-6" />
              <span>Warehouse Registration</span>
            </CardTitle>
            <CardDescription>
              Register your warehouse with detailed specifications to enable optimal space management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouseId">Warehouse ID *</Label>
                  <Input
                    id="warehouseId"
                    placeholder="WH-003"
                    value={formData.warehouseId}
                    onChange={(e) => handleInputChange("warehouseId", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouseName">Warehouse Name *</Label>
                  <Input
                    id="warehouseName"
                    placeholder="Austin Distribution Center"
                    value={formData.warehouseName}
                    onChange={(e) => handleInputChange("warehouseName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Austin, TX"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouseType">Warehouse Type *</Label>
                  <Select
                    value={formData.warehouseType}
                    onValueChange={(value) => handleInputChange("warehouseType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Distribution Center">Distribution Center</SelectItem>
                      <SelectItem value="Fulfillment Center">Fulfillment Center</SelectItem>
                      <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                      <SelectItem value="Cross-Dock Facility">Cross-Dock Facility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Warehouse Dimensions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (ft) *</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="600"
                      value={formData.length}
                      onChange={(e) => handleInputChange("length", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (ft) *</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="400"
                      value={formData.width}
                      onChange={(e) => handleInputChange("width", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (ft) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="35"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upload Documents & Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Upload Blueprints</p>
                        <p className="text-xs text-muted-foreground">PDF, DWG, or CAD files</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Upload Photos</p>
                        <p className="text-xs text-muted-foreground">Interior & exterior images</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Images
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Additional Notes</Label>
                <Textarea
                  id="description"
                  placeholder="Any special requirements, existing equipment, or layout considerations..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">Register Warehouse</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
