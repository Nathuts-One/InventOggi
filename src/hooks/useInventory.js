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
        // Migration: ensure every category and product has `active` (default true)
        const migratedCategories = data.categories.map(c => ({ active: true, ...c }))
        const migratedProducts = data.products.map(p => ({ active: true, ...p }))
        setCategories(migratedCategories)
        setProducts(migratedProducts)
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

  function addProduct(name, categoryId, type = '') {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    const product = { id: newId, name, categoryId, count: 0, active: true }
    if (type) product.type = type
    setProducts([...products, product])
  }

  function updateProduct(id, updates) {
    setProducts(
      products.map(p => {
        if (p.id !== id) return p
        const next = { ...p, ...updates }
        // Empty string type means "no type"
        if ('type' in updates && !updates.type) delete next.type
        return next
      })
    )
  }

  function toggleProductActive(id) {
    setProducts(
      products.map(p =>
        p.id === id ? { ...p, active: !(p.active ?? true) } : p
      )
    )
  }

  function deleteProduct(id) {
    setProducts(products.filter(p => p.id !== id))
  }

  // Active categories only — drive what's visible in Count/Report
  const activeCategories = categories.filter(c => c.active !== false)
  const activeCategoryIds = new Set(activeCategories.map(c => c.id))

  // Visible = in an active category AND product itself is active
  const visibleProducts = products.filter(
    p => activeCategoryIds.has(p.categoryId) && p.active !== false
  )

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

  // Categories to display in Count (active + has matching filtered products)
  const visibleCategories = activeCategories.filter(cat =>
    filteredProducts.some(p => p.categoryId === cat.id)
  )

  // Total only counts products in active categories + active products
  const totalCount = visibleProducts.reduce((sum, p) => sum + p.count, 0)

  // Helpers for Manage UI
  const productCountByCategory = (id) =>
    products.filter(p => p.categoryId === id).length

  const productsByCategory = (id) =>
    products.filter(p => p.categoryId === id)

  // All types defined across all products (for datalist suggestions in Manage)
  const allKnownTypes = [...new Set(products.map(p => p.type).filter(Boolean))].sort()

  return {
    categories,
    activeCategories,
    products,
    visibleProducts,
    filteredProducts,
    visibleCategories,
    searchTerm,
    setSearchTerm,
    allTypes,
    allKnownTypes,
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
    toggleProductActive,
    deleteProduct,
    loadDefault,
    productCountByCategory,
    productsByCategory,
  }
}
