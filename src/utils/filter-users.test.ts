import { describe, expect, it } from 'vitest'
import {
  emptyFilters,
  filterUsers,
  getUniqueOrganizations,
  searchUsers,
} from './filter-users'
import { createFilters, createUser, sampleUsers } from '../test/fixtures'

describe('filterUsers', () => {
  it('returns all users when filters are empty', () => {
    expect(filterUsers(sampleUsers, emptyFilters)).toEqual(sampleUsers)
  })

  it('filters by exact organization', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ organization: 'Lendsqr' })
    )

    expect(result).toHaveLength(2)
    expect(result.every((user) => user.organization === 'Lendsqr')).toBe(true)
  })

  it('filters by partial username (case-insensitive)', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ username: 'debby' })
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Debby Ogana')
  })

  it('filters by partial email', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ email: 'lendstar' })
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.email).toBe('grace@lendstar.com')
  })

  it('filters by phone substring', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ phone: '0816' })
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.phone).toBe('08160780928')
  })

  it('filters by status', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ status: 'Pending' })
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.status).toBe('Pending')
  })

  it('filters by date joined', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ date: '2020-04-30' })
    )

    expect(result).toHaveLength(2)
    expect(result.map((user) => user.username)).toEqual([
      'Debby Ogana',
      'Grace Effiom',
    ])
  })

  it('applies multiple filters together', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({
        organization: 'Lendsqr',
        status: 'Active',
      })
    )

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Adedeji')
  })

  it('returns an empty list when organization does not match', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ organization: 'Unknown Org' })
    )

    expect(result).toEqual([])
  })

  it('returns an empty list when username does not match', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ username: 'zzzzz' })
    )

    expect(result).toEqual([])
  })

  it('returns an empty list when status does not match', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ status: 'Pending', organization: 'Lendsqr' })
    )

    expect(result).toEqual([])
  })

  it('returns an empty list for an unmatched phone', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ phone: '000000' })
    )

    expect(result).toEqual([])
  })

  it('returns an empty list for an unmatched date', () => {
    const result = filterUsers(
      sampleUsers,
      createFilters({ date: '1999-01-01' })
    )

    expect(result).toEqual([])
  })

  it('ignores invalid dateJoined values when filtering by date', () => {
    const users = [
      createUser({ id: 'bad', dateJoined: 'not-a-date', username: 'Broken' }),
      ...sampleUsers,
    ]

    const result = filterUsers(users, createFilters({ date: '2020-05-15' }))

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Adedeji')
  })
})

describe('searchUsers', () => {
  it('returns all users when the query is empty', () => {
    expect(searchUsers(sampleUsers, '')).toEqual(sampleUsers)
  })

  it('returns all users when the query is only whitespace', () => {
    expect(searchUsers(sampleUsers, '   ')).toEqual(sampleUsers)
  })

  it('matches username (case-insensitive)', () => {
    const result = searchUsers(sampleUsers, 'GRACE')

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Grace Effiom')
  })

  it('matches organization', () => {
    const result = searchUsers(sampleUsers, 'irorun')

    expect(result).toHaveLength(1)
    expect(result[0]?.organization).toBe('Irorun')
  })

  it('matches email', () => {
    const result = searchUsers(sampleUsers, 'tosin@lendsqr')

    expect(result).toHaveLength(1)
    expect(result[0]?.email).toBe('tosin@lendsqr.com')
  })

  it('matches phone', () => {
    const result = searchUsers(sampleUsers, '070033')

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Tosin Dokunmu')
  })

  it('matches status', () => {
    const result = searchUsers(sampleUsers, 'blacklisted')

    expect(result).toHaveLength(1)
    expect(result[0]?.status).toBe('Blacklisted')
  })

  it('matches date joined text', () => {
    const result = searchUsers(sampleUsers, 'may 15')

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Adedeji')
  })

  it('returns an empty list when nothing matches', () => {
    expect(searchUsers(sampleUsers, 'no-such-user')).toEqual([])
  })

  it('finds matching users from the full fetched set', () => {
    const result = searchUsers(sampleUsers, 'tosin')

    expect(result).toHaveLength(1)
    expect(result[0]?.username).toBe('Tosin Dokunmu')
  })
})

describe('getUniqueOrganizations', () => {
  it('returns sorted unique organization names', () => {
    expect(getUniqueOrganizations(sampleUsers)).toEqual([
      'Irorun',
      'Lendsqr',
      'Lendstar',
    ])
  })

  it('returns an empty list for an empty users array', () => {
    expect(getUniqueOrganizations([])).toEqual([])
  })

  it('deduplicates repeated organizations', () => {
    const users = [
      createUser({ organization: 'Lendsqr' }),
      createUser({ id: '2', organization: 'Lendsqr' }),
      createUser({ id: '3', organization: 'Irorun' }),
    ]

    expect(getUniqueOrganizations(users)).toEqual(['Irorun', 'Lendsqr'])
  })
})
