import { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { CountPage } from './pages/CountPage'
import { ReportPage } from './pages/ReportPage'
import { ManagePage } from './pages/ManagePage'

export default function App() {
  const inventory = useInventory()
  const [currentPage, setCurrentPage] = useState('count')

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'count' && (
        <CountPage
          inventory={inventory}
          onShowReport={() => setCurrentPage('report')}
          onShowManage={() => setCurrentPage('manage')}
        />
      )}
      {currentPage === 'report' && (
        <ReportPage
          inventory={inventory}
          onBackToCount={() => setCurrentPage('count')}
        />
      )}
      {currentPage === 'manage' && (
        <ManagePage
          inventory={inventory}
          onBack={() => setCurrentPage('count')}
        />
      )}
    </div>
  )
}
