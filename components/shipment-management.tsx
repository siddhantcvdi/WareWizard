"use client"

import { useState } from "react"
import { Truck, Plus, MapPin, Clock, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const sampleShipments = [
  {
    id: "SH001",
    items: "Electronics - Smartphones",
    quantity: 200,
    priority: "High",
    status: "Pending Placement",
    recommendedSection: "Section A-1",
    estimatedTime: "15 min",
  },
  {
    id: "SH002",
    items: "Clothing - Summer Collection",
    quantity: 150,
    priority: "Medium",
    status: "In Progress",
    recommendedSection: "Section B-3",
    estimatedTime: "25 min",
  },
  {
    id: "SH003",
    items: "Home Appliances",
    quantity: 75,
    priority: "Low",
    status: "Completed",
    recommendedSection: "Section C-2",
    estimatedTime: "Completed",
  },
]

export default function ShipmentManagement() {
  const [shipments, setShipments] = useState(sampleShipments)
  const [isAddingShipment, setIsAddingShipment] = useState(false)
  const [newShipment, setNewShipment] = useState({
    items: "",
    quantity: "",
    priority: "",
    specialRequirements: "",
  })
  const [placementRecommendation, setPlacementRecommendation] = useState(null)

  const handleAddShipment = () => {
    const recommendation = generatePlacementRecommendation(newShipment)
    const newItem = {
      id: `SH${String(shipments.length + 1).padStart(3, "0")}`,
      items: newShipment.items,
      quantity: Number.parseInt(newShipment.quantity),
      priority: newShipment.priority,
      status: "Pending Placement",
      recommendedSection: recommendation.section,
      estimatedTime: recommendation.time,
    }
    setShipments([...shipments, newItem])
    setPlacementRecommendation(recommendation)
    setNewShipment({ items: "", quantity: "", priority: "", specialRequirements: "" })
  }

  const generatePlacementRecommendation = (shipment) => {
    // Simulate AI recommendation logic
    const sections = ["A-1", "A-2", "B-1", "B-2", "C-1", "C-2"]
    const randomSection = sections[Math.floor(Math.random() * sections.length)]
    const estimatedTime = Math.floor(Math.random() * 30) + 10

    return {
      section: `Section ${randomSection}`,
      time: `${estimatedTime} min`,
      reason: "Optimal placement based on item category, frequency of access, and current capacity",
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-6 w-6" />
                <span>Shipment Management</span>
              </CardTitle>
              <CardDescription>Track incoming shipments and get optimal placement recommendations</CardDescription>
            </div>
            <Dialog open={isAddingShipment} onOpenChange={setIsAddingShipment}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Shipment</DialogTitle>
                  <DialogDescription>Enter shipment details to get optimal placement recommendations</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shipmentItems">Items Description</Label>
                    <Input
                      id="shipmentItems"
                      value={newShipment.items}
                      onChange={(e) => setNewShipment({ ...newShipment, items: e.target.value })}
                      placeholder="e.g., Electronics - Tablets"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shipmentQuantity">Quantity</Label>
                      <Input
                        id="shipmentQuantity"
                        type="number"
                        value={newShipment.quantity}
                        onChange={(e) => setNewShipment({ ...newShipment, quantity: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipmentPriority">Priority</Label>
                      <Select
                        value={newShipment.priority}
                        onValueChange={(value) => setNewShipment({ ...newShipment, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      value={newShipment.specialRequirements}
                      onChange={(e) => setNewShipment({ ...newShipment, specialRequirements: e.target.value })}
                      placeholder="Temperature control, fragile handling, etc."
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingShipment(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddShipment}>Get Placement Recommendation</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recommended Section</TableHead>
                  <TableHead>Est. Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.items}</TableCell>
                    <TableCell>{shipment.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          shipment.priority === "High"
                            ? "destructive"
                            : shipment.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {shipment.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          shipment.status === "Completed"
                            ? "default"
                            : shipment.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">{shipment.recommendedSection}</TableCell>
                    <TableCell>{shipment.estimatedTime}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {placementRecommendation && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <MapPin className="h-5 w-5" />
              <span>Placement Recommendation Generated</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Recommended Section</p>
                  <p className="text-sm text-muted-foreground">{placementRecommendation.section}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Estimated Placement Time</p>
                  <p className="text-sm text-muted-foreground">{placementRecommendation.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  <p className="font-medium">Optimization Score</p>
                  <p className="text-sm text-muted-foreground">94% Efficiency</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded border">
              <p className="text-sm">
                <strong>Reasoning:</strong> {placementRecommendation.reason}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
