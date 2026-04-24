import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, ArrowLeft } from 'lucide-react'
import { ConfirmModal } from '../components/ConfirmModal'

export function ManageTypesPage({ inventory, onBack }) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleAdd() {
    const name = newName.trim()
    if (!name) return
    inventory.addType(name)
    setNewName('')
  }

  function startEdit(t) {
    setEditingId(t.id)
    setEditingName(t.name)
  }

  function saveEdit() {
    const name = editingName.trim()
    if (name) {
      inventory.updateType(editingId, name)
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
      inventory.deleteType(deleteTarget.id)
      setDeleteTarget(null)
    }
  }

  const sortedTypes = [...inventory.types].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

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
        <h1 className="flex-1 text-center text-xl font-bold">Gerenciar Tipos</h1>
        <div className="w-10" />
      </header>

      {/* Add new */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Novo tipo..."
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
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sortedTypes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Nenhum tipo cadastrado.</p>
          </div>
        ) : (
          sortedTypes.map(t => {
            const isEditing = editingId === t.id
            const productCount = inventory.productCountByType(t.name)

            return (
              <div
                key={t.id}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
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
                      <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                      <p className="text-xs text-gray-500">
                        {productCount} produto{productCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => startEdit(t)}
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                      aria-label="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(t)}
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
        title="Excluir tipo"
        message={
          deleteTarget
            ? `Tem certeza que deseja excluir "${deleteTarget.name}"?` +
              (inventory.productCountByType(deleteTarget.name) > 0
                ? ` ${inventory.productCountByType(deleteTarget.name)} produto(s) ficarão sem tipo.`
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
