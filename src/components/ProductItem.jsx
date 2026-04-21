export function ProductItem({ product, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white border-b border-gray-200">
      <div className="flex-1 flex flex-col">
        <span className="text-base font-medium text-gray-800">{product.name}</span>
        {product.type && (
          <span className="text-xs text-gray-500 mt-0.5">{product.type}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrement(product.id)}
          className="h-12 w-12 rounded-lg bg-red-500 text-white font-bold text-xl hover:bg-red-600 active:bg-red-700 transition-colors"
          aria-label={`Decrementar ${product.name}`}
        >
          -
        </button>

        <span className="text-2xl font-bold text-gray-900 w-12 text-center">
          {product.count}
        </span>

        <button
          onClick={() => onIncrement(product.id)}
          className="h-12 w-12 rounded-lg bg-green-500 text-white font-bold text-xl hover:bg-green-600 active:bg-green-700 transition-colors"
          aria-label={`Incrementar ${product.name}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
