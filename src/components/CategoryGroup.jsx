import { useRef } from 'react'
import { ProductItem } from './ProductItem'

export function CategoryGroup({
  category,
  products,
  onIncrement,
  onDecrement,
  searchTerm,
  isOpen,
  onToggle,
}) {
  const wrapperRef = useRef(null)

  // Auto-expand when search is active
  const shouldBeOpen = searchTerm ? true : isOpen
  const categoryTotal = products.reduce((sum, p) => sum + p.count, 0)

  const headerBg = shouldBeOpen
    ? 'bg-gray-200 hover:bg-gray-300'
    : 'bg-white hover:bg-gray-100'
  const badgeBg = shouldBeOpen
    ? 'bg-white text-gray-700'
    : 'bg-gray-200 text-gray-700'

  function handleToggle() {
    const wasOpen = isOpen
    onToggle()
    if (!wasOpen) {
      // Abrindo: scrollar para topo da categoria
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  return (
    <div ref={wrapperRef} className="border-b border-gray-300">
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between p-4 text-gray-800 transition-colors ${headerBg}`}
        aria-expanded={shouldBeOpen}
      >
        <div className="flex items-center justify-between flex-1">
          <span className="text-lg font-bold">{category.name}</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${badgeBg}`}>
            {categoryTotal}
          </span>
        </div>
        <span className="text-xl ml-4 text-gray-600">
          {shouldBeOpen ? '▼' : '▶'}
        </span>
      </button>

      {shouldBeOpen && (
        <div className="bg-gray-50">
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      )}
    </div>
  )
}
