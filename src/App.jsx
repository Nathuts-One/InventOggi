import { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { CountPage } from './pages/CountPage'
import { ReportPage } from './pages/ReportPage'
import { ManagePage } from './pages/ManagePage'
import { ManageProductsPage } from './pages/ManageProductsPage'
import { MenuSheet } from './components/MenuSheet'

export default function App() {
  const inventory = useInventory()
  const [currentPage, setCurrentPage] = useState('count')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleMenuSelect(option) {
    setMenuOpen(false)
    if (option === 'categories') setCurrentPage('manage-categories')
    if (option === 'products') setCurrentPage('manage-products')
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
      {currentPage === 'manage-categories' && (
        <ManagePage
          inventory={inventory}
          onBack={() => setCurrentPage('count')}
        />
      )}
      {currentPage === 'manage-products' && (
        <ManageProductsPage
          inventory={inventory}
          onBack={() => setCurrentPage('count')}
        />
      )}

      <MenuSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={handleMenuSelect}
      />
    </div>
  )
}
