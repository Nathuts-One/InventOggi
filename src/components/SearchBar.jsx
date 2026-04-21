export function SearchBar({ searchTerm, onSearchChange, onReset, filterSlot }) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-base"
        />
        {searchTerm && (
          <button
            onClick={onReset}
            className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
        {filterSlot}
      </div>
    </div>
  )
}
