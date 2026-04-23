import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, ArrowLeft } from 'lucide-react'
import { ConfirmModal } from '../components/ConfirmModal'

export function ManageProductsPage({ inventory, category, onBack }) {
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [editingType, setEditingType] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const products = inventory.productsByCategory(category.id)
  const typeSuggestions = inventory.allKnownTypes
  const datalistId = `types-${category.id}`

  function handleAdd() {
    const name = newName.trim()
    if (!name) return
    inventory.addProduct(name, category.id, newType.trim())
    setNewName('')
    setNewType('')
  }

  function startEdit(p) {
    setEditingId(p.id)
    setEditingName(p.name)
    setEditingType(p.type || '')
  }

  function saveEdit() {
    const name = editingName.trim()
    if (name) {
      inventory.updateProduct(editingId, {
        name,
        type: editingType.trim(),
      })
    }
    setEditingId(null)
    setEditingName('')
    setEditingType('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingName('')
    setEditingType('')
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
        <div className="flex-1 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Produtos</p>
          <h1 className="text-xl font-bold truncate px-2">{category.name}</h1>
        </div>
        <div className="w-10" />
      </header>

      {/* Add new */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Nome do produto"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
            aria-label="Adicionar"
            title="Adicionar"
          >
            <Plus size={22} strokeWidth={2} />
          </button>
        </div>
        <input
          type="text"
          value={newType}
          onChange={e => setNewType(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          list={datalistId}
          placeholder="Tipo (opcional) — ex: Picolé, Pote 2L"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-sm"
        />
        <datalist id={datalistId}>
          {typeSuggestions.map(t => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {products.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Nenhum produto nesta categoria.<br/>Adicione o primeiro acima.</p>
          </div>
        ) : (
          products.map(p => {
            const isActive = p.active !== false
            const isEditing = editingId === p.id

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
                      <input
                        type="text"
                        value={editingType}
                        onChange={e => setEditingType(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        list={datalistId}
                        placeholder="Tipo (opcional)"
                        className="px-2 py-1 border border-gray-400 rounded focus:outline-none focus:border-gray-600 text-sm"
                      />
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
                      <p className="text-xs text-gray-500">
                        {p.type || 'sem tipo'}
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

      {/* Delete confirmation */}
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
