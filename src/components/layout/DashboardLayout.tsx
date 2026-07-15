import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SearchProvider } from '../../context/search-context'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import './DashboardLayout.scss'

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <SearchProvider>
      <div className="dashboard-layout">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="dashboard-layout__body">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="dashboard-layout__main">
            <Outlet />
          </main>
        </div>
      </div>
    </SearchProvider>
  )
}
