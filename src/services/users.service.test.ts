import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchUserById, fetchUsers } from './users.service'
import { createApiUser } from '../test/fixtures'

const fetchMock = vi.fn()

vi.stubGlobal('fetch', fetchMock)

afterEach(() => {
  fetchMock.mockReset()
})

describe('fetchUsers', () => {
  it('fetches and maps users from the API', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        createApiUser({ id: '1', status: 'active' }),
        createApiUser({
          id: '2',
          username: 'Grace Effiom',
          status: 'pending',
          Organization: 'Lendstar',
        }),
      ],
    })

    const users = await fetchUsers()

    expect(fetchMock).toHaveBeenCalledWith(
      'https://lendsqr-mock-data.onrender.com/users'
    )
    expect(users).toHaveLength(2)
    expect(users[0]?.status).toBe('Active')
    expect(users[1]?.status).toBe('Pending')
    expect(users[1]?.organization).toBe('Lendstar')
  })

  it('returns an empty array when the API returns no users', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [],
    })

    await expect(fetchUsers()).resolves.toEqual([])
  })

  it('throws a user-friendly error when the response is not ok', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    })

    await expect(fetchUsers()).rejects.toThrow(
      'Unable to load users. Please try again.'
    )
  })

  it('propagates network failures', async () => {
    fetchMock.mockRejectedValue(new Error('Network down'))

    await expect(fetchUsers()).rejects.toThrow('Network down')
  })
})

describe('fetchUserById', () => {
  it('fetches and maps a single user by id', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () =>
        createApiUser({
          id: '42',
          username: 'Grace Effiom',
          status: 'blacklisted',
        }),
    })

    const user = await fetchUserById('42')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://lendsqr-mock-data.onrender.com/users/42'
    )
    expect(user.id).toBe('42')
    expect(user.username).toBe('Grace Effiom')
    expect(user.status).toBe('Blacklisted')
  })

  it('throws a user-friendly error when the user is not found', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
    })

    await expect(fetchUserById('missing')).rejects.toThrow(
      'Unable to load user details. Please try again.'
    )
  })

  it('propagates network failures for a single user request', async () => {
    fetchMock.mockRejectedValue(new Error('Request timeout'))

    await expect(fetchUserById('1')).rejects.toThrow('Request timeout')
  })
})
