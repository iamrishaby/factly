"use client"

import { useEffect, useState } from "react"
import FactsList from "@/components/facts-list"
import AddFactForm from "@/components/add-fact-form"

interface Fact {
  id: string
  content: string
  category?: string
  source?: string
  created_at?: string
}

const CATEGORIES = ["ALL", "TECHNOLOGY", "SCIENCE", "FINANCE", "SOCIETY", "ENTERTAINMENT", "HEALTH", "HISTORY", "NEWS"]

export default function Home() {
  const [facts, setFacts] = useState<Fact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await fetch("/api/facts")
        if (!response.ok) throw new Error("Failed to fetch facts")
        const data = await response.json()
        setFacts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchFacts()
  }, [])

  const refreshFacts = async () => {
    try {
      const response = await fetch("/api/facts")
      if (!response.ok) throw new Error("Failed to fetch facts")
      const data = await response.json()
      setFacts(data)
    } catch (err) {
      console.error("Error refreshing facts:", err)
    }
  }

  const filteredFacts =
    selectedCategory === "ALL" ? facts : facts.filter((fact) => fact.category?.toUpperCase() === selectedCategory)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">💬</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FACTLY</h1>
          </div>
          <button
            type="button"
            onClick={() => setAddOpen((v) => !v)}
            aria-expanded={addOpen}
            aria-controls="add-fact-panel"
            className="px-6 py-2 rounded-full border-2 text-white font-bold hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-pink-500 to-green-500"
          >
            {addOpen ? "CLOSE" : "Share a fact"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Fact Form */}
        <div className="mb-8 animate-fade-in">
          <AddFactForm onFactAdded={refreshFacts} isOpen={addOpen} onToggle={() => setAddOpen((v) => !v)} />
        </div>

        <div className="flex gap-8">
          {/* Sidebar Categories */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-3 sticky top-24">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full py-3 px-4 rounded-full font-bold text-white transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? category === "ALL"
                        ? "bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 shadow-lg"
                        : getCategoryColor(category)
                      : "bg-slate-700/50 hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                  <p className="text-slate-400">Loading facts...</p>
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 font-medium">Error: {error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredFacts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-300 text-lg font-semibold">
                  NO FACTS UNDER THIS CATEGORY YET! CREATE THE FIRST ONE 🔥
                </p>
              </div>
            )}

            {/* Facts Display */}
            {!loading && !error && filteredFacts.length > 0 && <FactsList facts={filteredFacts} setFacts={setFacts} />}
          </div>
        </div>
      </div>
    </main>
  )
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    TECHNOLOGY: "bg-blue-600 hover:bg-blue-700",
    SCIENCE: "bg-green-600 hover:bg-green-700",
    FINANCE: "bg-red-600 hover:bg-red-700",
    SOCIETY: "bg-yellow-600 hover:bg-yellow-700",
    ENTERTAINMENT: "bg-pink-600 hover:bg-pink-700",
    HEALTH: "bg-cyan-600 hover:bg-cyan-700",
    HISTORY: "bg-amber-600 hover:bg-amber-700",
    NEWS: "bg-indigo-600 hover:bg-indigo-700",
  }
  return colors[category] || "bg-slate-700 hover:bg-slate-600"
}
