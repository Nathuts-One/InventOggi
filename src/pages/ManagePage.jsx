import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { ConfirmModal } from '../components/ConfirmModal'

export function ManagePage({ inventory }) {
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
    <div className="flex flex-col">
      {/* Add new */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
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
            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
            aria-label="Adicionar"
            title="Adicionar"
          >
            <Plus size={22} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-2">
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
