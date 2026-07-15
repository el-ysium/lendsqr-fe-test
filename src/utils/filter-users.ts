import type { User, UserStatus } from '../data/users'

export interface UserFilters {
  organization: string
  username: string
  email: string
  date: string
  phone: string
  status: string
}

export const emptyFilters: UserFilters = {
  organization: '',
  username: '',
  email: '',
  date: '',
  phone: '',
  status: '',
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function matchesPartial(value: string, query: string) {
  if (!query) return true
  return normalize(value).includes(normalize(query))
}

function toDateKey(dateJoined: string) {
  const parsed = new Date(dateJoined)
  if (Number.isNaN(parsed.getTime())) return ''

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function filterUsers(users: User[], filters: UserFilters) {
  return users.filter((user) => {
    if (filters.organization && user.organization !== filters.organization)
      return false
    if (!matchesPartial(user.username, filters.username)) return false
    if (!matchesPartial(user.email, filters.email)) return false
    if (filters.phone && !user.phone.includes(filters.phone.trim())) return false
    if (filters.status && user.status !== filters.status) return false
    if (filters.date && toDateKey(user.dateJoined) !== filters.date) return false
    return true
  })
}

export function searchUsers(users: User[], query: string) {
  const trimmed = normalize(query)
  if (!trimmed) return users

  return users.filter((user) => {
    const haystack = [
      user.organization,
      user.username,
      user.email,
      user.phone,
      user.dateJoined,
      user.status,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(trimmed)
  })
}

export function getUniqueOrganizations(users: User[]) {
  return [...new Set(users.map((user) => user.organization))].sort()
}

export const statusOptions: UserStatus[] = [
  'Active',
  'Inactive',
  'Pending',
  'Blacklisted',
]
