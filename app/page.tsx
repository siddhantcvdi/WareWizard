"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"
import WarehouseRegistration from "@/components/warehouse-registration"
import WarehouseDetails from "@/components/warehouse-details"
import SectionView from "@/components/section-view"

export type Warehouse = {
  id: string
  name: string
  location: string
  type: string
  dimensions: {
    length: number
    width: number
    height: number
  }
  status: "active" | "setup" | "inactive"
  createdAt: string
}

export type GoodsItem = {
  id: string
  name: string
  category: string
  quantity: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
  priority: "high" | "medium" | "low"
}

export type Section = {
  id: string
  name: string
  dimensions: {
    length: number
    width: number
    height: number
  }
  position: {
    x: number
    y: number
    z: number
  }
  capacity: number
  currentLoad: number
  items: GoodsItem[]
}

export default function WalmartWarehouseSystem() {
  const [currentView, setCurrentView] = useState<
    "login" | "dashboard" | "create-warehouse" | "warehouse-details" | "section-view"
  >("login")
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [warehouseInventoryStates, setWarehouseInventoryStates] = useState<Record<string, boolean>>({})
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "WH-001",
      name: "Dallas Distribution Center",
      location: "Dallas, TX",
      type: "Distribution Center",
      dimensions: { length: 500, width: 300, height: 30 },
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "WH-002",
      name: "Houston Fulfillment Center",
      location: "Houston, TX",
      type: "Fulfillment Center",
      dimensions: { length: 400, width: 250, height: 25 },
      status: "active",
      createdAt: "2024-02-10",
    },
  ])

  const handleLogin = (userData: { name: string; role: string }) => {
    setCurrentUser(userData)
    setCurrentView("dashboard")
  }

  const handleWarehouseCreated = (warehouse: Warehouse) => {
    setWarehouses([...warehouses, warehouse])
    setCurrentView("dashboard")
  }

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse)
    setCurrentView("warehouse-details")
  }

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section)
    setCurrentView("section-view")
  }

  const handleBackToDashboard = () => {
    setSelectedWarehouse(null)
    setCurrentView("dashboard")
  }

  const handleBackToWarehouse = () => {
    setSelectedSection(null)
    setCurrentView("warehouse-details")
  }

  const handleInventoryConnectionChange = (warehouseId: string, connected: boolean) => {
    setWarehouseInventoryStates((prev) => ({
      ...prev,
      [warehouseId]: connected,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === "login" && <LoginPage onLogin={handleLogin} />}

      {currentView === "dashboard" && currentUser && (
        <Dashboard
          user={currentUser}
          warehouses={warehouses}
          onCreateWarehouse={() => setCurrentView("create-warehouse")}
          onSelectWarehouse={handleWarehouseSelect}
          onLogout={() => {
            setCurrentUser(null)
            setCurrentView("login")
          }}
        />
      )}

      {currentView === "create-warehouse" && (
        <WarehouseRegistration onRegistrationComplete={handleWarehouseCreated} onCancel={handleBackToDashboard} />
      )}

      {currentView === "warehouse-details" && selectedWarehouse && (
        <WarehouseDetails
          warehouse={selectedWarehouse}
          onBack={handleBackToDashboard}
          onSectionSelect={handleSectionSelect}
          inventoryConnected={warehouseInventoryStates[selectedWarehouse.id] || false}
          onInventoryConnectionChange={(connected) => handleInventoryConnectionChange(selectedWarehouse.id, connected)}
        />
      )}

      {currentView === "section-view" && selectedSection && selectedWarehouse && (
        <SectionView section={selectedSection} warehouse={selectedWarehouse} onBack={handleBackToWarehouse} />
      )}
    </div>
  )
}
// Expanded sample inventory data with much more variety
const sampleGoods: GoodsItem[] = [
  // Electronics
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
    name: "iPhone 15 Pro",
    category: "Electronics",
    quantity: 500,
    dimensions: { length: 6, width: 3, height: 0.3 },
    weight: 0.5,
    priority: "high",
  },
  {
    id: "G003",
    name: "MacBook Pro 16-inch",
    category: "Electronics",
    quantity: 75,
    dimensions: { length: 14, width: 10, height: 1 },
    weight: 4.7,
    priority: "high",
  },
  {
    id: "G004",
    name: "Gaming Headsets",
    category: "Electronics",
    quantity: 200,
    dimensions: { length: 8, width: 7, height: 4 },
    weight: 1.2,
    priority: "medium",
  },
  {
    id: "G005",
    name: "Bluetooth Speakers",
    category: "Electronics",
    quantity: 150,
    dimensions: { length: 6, width: 4, height: 3 },
    weight: 2,
    priority: "medium",
  },
  {
    id: "G006",
    name: "Wireless Chargers",
    category: "Electronics",
    quantity: 300,
    dimensions: { length: 4, width: 4, height: 1 },
    weight: 0.8,
    priority: "low",
  },

  // Footwear
  {
    id: "G007",
    name: "Nike Air Max Shoes",
    category: "Footwear",
    quantity: 400,
    dimensions: { length: 12, width: 8, height: 5 },
    weight: 2,
    priority: "medium",
  },
  {
    id: "G008",
    name: "Adidas Running Shoes",
    category: "Footwear",
    quantity: 350,
    dimensions: { length: 12, width: 8, height: 5 },
    weight: 1.8,
    priority: "medium",
  },
  {
    id: "G009",
    name: "Formal Dress Shoes",
    category: "Footwear",
    quantity: 200,
    dimensions: { length: 13, width: 9, height: 4 },
    weight: 2.5,
    priority: "low",
  },
  {
    id: "G010",
    name: "Children's Sneakers",
    category: "Footwear",
    quantity: 500,
    dimensions: { length: 8, width: 6, height: 4 },
    weight: 1,
    priority: "medium",
  },
  {
    id: "G011",
    name: "Winter Boots",
    category: "Footwear",
    quantity: 180,
    dimensions: { length: 12, width: 9, height: 8 },
    weight: 3,
    priority: "high",
  },

  // Apparel
  {
    id: "G012",
    name: "Winter Jackets",
    category: "Apparel",
    quantity: 250,
    dimensions: { length: 24, width: 18, height: 2 },
    weight: 3,
    priority: "high",
  },
  {
    id: "G013",
    name: "Denim Jeans",
    category: "Apparel",
    quantity: 600,
    dimensions: { length: 16, width: 12, height: 1 },
    weight: 1.5,
    priority: "medium",
  },
  {
    id: "G014",
    name: "T-Shirts",
    category: "Apparel",
    quantity: 800,
    dimensions: { length: 12, width: 10, height: 0.5 },
    weight: 0.3,
    priority: "medium",
  },
  {
    id: "G015",
    name: "Business Suits",
    category: "Apparel",
    quantity: 120,
    dimensions: { length: 24, width: 18, height: 3 },
    weight: 2.5,
    priority: "low",
  },
  {
    id: "G016",
    name: "Summer Dresses",
    category: "Apparel",
    quantity: 300,
    dimensions: { length: 20, width: 14, height: 1 },
    weight: 0.8,
    priority: "medium",
  },

  // Furniture
  {
    id: "G017",
    name: "Office Chairs",
    category: "Furniture",
    quantity: 85,
    dimensions: { length: 26, width: 26, height: 40 },
    weight: 45,
    priority: "low",
  },
  {
    id: "G018",
    name: "Dining Tables",
    category: "Furniture",
    quantity: 40,
    dimensions: { length: 72, width: 36, height: 30 },
    weight: 80,
    priority: "low",
  },
  {
    id: "G019",
    name: "Bookshelf Units",
    category: "Furniture",
    quantity: 60,
    dimensions: { length: 36, width: 12, height: 72 },
    weight: 65,
    priority: "low",
  },
  {
    id: "G020",
    name: "Bed Frames",
    category: "Furniture",
    quantity: 30,
    dimensions: { length: 84, width: 60, height: 14 },
    weight: 120,
    priority: "medium",
  },
  {
    id: "G021",
    name: "Coffee Tables",
    category: "Furniture",
    quantity: 50,
    dimensions: { length: 48, width: 24, height: 18 },
    weight: 35,
    priority: "low",
  },

  // Grocery
  {
    id: "G022",
    name: "Canned Tomatoes",
    category: "Grocery",
    quantity: 1000,
    dimensions: { length: 4, width: 4, height: 5 },
    weight: 1.5,
    priority: "high",
  },
  {
    id: "G023",
    name: "Breakfast Cereals",
    category: "Grocery",
    quantity: 800,
    dimensions: { length: 8, width: 12, height: 10 },
    weight: 1.2,
    priority: "medium",
  },
  {
    id: "G024",
    name: "Pasta Boxes",
    category: "Grocery",
    quantity: 600,
    dimensions: { length: 10, width: 3, height: 8 },
    weight: 1,
    priority: "medium",
  },
  {
    id: "G025",
    name: "Cooking Oil Bottles",
    category: "Grocery",
    quantity: 400,
    dimensions: { length: 4, width: 4, height: 10 },
    weight: 2,
    priority: "high",
  },
  {
    id: "G026",
    name: "Frozen Pizza",
    category: "Grocery",
    quantity: 300,
    dimensions: { length: 12, width: 12, height: 2 },
    weight: 1.5,
    priority: "high",
  },

  // Home & Garden
  {
    id: "G027",
    name: "Garden Tools Set",
    category: "Home & Garden",
    quantity: 100,
    dimensions: { length: 24, width: 8, height: 4 },
    weight: 5,
    priority: "low",
  },
  {
    id: "G028",
    name: "Lawn Mowers",
    category: "Home & Garden",
    quantity: 25,
    dimensions: { length: 36, width: 22, height: 36 },
    weight: 85,
    priority: "medium",
  },
  {
    id: "G029",
    name: "Patio Furniture Sets",
    category: "Home & Garden",
    quantity: 20,
    dimensions: { length: 60, width: 40, height: 30 },
    weight: 150,
    priority: "low",
  },
  {
    id: "G030",
    name: "Plant Pots",
    category: "Home & Garden",
    quantity: 200,
    dimensions: { length: 12, width: 12, height: 10 },
    weight: 3,
    priority: "low",
  },

  // Sports & Outdoors
  {
    id: "G031",
    name: "Bicycles",
    category: "Sports & Outdoors",
    quantity: 50,
    dimensions: { length: 68, width: 24, height: 42 },
    weight: 30,
    priority: "medium",
  },
  {
    id: "G032",
    name: "Camping Tents",
    category: "Sports & Outdoors",
    quantity: 80,
    dimensions: { length: 24, width: 8, height: 8 },
    weight: 12,
    priority: "medium",
  },
  {
    id: "G033",
    name: "Fitness Equipment",
    category: "Sports & Outdoors",
    quantity: 40,
    dimensions: { length: 48, width: 24, height: 60 },
    weight: 200,
    priority: "low",
  },
]

