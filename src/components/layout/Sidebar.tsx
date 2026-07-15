import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  IconAudit,
  IconBriefcase,
  IconChevronDown,
  IconClose,
  IconDecision,
  IconFees,
  IconGuarantors,
  IconHome,
  IconKarma,
  IconLoanRequest,
  IconLoans,
  IconLogout,
  IconFeesCharges,
  IconPreferences,
  IconReports,
  IconSavings,
  IconServices,
  IconSettlements,
  IconSystems,
  IconTransactions,
  IconUsers,
  IconWhitelist,
} from '../icons/Icons'
import './Sidebar.scss'

interface NavItem {
  label: string
  icon: ReactNode
  to?: string
}

interface NavSection {
  title?: string
  items: NavItem[]
}

const customers: NavItem[] = [
  { label: 'Users', icon: <IconUsers />, to: '/users' },
  { label: 'Guarantors', icon: <IconGuarantors /> },
  { label: 'Loans', icon: <IconLoans /> },
  { label: 'Decision Models', icon: <IconDecision /> },
  { label: 'Savings', icon: <IconSavings /> },
  { label: 'Loan Requests', icon: <IconLoanRequest /> },
  { label: 'Whitelist', icon: <IconWhitelist /> },
  { label: 'Karma', icon: <IconKarma /> },
]

const businesses: NavItem[] = [
  { label: 'Organization', icon: <IconBriefcase /> },
  { label: 'Loan Products', icon: <IconLoanRequest /> },
  { label: 'Savings Products', icon: <IconSavings /> },
  { label: 'Fees and Charges', icon: <IconFeesCharges /> },
  { label: 'Transactions', icon: <IconTransactions /> },
  { label: 'Services', icon: <IconServices /> },
  { label: 'Service Account', icon: <IconUsers /> },
  { label: 'Settlements', icon: <IconSettlements /> },
  { label: 'Reports', icon: <IconReports /> },
]

const settings: NavItem[] = [
  { label: 'Preferences', icon: <IconPreferences /> },
  { label: 'Fees and Pricing', icon: <IconFees /> },
  { label: 'Audit Logs', icon: <IconAudit /> },
  { label: 'Systems Messages', icon: <IconSystems /> },
]

const sections: NavSection[] = [
  { title: 'CUSTOMERS', items: customers },
  { title: 'BUSINESSES', items: businesses },
  { title: 'SETTINGS', items: settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'is-visible' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar__mobile-close">
          <button type="button" aria-label="Close menu" onClick={onClose}>
            <IconClose />
          </button>
        </div>

        <button type="button" className="sidebar__org">
          <IconBriefcase size={18} />
          <span>Switch Organization</span>
          <IconChevronDown />
        </button>

        <nav className="sidebar__nav">
          <a href="#dashboard" className="sidebar__link">
            <IconHome />
            <span>Dashboard</span>
          </a>

          {sections.map((section) => (
            <div key={section.title} className="sidebar__section">
              <p className="sidebar__section-title">{section.title}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `sidebar__link ${isActive ? 'is-active' : ''}`
                        }
                        onClick={onClose}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ) : (
                      <a href={`#${item.label}`} className="sidebar__link">
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <NavLink to="/login" className="sidebar__link" onClick={onClose}>
            <IconLogout />
            <span>Logout</span>
          </NavLink>
          <p className="sidebar__version">v1.2.0</p>
        </div>
      </aside>
    </>
  )
}
