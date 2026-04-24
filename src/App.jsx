import { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { CountPage } from './pages/CountPage'
import { ReportPage } from './pages/ReportPage'
import { ManagePage } from './pages/ManagePage'
import { ManageProductsPage } from './pages/ManageProductsPage'
import { ManageTypesPage } from './pages/ManageTypesPage'
import { MenuSheet } from './components/MenuSheet'
import { BottomSheet } from './components/BottomSheet'

export default function App() {
  const inventory = useInventory()
  const [currentPage, setCurrentPage] = useState('count')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSheet, setActiveSheet] = useState(null)

  function handleMenuSelect(option) {
    setMenuOpen(false)
    setActiveSheet(option) // 'categories' | 'products' | 'types'
  }

  function closeSheet() {
    setActiveSheet(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'count' && (
        <CountPage
          inventory={inventory}
          onShowReport={() => setCurrentPage('report')}
          onShowManage={() => setMenuOpen(true)}
        />
      )}
      {currentPage === 'report' && (
        <ReportPage
          inventory={inventory}
          onBackToCount={() => setCurrentPage('count')}
        />
      )}

      <MenuSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={handleMenuSelect}
      />

      <BottomSheet
        isOpen={activeSheet === 'categories'}
        onClose={closeSheet}
        title="Gerenciar Categorias"
      >
        <ManagePage inventory={inventory} />
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === 'products'}
        onClose={closeSheet}
        title="Gerenciar Produtos"
      >
        <ManageProductsPage inventory={inventory} />
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === 'types'}
        onClose={closeSheet}
        title="Gerenciar Tipos"
      >
        <ManageTypesPage inventory={inventory} />
      </BottomSheet>
    </div>
  )
}
