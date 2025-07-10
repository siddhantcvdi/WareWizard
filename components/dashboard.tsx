"use client"

import { Building2, Plus, MapPin, Calendar, Activity, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Warehouse } from "@/app/page"

interface DashboardProps {
  user: { name: string; role: string }
  warehouses: Warehouse[]
  onCreateWarehouse: () => void
  onSelectWarehouse: (warehouse: Warehouse) => void
  onLogout: () => void
}

export default function Dashboard({
  user,
  warehouses,
  onCreateWarehouse,
  onSelectWarehouse,
  onLogout,
}: DashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "setup":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WareWizard</h1>
                <p className="text-sm text-gray-600">Intelligent Warehouse Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
                <Badge variant="outline">{user.role}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{warehouses.length}</div>
                  <p className="text-sm text-muted-foreground">Total Warehouses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{warehouses.filter((w) => w.status === "active").length}</div>
                  <p className="text-sm text-muted-foreground">Active Warehouses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-sm text-muted-foreground">Overall Efficiency</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-sm text-muted-foreground">Total Sq Ft</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warehouses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Warehouses</h2>
              <p className="text-muted-foreground">Manage and monitor your warehouse facilities</p>
            </div>
            <Button onClick={onCreateWarehouse}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Warehouse
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses.map((warehouse) => (
              <Card
                key={warehouse.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectWarehouse(warehouse)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <Badge variant={getStatusColor(warehouse.status)}>{warehouse.status}</Badge>
                  </div>
                  <CardDescription>{warehouse.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{warehouse.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created {warehouse.createdAt}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="font-medium">{warehouse.dimensions.length}'</div>
                      <div className="text-muted-foreground">Length</div>
                    </div>
                    <div>
                      <div className="font-medium">{warehouse.dimensions.width}'</div>
                      <div className="text-muted-foreground">Width</div>
                    </div>
                    <div>
                      <div className="font-medium">{warehouse.dimensions.height}'</div>
                      <div className="text-muted-foreground">Height</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm font-medium">
                      {(warehouse.dimensions.length * warehouse.dimensions.width).toLocaleString()} sq ft
                    </div>
                    <div className="text-xs text-muted-foreground">Total Floor Area</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {warehouses.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Warehouses Yet</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first warehouse facility</p>
                <Button onClick={onCreateWarehouse}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Warehouse
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
