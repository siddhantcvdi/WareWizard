"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, ImageIcon, Building, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
  const [blueprintFiles, setBlueprintFiles] = useState<File[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !formData.warehouseId ||
      !formData.warehouseName ||
      !formData.location ||
      !formData.warehouseType ||
      !formData.length ||
      !formData.width ||
      !formData.height
    ) {
      alert("Please fill in all required fields")
      return
    }

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

  const handleBlueprintUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setBlueprintFiles(files)
    console.log(
      "Blueprints uploaded:",
      files.map((f) => f.name),
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotoFiles(files)
    console.log(
      "Photos uploaded:",
      files.map((f) => f.name),
    )
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

                      {blueprintFiles.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge variant="secondary" className="text-xs">
                            {blueprintFiles.length} file{blueprintFiles.length !== 1 ? "s" : ""} selected
                          </Badge>
                        </div>
                      )}

                      <input
                        type="file"
                        id="blueprints"
                        accept=".pdf,.dwg,.dxf,.cad"
                        multiple
                        className="hidden"
                        onChange={handleBlueprintUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("blueprints")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {blueprintFiles.length > 0 ? "Change Files" : "Choose Files"}
                      </Button>

                      {blueprintFiles.length > 0 && (
                        <div className="w-full mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Selected files:</p>
                          <div className="space-y-1 max-h-20 overflow-y-auto">
                            {blueprintFiles.map((file, index) => (
                              <div key={index} className="text-xs bg-muted p-1 rounded truncate">
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Upload Photos</p>
                        <p className="text-xs text-muted-foreground">Interior & exterior images</p>
                      </div>

                      {photoFiles.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge variant="secondary" className="text-xs">
                            {photoFiles.length} image{photoFiles.length !== 1 ? "s" : ""} selected
                          </Badge>
                        </div>
                      )}

                      <input
                        type="file"
                        id="photos"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("photos")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {photoFiles.length > 0 ? "Change Images" : "Choose Images"}
                      </Button>

                      {photoFiles.length > 0 && (
                        <div className="w-full mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Selected images:</p>
                          <div className="space-y-1 max-h-20 overflow-y-auto">
                            {photoFiles.map((file, index) => (
                              <div key={index} className="text-xs bg-muted p-1 rounded truncate">
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
                <Button
                  type="submit"
                  disabled={
                    !formData.warehouseId ||
                    !formData.warehouseName ||
                    !formData.location ||
                    !formData.warehouseType ||
                    !formData.length ||
                    !formData.width ||
                    !formData.height
                  }
                >
                  Register Warehouse
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
