import { mapApiUser, type ApiUser, type User } from '../data/users'

const BASE_API_URL = 'https://lendsqr-mock-data.onrender.com/users'

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(BASE_API_URL)

  if (!response.ok)
    throw new Error('Unable to load users. Please try again.')

  const data = (await response.json()) as ApiUser[]
  return data.map(mapApiUser)
}

export async function fetchUserById(id: string): Promise<User> {
  const response = await fetch(`${BASE_API_URL}/${id}`)

  if (!response.ok)
    throw new Error('Unable to load user details. Please try again.')

  const data = (await response.json()) as ApiUser
  return mapApiUser(data)
}
