import { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2, Check, X, ArrowLeft } from 'lucide-react'
import { ConfirmModal } from '../components/ConfirmModal'
import { BottomSheet } from '../components/BottomSheet'

export function ManageProductsPage({ inventory, onBack }) {
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [editingType, setEditingType] = useState('')
  const [editingCategoryId, setEditingCategoryId] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [filterCategoryId, setFilterCategoryId] = useState('all')

  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')

  const typeSuggestions = inventory.allKnownTypes

  const categoryById = useMemo(() => {
    const map = new Map()
    inventory.categories.forEach(c => map.set(c.id, c))
    return map
  }, [inventory.categories])

  const filteredProducts =
    filterCategoryId === 'all'
      ? inventory.products
      : inventory.products.filter(p => p.categoryId === Number(filterCategoryId))

  function openAdd() {
    setNewName('')
    setNewType('')
    // Preselect the filter category if one is active
    setNewCategoryId(filterCategoryId === 'all' ? '' : filterCategoryId)
    setAddOpen(true)
  }

  function handleAdd() {
    const name = newName.trim()
    const categoryId = Number(newCategoryId)
    if (!name || !categoryId) return
    inventory.addProduct(name, categoryId, newType.trim())
    setAddOpen(false)
  }

  function startEdit(p) {
    setEditingId(p.id)
    setEditingName(p.name)
    setEditingType(p.type || '')
    setEditingCategoryId(String(p.categoryId))
  }

  function saveEdit() {
    const name = editingName.trim()
    const categoryId = Number(editingCategoryId)
    if (name && categoryId) {
      inventory.updateProduct(editingId, {
        name,
        type: editingType.trim(),
        categoryId,
      })
    }
    cancelEdit()
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingName('')
    setEditingType('')
    setEditingCategoryId('')
  }

  function confirmDelete() {
    if (deleteTarget) {
      inventory.deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md flex items-center">
        <button
          onClick={onBack}
          className="p-2 text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Voltar"
          title="Voltar"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold">Gerenciar Produtos</h1>
        <button
          onClick={openAdd}
          className="p-2 text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Adicionar"
          title="Adicionar"
        >
          <Plus size={22} strokeWidth={2} />
        </button>
      </header>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <select
          value={filterCategoryId}
          onChange={e => setFilterCategoryId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-sm bg-white"
        >
          <option value="all">Todas as categorias ({inventory.products.length})</option>
          {inventory.categories.map(c => {
            const count = inventory.productCountByCategory(c.id)
            return (
              <option key={c.id} value={c.id}>
                {c.name} ({count})
              </option>
            )
          })}
        </select>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Nenhum produto.</p>
          </div>
        ) : (
          filteredProducts.map(p => {
            const isActive = p.active !== false
            const isEditing = editingId === p.id
            const categoryName = categoryById.get(p.categoryId)?.name || '—'

            return (
              <div
                key={p.id}
                className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                  isActive ? 'border-gray-200' : 'border-gray-300 bg-gray-100 opacity-70'
                }`}
              >
                {isEditing ? (
                  <>
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        autoFocus
                        className="px-2 py-1 border border-gray-400 rounded focus:outline-none focus:border-gray-600"
                      />
                      <select
                        value={editingCategoryId}
                        onChange={e => setEditingCategoryId(e.target.value)}
                        className="px-2 py-1 border border-gray-400 rounded focus:outline-none focus:border-gray-600 text-sm bg-white"
                      >
                        {inventory.categories.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={editingType}
                        onChange={e => setEditingType(e.target.value)}
                        className="px-2 py-1 border border-gray-400 rounded focus:outline-none focus:border-gray-600 text-sm bg-white"
                      >
                        <option value="">(sem tipo)</option>
                        {typeSuggestions.map(t => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={saveEdit}
                      className="p-2 text-green-700 hover:bg-green-50 rounded-lg"
                      aria-label="Salvar"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      aria-label="Cancelar"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {categoryName}
                        {p.type && ` • ${p.type}`}
                        {!isActive && ' • inativo'}
                      </p>
                    </div>
                    <button
                      onClick={() => inventory.toggleProductActive(p.id)}
                      role="switch"
                      aria-checked={isActive}
                      aria-label={isActive ? 'Desativar' : 'Ativar'}
                      title={isActive ? 'Desativar' : 'Ativar'}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 ${
                        isActive ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          isActive ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      aria-label="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-2 text-red-700 hover:bg-red-50 rounded-lg"
                      aria-label="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Add form sheet */}
      <BottomSheet
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Novo produto"
      >
        <div className="p-4 space-y-3">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Nome do produto"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
          <select
            value={newCategoryId}
            onChange={e => setNewCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-sm bg-white"
          >
            <option value="">Selecione a categoria...</option>
            {inventory.categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={newType}
            onChange={e => setNewType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-sm bg-white"
          >
            <option value="">(sem tipo)</option>
            {typeSuggestions.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setAddOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              disabled={!newName.trim() || !newCategoryId}
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
      </BottomSheet>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Excluir produto"
        message={
          deleteTarget
            ? `Tem certeza que deseja excluir "${deleteTarget.name}"?`
            : ''
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Excluir"
        destructive
      />
    </div>
  )
}
