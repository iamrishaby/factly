"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, X, Check } from "lucide-react"

interface Fact {
  id: string
  content: string
  category?: string
  source?: string
  created_at?: string
}

interface FactsListProps {
  facts: Fact[]
  setFacts: (facts: Fact[]) => void
}

export default function FactsList({ facts, setFacts }: FactsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editSource, setEditSource] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEdit = (fact: Fact) => {
    setEditingId(fact.id)
    setEditContent(fact.content)
    setEditCategory(fact.category || "")
    setEditSource(fact.source || "")
    setError("")
  }

  const handleSave = async (id: string) => {
    if (!editContent.trim()) {
      setError("Content cannot be empty")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/facts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editContent.trim(),
          category: editCategory.trim() || null,
          source: editSource.trim() || null,
        }),
      })

      if (!response.ok) throw new Error("Failed to update fact")

      setFacts(
        facts.map((fact) =>
          fact.id === id ? { ...fact, content: editContent, category: editCategory, source: editSource } : fact,
        ),
      )

      setEditingId(null)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fact?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/facts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete fact")

      setFacts(facts.filter((fact) => fact.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium animate-shake">{error}</div>
      )}

      {facts.map((fact, index) => (
        <div
          key={fact.id}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {editingId === fact.id ? (
            <div className="space-y-4 animate-fade-in">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                rows={4}
                disabled={loading}
              />
              <input
                type="text"
                value={editSource}
                onChange={(e) => setEditSource(e.target.value)}
                placeholder="Source (optional)"
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                disabled={loading}
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                disabled={loading}
              >
                <option value="">Choose category</option>
                <option value="TECHNOLOGY">Technology</option>
                <option value="SCIENCE">Science</option>
                <option value="FINANCE">Finance</option>
                <option value="SOCIETY">Society</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="HEALTH">Health</option>
                <option value="HISTORY">History</option>
                <option value="NEWS">News</option>
              </select>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(null)}
                  disabled={loading}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSave(fact.id)}
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-500 to-green-500 text-white hover:shadow-lg transition-all"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-white text-lg leading-relaxed">{fact.content}</p>
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  {fact.category && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-green-500/20 text-pink-300 border border-pink-500/30">
                      {fact.category}
                    </span>
                  )}
                  {fact.source && <span className="text-xs text-slate-400">Source: {fact.source}</span>}
                </div>
                {fact.created_at && (
                  <p className="text-xs text-slate-500 mt-3">{new Date(fact.created_at).toLocaleDateString()}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(fact)}
                  disabled={loading}
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(fact.id)}
                  disabled={loading}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
