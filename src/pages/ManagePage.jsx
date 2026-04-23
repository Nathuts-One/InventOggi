import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, Eye, EyeOff } from 'lucide-react'
import { ConfirmModal } from '../components/ConfirmModal'

export function ManagePage({ inventory, onBack }) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleAdd() {
    const name = newName.trim()
    if (!name) return
    inventory.addCategory(name)
    setNewName('')
  }

  function startEdit(cat) {
    setEditingId(cat.id)
    setEditingName(cat.name)
  }

  function saveEdit() {
    const name = editingName.trim()
    if (name) {
      inventory.updateCategory(editingId, name)
    }
    setEditingId(null)
    setEditingName('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingName('')
  }

  function confirmDelete() {
    if (deleteTarget) {
      inventory.deleteCategory(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md flex items-center">
        <button
          onClick={onBack}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold"
        >
          Voltar
        </button>
        <h1 className="flex-1 text-center text-xl font-bold">Gerenciar Categorias</h1>
        <div className="w-16" />
      </header>

      {/* Add new */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Nova categoria..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors flex items-center gap-1"
          >
            <Plus size={18} />
            Adicionar
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {inventory.categories.map(cat => {
          const isActive = cat.active !== false
          const isEditing = editingId === cat.id
          const productCount = inventory.productCountByCategory(cat.id)

          return (
            <div
              key={cat.id}
              className={`flex items-center gap-2 p-3 bg-white rounded-lg border ${
                isActive ? 'border-gray-200' : 'border-gray-300 bg-gray-100 opacity-70'
              }`}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEdit()
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    autoFocus
                    className="flex-1 px-2 py-1 border border-gray-400 rounded focus:outline-none focus:border-gray-600"
                  />
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
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {productCount} produto{productCount !== 1 ? 's' : ''}
                      {!isActive && ' • inativa'}
                    </p>
                  </div>
                  <button
                    onClick={() => inventory.toggleCategoryActive(cat.id)}
                    className={`p-2 rounded-lg ${
                      isActive
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-gray-200'
                    }`}
                    aria-label={isActive ? 'Desativar' : 'Ativar'}
                    title={isActive ? 'Desativar' : 'Ativar'}
                  >
                    {isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    aria-label="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-2 text-red-700 hover:bg-red-50 rounded-lg"
                    aria-label="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Excluir categoria"
        message={
          deleteTarget
            ? `Tem certeza que deseja excluir "${deleteTarget.name}"?` +
              (inventory.productCountByCategory(deleteTarget.id) > 0
                ? ` Isso também removerá ${inventory.productCountByCategory(deleteTarget.id)} produto(s) dessa categoria.`
                : '')
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
