import { useState } from 'react'
import { ChevronsDown, ChevronsUp, Trash2 } from 'lucide-react'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { CategoryGroup } from '../components/CategoryGroup'
import { ConfirmModal } from '../components/ConfirmModal'
import { TypeFilter } from '../components/TypeFilter'

export function CountPage({ inventory, onShowReport, onShowManage }) {
  const [showClearModal, setShowClearModal] = useState(false)
  const [openCategories, setOpenCategories] = useState({})

  const getCategoryProducts = (categoryId) =>
    inventory.filteredProducts.filter(p => p.categoryId === categoryId)

  function toggleCategory(categoryId) {
    setOpenCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }))
  }

  function expandAll() {
    const allOpen = {}
    inventory.categories.forEach(c => { allOpen[c.id] = true })
    setOpenCategories(allOpen)
  }

  function collapseAll() {
    setOpenCategories({})
  }

  function handleClear() {
    setShowClearModal(true)
  }

  function confirmClear() {
    localStorage.clear()
    localStorage.removeItem('inventory-flow-data')
    setShowClearModal(false)
    window.location.reload()
  }

  function cancelClear() {
    setShowClearModal(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header
        totalCount={inventory.totalCount}
        onManage={onShowManage}
        isLoading={inventory.isLoading}
      />

      <SearchBar
        searchTerm={inventory.searchTerm}
        onSearchChange={inventory.setSearchTerm}
        onReset={() => inventory.setSearchTerm('')}
        filterSlot={
          <TypeFilter
            allTypes={inventory.allTypes}
            selectedTypes={inventory.selectedTypes}
            onToggleType={inventory.toggleType}
            onSelectAll={inventory.selectAllTypes}
            onClearAll={inventory.clearAllTypes}
          />
        }
      />

      {/* Expand/Collapse controls */}
      <div className="flex items-center justify-end gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
        <button
          onClick={expandAll}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
          aria-label="Abrir todas"
          title="Abrir todas"
        >
          <ChevronsDown size={20} strokeWidth={2} />
        </button>
        <button
          onClick={collapseAll}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
          aria-label="Fechar todas"
          title="Fechar todas"
        >
          <ChevronsUp size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Products list */}
      <div className="flex-1 overflow-y-auto pb-20">
        {inventory.isLoading ? (
          <CategorySkeletonList />
        ) : inventory.visibleCategories.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          inventory.visibleCategories.map(category => (
            <CategoryGroup
              key={category.id}
              category={category}
              products={getCategoryProducts(category.id)}
              onIncrement={inventory.incrementProduct}
              onDecrement={inventory.decrementProduct}
              searchTerm={inventory.searchTerm}
              isOpen={openCategories[category.id] || false}
              onToggle={() => toggleCategory(category.id)}
            />
          ))
        )}
      </div>

      {/* Fixed footer - Report + Clear */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg">
        <div className="flex gap-2">
          <button
            onClick={onShowReport}
            className="flex-1 px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Gerar Relatório
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-red-800 hover:bg-red-700 text-red-100 rounded-lg transition-colors"
            aria-label="Limpar inventário"
            title="Limpar inventário"
          >
            <Trash2 size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showClearModal}
        title="Limpar Inventário"
        message="Tem certeza que deseja limpar todo o inventário e começar um novo? Esta ação não pode ser desfeita."
        onConfirm={confirmClear}
        onCancel={cancelClear}
      />
    </div>
  )
}

function CategorySkeletonList() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-b border-gray-300 bg-white p-4 flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  )
}
