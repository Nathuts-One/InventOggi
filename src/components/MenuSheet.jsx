import { FolderOpen, Package, Tag, X } from 'lucide-react'

export function MenuSheet({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  const options = [
    { id: 'categories', label: 'Categorias', icon: FolderOpen, enabled: true },
    { id: 'products', label: 'Produtos', icon: Package, enabled: true },
    { id: 'types', label: 'Tipos', icon: Tag, enabled: true },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Gerenciar</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-2">
          {options.map(opt => {
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                onClick={() => opt.enabled && onSelect(opt.id)}
                disabled={!opt.enabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  opt.enabled
                    ? 'text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Icon size={22} strokeWidth={2} />
                <span className="flex-1 font-semibold">{opt.label}</span>
                {opt.hint && (
                  <span className="text-xs text-gray-400 italic">{opt.hint}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
