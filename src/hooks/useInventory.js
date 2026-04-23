import { useState, useEffect } from 'react'
import { initialData } from '../data/seed'

const STORAGE_KEY = 'inventory-flow-data-v6'

export function useInventory() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTypes, setSelectedTypes] = useState(null) // null = all selected

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        // Migration: ensure every category has `active` (default true for older storage)
        const migratedCategories = data.categories.map(c => ({
          active: true,
          ...c,
        }))
        setCategories(migratedCategories)
        setProducts(data.products)
      } catch {
        loadDefault()
      }
    } else {
      loadDefault()
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (categories.length > 0 || products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ categories, products }))
    }
  }, [categories, products])

  function loadDefault() {
    setCategories([...initialData.categories])
    setProducts([...initialData.products])
  }

  function incrementProduct(productId) {
    setProducts(
      products.map(p =>
        p.id === productId ? { ...p, count: p.count + 1 } : p
      )
    )
  }

  function decrementProduct(productId) {
    setProducts(
      products.map(p =>
        p.id === productId ? { ...p, count: Math.max(0, p.count - 1) } : p
      )
    )
  }

  function resetCounts() {
    const resetProducts = products.map(p => ({ ...p, count: 0 }))
    setProducts(resetProducts)
  }

  function clearInventory() {
    const resetProducts = initialData.products.map(p => ({ ...p, count: 0 }))
    setProducts(resetProducts)
    setCategories([...initialData.categories])
  }

  function addCategory(name) {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1
    setCategories([...categories, { id: newId, name, active: true }])
  }

  function updateCategory(id, name) {
    setCategories(categories.map(c => (c.id === id ? { ...c, name } : c)))
  }

  function toggleCategoryActive(id) {
    setCategories(
      categories.map(c =>
        c.id === id ? { ...c, active: !(c.active ?? true) } : c
      )
    )
  }

  function deleteCategory(id) {
    setCategories(categories.filter(c => c.id !== id))
    setProducts(products.filter(p => p.categoryId !== id))
  }

  function addProduct(name, categoryId) {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    setProducts([
      ...products,
      { id: newId, name, categoryId, count: 0 },
    ])
  }

  function updateProduct(id, name) {
    setProducts(products.map(p => (p.id === id ? { ...p, name } : p)))
  }

  function deleteProduct(id) {
    setProducts(products.filter(p => p.id !== id))
  }

  // Active categories only — these drive what's visible in Count/Report
  const activeCategoryIds = new Set(
    categories.filter(c => c.active !== false).map(c => c.id)
  )
  const visibleProducts = products.filter(p => activeCategoryIds.has(p.categoryId))

  // Types are derived from visible products only
  const allTypes = [...new Set(visibleProducts.map(p => p.type).filter(Boolean))].sort()

  // Effective selected types: if null (default), all are selected
  const effectiveSelectedTypes = selectedTypes === null ? allTypes : selectedTypes

  function toggleType(type) {
    const current = selectedTypes === null ? allTypes : selectedTypes
    if (current.includes(type)) {
      setSelectedTypes(current.filter(t => t !== type))
    } else {
      setSelectedTypes([...current, type])
    }
  }

  function selectAllTypes() {
    setSelectedTypes(null)
  }

  function clearAllTypes() {
    setSelectedTypes([])
  }

  // Filter visible products by search term and type
  const filteredProducts = visibleProducts.filter(p => {
    const matchesSearch = !searchTerm.trim() || p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !p.type || effectiveSelectedTypes.includes(p.type)
    return matchesSearch && matchesType
  })

  // Active categories (for Count/Report), in the original order
  const activeCategories = categories.filter(c => c.active !== false)

  // Get categories to display in Count (active + has matching filtered products)
  const visibleCategories = activeCategories.filter(cat =>
    filteredProducts.some(p => p.categoryId === cat.id)
  )

  // Total only counts products in active categories
  const totalCount = visibleProducts.reduce((sum, p) => sum + p.count, 0)

  // Helper: count products per category (any, including inactive) — used by Manage UI
  const productCountByCategory = (id) =>
    products.filter(p => p.categoryId === id).length

  return {
    categories,
    activeCategories,
    products,
    filteredProducts,
    visibleCategories,
    searchTerm,
    setSearchTerm,
    allTypes,
    selectedTypes: effectiveSelectedTypes,
    toggleType,
    selectAllTypes,
    clearAllTypes,
    totalCount,
    incrementProduct,
    decrementProduct,
    resetCounts,
    clearInventory,
    addCategory,
    updateCategory,
    toggleCategoryActive,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    loadDefault,
    productCountByCategory,
  }
}
