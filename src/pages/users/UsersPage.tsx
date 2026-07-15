import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconActiveUsersCard,
  IconChevronDown,
  IconEye,
  IconFilter,
  IconLoansCard,
  IconMore,
  IconSavingsCard,
  IconUserCheck,
  IconUsersCard,
  IconUserX,
} from '../../components/icons/Icons'
import { useSearch } from '../../context/search-context'
import { useUsers } from '../../hooks/use-users'
import {
  emptyFilters,
  filterUsers,
  getUniqueOrganizations,
  searchUsers,
  statusOptions,
  type UserFilters,
} from '../../utils/filter-users'
import './UsersPage.scss'

const PAGE_SIZE = 10

const columns = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
] as const

export function UsersPage() {
  const navigate = useNavigate()
  const { searchQuery } = useSearch()
  const { users, isLoading, hasError, errorMessage, refetch } = useUsers()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [draftFilters, setDraftFilters] = useState<UserFilters>(emptyFilters)
  const [appliedFilters, setAppliedFilters] = useState<UserFilters>(emptyFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const filterRef = useRef<HTMLFormElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const organizations = useMemo(() => getUniqueOrganizations(users), [users])

  const matchedUsers = useMemo(() => {
    const filtered = filterUsers(users, appliedFilters)
    return searchUsers(filtered, searchQuery)
  }, [users, appliedFilters, searchQuery])

  const totalPages = Math.max(1, Math.ceil(matchedUsers.length / PAGE_SIZE))

  const visibleUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return matchedUsers.slice(start, start + PAGE_SIZE)
  }, [matchedUsers, currentPage])

  const stats = useMemo(() => {
    const activeCount = users.filter((user) => user.status === 'Active').length

    return [
      {
        label: 'USERS',
        value: users.length.toLocaleString(),
        icon: <IconUsersCard />,
        tone: 'pink',
      },
      {
        label: 'ACTIVE USERS',
        value: activeCount.toLocaleString(),
        icon: <IconActiveUsersCard />,
        tone: 'purple',
      },
      {
        label: 'USERS WITH LOANS',
        value: '12,453',
        icon: <IconLoansCard />,
        tone: 'orange',
      },
      {
        label: 'USERS WITH SAVINGS',
        value: '102,453',
        icon: <IconSavingsCard />,
        tone: 'red',
      },
    ]
  }, [users])

  useEffect(() => {
    setCurrentPage(1)
  }, [appliedFilters, searchQuery, users])

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (filterRef.current && !filterRef.current.contains(target))
        setIsFilterOpen(false)
      if (menuRef.current && !menuRef.current.contains(target))
        setOpenMenuId(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function updateDraftField(field: keyof UserFilters) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDraftFilters((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }
  }

  function handleApplyFilters(event: FormEvent) {
    event.preventDefault()
    setAppliedFilters(draftFilters)
    setIsFilterOpen(false)
    setOpenMenuId(null)
  }

  function handleResetFilters() {
    setDraftFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setIsFilterOpen(false)
    setOpenMenuId(null)
  }

  function openFilterPanel() {
    setDraftFilters(appliedFilters)
    setIsFilterOpen((isOpen) => !isOpen)
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    setOpenMenuId(null)
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className="users">
      <h1 className="users__title">Users</h1>

      <div className="users__stats">
        {stats.map((stat) => (
          <article key={stat.label} className="users__stat-card">
            <div className={`users__stat-icon users__stat-icon--${stat.tone}`}>
              {stat.icon}
            </div>
            <p className="users__stat-label">{stat.label}</p>
            <p className="users__stat-value">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="users__table-wrap">
        <div className="users__table-scroll">
          <table className="users__table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>
                    <button
                      type="button"
                      className="users__th-btn"
                      onClick={openFilterPanel}
                    >
                      <span>{column}</span>
                      <IconFilter />
                    </button>
                  </th>
                ))}
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="users__empty">
                    Loading users…
                  </td>
                </tr>
              ) : hasError ? (
                <tr>
                  <td colSpan={7} className="users__empty">
                    <p>{errorMessage}</p>
                    <button
                      type="button"
                      className="users__btn-filter"
                      onClick={refetch}
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : visibleUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="users__empty">
                    No users match your search or filters.
                  </td>
                </tr>
              ) : (
                visibleUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dateJoined}</td>
                    <td>
                      <StatusPill status={user.status} />
                    </td>
                    <td className="users__actions-cell">
                      <button
                        type="button"
                        className="users__more"
                        aria-label={`Actions for ${user.username}`}
                        onClick={() =>
                          setOpenMenuId((id) => (id === user.id ? null : user.id))
                        }
                      >
                        <IconMore />
                      </button>
                      {openMenuId === user.id && (
                        <div className="users__row-menu" ref={menuRef}>
                          <button
                            type="button"
                            onClick={() => navigate(`/users/${user.id}`)}
                          >
                            <IconEye />
                            <span>View Details</span>
                          </button>
                          <button type="button">
                            <IconUserX />
                            <span>Blacklist User</span>
                          </button>
                          <button type="button">
                            <IconUserCheck />
                            <span>Activate User</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isFilterOpen && (
          <form className="users__filter" ref={filterRef} onSubmit={handleApplyFilters}>
            <label>
              <span>Organization</span>
              <div className="users__select">
                <select
                  value={draftFilters.organization}
                  onChange={updateDraftField('organization')}
                >
                  <option value="">Select</option>
                  {organizations.map((organization) => (
                    <option key={organization} value={organization}>
                      {organization}
                    </option>
                  ))}
                </select>
                <IconChevronDown />
              </div>
            </label>
            <label>
              <span>Username</span>
              <input
                type="text"
                placeholder="User"
                value={draftFilters.username}
                onChange={updateDraftField('username')}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                value={draftFilters.email}
                onChange={updateDraftField('email')}
              />
            </label>
            <label>
              <span>Date</span>
              <input
                type="date"
                value={draftFilters.date}
                onChange={updateDraftField('date')}
              />
            </label>
            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder="Phone Number"
                value={draftFilters.phone}
                onChange={updateDraftField('phone')}
              />
            </label>
            <label>
              <span>Status</span>
              <div className="users__select">
                <select
                  value={draftFilters.status}
                  onChange={updateDraftField('status')}
                >
                  <option value="">Select</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <IconChevronDown />
              </div>
            </label>
            <div className="users__filter-actions">
              <button
                type="button"
                className="users__btn-reset"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button type="submit" className="users__btn-filter">
                Filter
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="users__pagination">
        <div className="users__page-size">
          <span>Showing</span>
          <button type="button" className="users__page-select">
            {PAGE_SIZE}
            <IconChevronDown />
          </button>

          <span>out of {matchedUsers.length}</span>
        </div>
    
        <div className="users__pages">
          <button
            type="button"
            className="btn-arrow"
            aria-label="Previous page"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map((page, index) =>
            page === '…' ? (
              <span key={`ellipsis-${index}`}>…</span>
            ) : (
              <button
                key={page}
                type="button"
                className={page === currentPage ? 'is-active' : undefined}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            )
          )}
          <button
            className="btn-arrow"
            type="button"
            aria-label="Next page"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const normalized = status.trim().toLowerCase()
  const className = `status-pill status-pill--${normalized}`
  const label =
    normalized.charAt(0).toUpperCase() + normalized.slice(1)

  return <span className={className}>{label}</span>
}

function getPageNumbers(currentPage: number, totalPages: number): Array<number | '…'> {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, index) => index + 1)

  if (currentPage <= 3)
    return [1, 2, 3, '…', totalPages - 1, totalPages]

  if (currentPage >= totalPages - 2)
    return [1, 2, '…', totalPages - 2, totalPages - 1, totalPages]

  return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages]
}
