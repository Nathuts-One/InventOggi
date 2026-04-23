export function ReportPage({ inventory, onBackToCount }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('pt-BR')
  const timeStr = now.toLocaleTimeString('pt-BR')

  // Group products by category for report (active categories + active products)
  const reportData = inventory.activeCategories.map(cat => ({
    category: cat,
    products: inventory.visibleProducts.filter(p => p.categoryId === cat.id),
  }))

  // Generate WhatsApp text
  function generateWhatsAppText() {
    let text = `*Relatório de Inventário*\n\n`
    text += `${dateStr}\n${timeStr}\n\n`
    text += `*Detalhamento:*\n\n`

    reportData.forEach(({ category, products }) => {
      const totalCat = products.reduce((sum, p) => sum + p.count, 0)
      if (totalCat > 0) {
        text += `*${category.name}*\n`
        products.forEach(p => {
          if (p.count > 0) {
            const typeStr = p.type ? ` (${p.type})` : ''
            text += `  ${p.name}${typeStr}: ${p.count}\n`
          }
        })
        text += `\n`
      }
    })

    text += `*Total Geral: ${inventory.totalCount} itens*`
    return text
  }

  function openWhatsApp() {
    const text = encodeURIComponent(generateWhatsAppText())
    const url = `https://wa.me/?text=${text}`
    window.open(url, '_blank')
  }

  function printPDF() {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatório de Inventário</h1>
        <p className="text-gray-600">{dateStr} às {timeStr}</p>
      </div>

      {/* Report Content */}
      <div className="space-y-6 print:space-y-4">
        {reportData.map(({ category, products }) => {
          const totalCat = products.reduce((sum, p) => sum + p.count, 0)
          return (
            <div key={category.id} className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{category.name}</h2>
              {products.length === 0 ? (
                <p className="text-gray-500 italic">Sem produtos</p>
              ) : (
                <div className="space-y-2">
                  {products.map(p => (
                    <div key={p.id} className="flex justify-between items-start text-gray-700 gap-4">
                      <div className="flex flex-col">
                        <span>{p.name}</span>
                        {p.type && <span className="text-xs text-gray-500">{p.type}</span>}
                      </div>
                      <span className="font-semibold">{p.count}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                    <span>Subtotal {category.name}</span>
                    <span className="text-gray-800">{totalCat}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Total */}
        <div className="bg-gray-100 border-2 border-gray-800 rounded-lg p-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">Total Geral</span>
            <span className="text-4xl font-bold text-gray-900">{inventory.totalCount}</span>
          </div>
        </div>
      </div>

      {/* Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 shadow-lg print:hidden">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <button
            onClick={onBackToCount}
            className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={printPDF}
            className="flex-1 px-4 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Imprimir PDF
          </button>
          <button
            onClick={openWhatsApp}
            className="flex-1 px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
          >
            WhatsApp
          </button>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 10mm; }
          .print\\:hidden { display: none !important; }
          .print\\:space-y-4 > * + * { margin-top: 1rem; }
        }
      `}</style>
    </div>
  )
}
