import { useState, useEffect, useRef } from 'react'

export function TypeFilter({ allTypes, selectedTypes, onToggleType, onSelectAll, onClearAll }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const activeCount = selectedTypes.length
  const hasActiveFilter = activeCount > 0 && activeCount < allTypes.length

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-lg border transition-colors ${
          hasActiveFilter
            ? 'bg-gray-800 text-white border-gray-800'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        aria-label="Filtrar por tipo"
        title="Filtrar por tipo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {hasActiveFilter && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-96 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <span className="font-semibold text-gray-800">Filtrar por tipo</span>
            <div className="flex gap-2 text-xs">
              <button
                onClick={onSelectAll}
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Todos
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={onClearAll}
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Nenhum
              </button>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {allTypes.map(type => (
              <label
                key={type}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onToggleType(type)}
                  className="w-5 h-5 accent-gray-800"
                />
                <span className="text-gray-800 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
