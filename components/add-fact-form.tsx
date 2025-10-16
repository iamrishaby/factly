"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface AddFactFormProps {
  onFactAdded: () => void
  // optional controlled props
  isOpen?: boolean
  onToggle?: () => void
}

export default function AddFactForm({ onFactAdded, isOpen, onToggle }: AddFactFormProps) {
  // support controlled (isOpen) or uncontrolled internal state
  const [internalOpen, setInternalOpen] = useState(false)
  const expanded = typeof isOpen === "boolean" ? isOpen : internalOpen
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (expanded) setTimeout(() => inputRef.current?.focus(), 60)
  }, [expanded])

  const toggle = () => {
    if (typeof onToggle === "function") return onToggle()
    setInternalOpen((v) => !v)
  }

  const [content, setContent] = useState("")
  const [source, setSource] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const maxChars = 200
  const charCount = content.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!content.trim()) {
      setError("Please enter a fact or quote")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          source: source.trim() || null,
          category: category.trim() || null,
        }),
      })

      if (!response.ok) throw new Error("Failed to add fact")

      setContent("")
      setSource("")
      setCategory("")
      setSuccess(true)
      onFactAdded()

      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // We'll always render a small wrapper so we can animate slide+fade smoothly.
  // When closed we shrink and fade it out; when open it slides down and becomes opaque.
  return (
    <div
      className={`relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl mb-8 transition-all duration-300 ease-out ${
        expanded ? "p-6 opacity-100 translate-y-0" : "p-0 opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >

      <div
        id="add-fact-panel"
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: expanded ? 800 : 0 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4 p-0">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <input
                type="text"
                ref={inputRef}
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
                placeholder="Share a fact with the world..."
                className="w-full px-4 py-3 rounded-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {/* Character counter */}
            <div className="text-white font-bold text-lg min-w-fit">{charCount}</div>

            {/* Source input */}
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Trustworthy source"
              className="px-4 py-3 rounded-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              disabled={loading}
            />

            {/* Category dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-full bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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

            {/* POST button with gradient */}
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-green-500 text-white font-bold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "POST"}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium animate-shake">{error}</div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400 text-sm font-medium animate-fade-in">
              Fact added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