// Generate sections with different sizes and organized goods
const generateSections = (goods: GoodsItem[]): Section[] => {
  return [
    {
      id: "SEC-A1",
      name: "Electronics Hub",
      dimensions: { length: 120, width: 80, height: 25 }, // Large section
      position: { x: 0, y: 0, z: 0 },
      capacity: 2000,
      currentLoad: 1345,
      items: goods.filter((g) => g.category === "Electronics"),
    },
    {
      id: "SEC-B1",
      name: "Fashion Central",
      dimensions: { length: 100, width: 60, height: 20 }, // Medium-large section
      position: { x: 130, y: 0, z: 0 },
      capacity: 2500,
      currentLoad: 2230,
      items: goods.filter((g) => g.category === "Footwear" || g.category === "Apparel"),
    },
    {
      id: "SEC-C1",
      name: "Furniture Warehouse",
      dimensions: { length: 150, width: 100, height: 30 }, // Largest section
      position: { x: 0, y: 90, z: 0 },
      capacity: 500,
      currentLoad: 285,
      items: goods.filter((g) => g.category === "Furniture"),
    },
    {
      id: "SEC-D1",
      name: "Grocery Storage",
      dimensions: { length: 80, width: 50, height: 18 }, // Medium section
      position: { x: 160, y: 90, z: 0 },
      capacity: 4000,
      currentLoad: 3100,
      items: goods.filter((g) => g.category === "Grocery"),
    },
    {
      id: "SEC-E1",
      name: "Home & Garden",
      dimensions: { length: 90, width: 70, height: 22 }, // Medium section
      position: { x: 250, y: 0, z: 0 },
      capacity: 800,
      currentLoad: 345,
      items: goods.filter((g) => g.category === "Home & Garden"),
    },
    {
      id: "SEC-F1",
      name: "Sports Zone",
      dimensions: { length: 70, width: 40, height: 35 }, // Tall section for bikes
      position: { x: 250, y: 80, z: 0 },
      capacity: 300,
      currentLoad: 170,
      items: goods.filter((g) => g.category === "Sports & Outdoors"),
    },
  ]
}
