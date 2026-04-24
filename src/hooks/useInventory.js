import { useState, useEffect } from 'react'
import { initialData } from '../data/seed'

const STORAGE_KEY = 'inventory-flow-data-v6'

export function useInventory() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [types, setTypes] = useState([])
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
        // Migration: if no types array, derive from product types
        let migratedTypes = data.types
        if (!migratedTypes) {
          const unique = [...new Set(migratedProducts.map(p => p.type).filter(Boolean))]
          migratedTypes = unique.map((name, i) => ({ id: i + 1, name }))
        }
        setCategories(migratedCategories)
        setProducts(migratedProducts)
        setTypes(migratedTypes)
      } catch {
        loadDefault()
      }
    } else {
      loadDefault()
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (categories.length > 0 || products.length > 0 || types.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ categories, products, types })
      )
    }
  }, [categories, products, types])

  function loadDefault() {
    setCategories([...initialData.categories])
    setProducts([...initialData.products])
    setTypes([...initialData.types])
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
    setTypes([...initialData.types])
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

  // Ensure a type with the given name exists; returns the name (trimmed).
  // Auto-creates the type entry if it's new. Returns '' for empty input.
  function ensureType(name, currentTypes = types) {
    const trimmed = (name || '').trim()
    if (!trimmed) return { name: '', nextTypes: currentTypes }
    const exists = currentTypes.some(
      t => t.name.toLowerCase() === trimmed.toLowerCase()
    )
    if (exists) return { name: trimmed, nextTypes: currentTypes }
    const newId = Math.max(...currentTypes.map(t => t.id), 0) + 1
    return {
      name: trimmed,
      nextTypes: [...currentTypes, { id: newId, name: trimmed }],
    }
  }

  function addProduct(name, categoryId, type = '') {
    const { name: typeName, nextTypes } = ensureType(type)
    if (nextTypes !== types) setTypes(nextTypes)
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    const product = { id: newId, name, categoryId, count: 0, active: true }
    if (typeName) product.type = typeName
    setProducts([...products, product])
  }

  function updateProduct(id, updates) {
    let nextTypes = types
    const applied = { ...updates }
    if ('type' in updates) {
      const result = ensureType(updates.type, types)
      nextTypes = result.nextTypes
      applied.type = result.name
    }
    if (nextTypes !== types) setTypes(nextTypes)
    setProducts(
      products.map(p => {
        if (p.id !== id) return p
        const next = { ...p, ...applied }
        if ('type' in applied && !applied.type) delete next.type
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

  function addType(name) {
    const trimmed = (name || '').trim()
    if (!trimmed) return
    if (types.some(t => t.name.toLowerCase() === trimmed.toLowerCase())) return
    const newId = Math.max(...types.map(t => t.id), 0) + 1
    setTypes([...types, { id: newId, name: trimmed }])
  }

  function updateType(id, name) {
    const trimmed = (name || '').trim()
    if (!trimmed) return
    const current = types.find(t => t.id === id)
    if (!current) return
    const oldName = current.name
    setTypes(types.map(t => (t.id === id ? { ...t, name: trimmed } : t)))
    // Cascade rename on products
    setProducts(
      products.map(p => (p.type === oldName ? { ...p, type: trimmed } : p))
    )
  }

  function deleteType(id) {
    const target = types.find(t => t.id === id)
    if (!target) return
    setTypes(types.filter(t => t.id !== id))
    // Cascade: clear `type` on products that used this type
    setProducts(
      products.map(p => {
        if (p.type !== target.name) return p
        const { type, ...rest } = p
        return rest
      })
    )
  }

  // Active categories only — drive what's visible in Count/Report
  const activeCategories = categories.filter(c => c.active !== false)
  const activeCategoryIds = new Set(activeCategories.map(c => c.id))

  // Visible = in an active category AND product itself is active
  const visibleProducts = products.filter(
    p => activeCategoryIds.has(p.categoryId) && p.active !== false
  )

  // Types visible in the CountPage filter — derived from visible products
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

  const productCountByType = (typeName) =>
    products.filter(p => p.type === typeName).length

  // All known type names — sourced from the types entity now
  const allKnownTypes = types.map(t => t.name).sort()

  return {
    categories,
    activeCategories,
    products,
    visibleProducts,
    filteredProducts,
    visibleCategories,
    types,
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
    addType,
    updateType,
    deleteType,
    loadDefault,
    productCountByCategory,
    productsByCategory,
    productCountByType,
  }
}
