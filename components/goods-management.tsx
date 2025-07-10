"use client"

import { useState } from "react"
import { Plus, Package, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const sampleGoods = [
  {
    id: "G001",
    name: "Electronics - TVs",
    category: "Electronics",
    quantity: 150,
    weight: "25 lbs",
    dimensions: "55x32x4",
    priority: "High",
  },
  {
    id: "G002",
    name: "Clothing - Winter Jackets",
    category: "Apparel",
    quantity: 300,
    weight: "2 lbs",
    dimensions: "24x18x2",
    priority: "Medium",
  },
  {
    id: "G003",
    name: "Home & Garden - Furniture",
    category: "Furniture",
    quantity: 75,
    weight: "45 lbs",
    dimensions: "72x36x30",
    priority: "Low",
  },
  {
    id: "G004",
    name: "Food - Canned Goods",
    category: "Grocery",
    quantity: 500,
    weight: "1.5 lbs",
    dimensions: "4x4x6",
    priority: "High",
  },
]

export default function GoodsManagement() {
  const [goods, setGoods] = useState(sampleGoods)
  const [isAddingGoods, setIsAddingGoods] = useState(false)
  const [newGoods, setNewGoods] = useState({
    name: "",
    category: "",
    quantity: "",
    weight: "",
    dimensions: "",
    priority: "",
  })

  const handleAddGoods = () => {
    const newItem = {
      id: `G${String(goods.length + 1).padStart(3, "0")}`,
      ...newGoods,
      quantity: Number.parseInt(newGoods.quantity),
    }
    setGoods([...goods, newItem])
    setNewGoods({ name: "", category: "", quantity: "", weight: "", dimensions: "", priority: "" })
    setIsAddingGoods(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <span>Goods Management</span>
              </CardTitle>
              <CardDescription>Manage inventory items and their storage requirements</CardDescription>
            </div>
            <Dialog open={isAddingGoods} onOpenChange={setIsAddingGoods}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goods
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Goods</DialogTitle>
                  <DialogDescription>Enter details for the new inventory item</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goodsName">Product Name</Label>
                    <Input
                      id="goodsName"
                      value={newGoods.name}
                      onChange={(e) => setNewGoods({ ...newGoods, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newGoods.category}
                      onValueChange={(value) => setNewGoods({ ...newGoods, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Apparel">Apparel</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newGoods.quantity}
                        onChange={(e) => setNewGoods({ ...newGoods, quantity: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={newGoods.weight}
                        onChange={(e) => setNewGoods({ ...newGoods, weight: e.target.value })}
                        placeholder="0 lbs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (LxWxH)</Label>
                    <Input
                      id="dimensions"
                      value={newGoods.dimensions}
                      onChange={(e) => setNewGoods({ ...newGoods, dimensions: e.target.value })}
                      placeholder="24x18x12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newGoods.priority}
                      onValueChange={(value) => setNewGoods({ ...newGoods, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingGoods(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddGoods}>Add Goods</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search goods..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Dimensions</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goods.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.dimensions}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === "High"
                            ? "destructive"
                            : item.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
