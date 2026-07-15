import { useEffect, useState } from 'react'
import type { User } from '../data/users'
import { fetchUsers } from '../services/users.service'

interface UseUsersResult {
  users: User[]
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  refetch: () => void
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      setIsLoading(true)
      setHasError(false)
      setErrorMessage('')

      try {
        const data = await fetchUsers()
        if (!isMounted) return
        setUsers(data)
      } catch (error) {
        if (!isMounted) return
        setUsers([])
        setHasError(true)
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load users.'
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [reloadKey])

  function refetch() {
    setReloadKey((current) => current + 1)
  }

  return {
    users,
    isLoading,
    hasError,
    errorMessage,
    refetch,
  }
}
