import { useEffect, useState } from 'react'
import type { User } from '../data/users'
import { fetchUserById } from '../services/users.service'

interface UseUserResult {
  user: User | null
  isLoading: boolean
  hasError: boolean
  errorMessage: string
}

export function useUser(id: string | undefined): UseUserResult {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!id) {
      setUser(null)
      setIsLoading(false)
      setHasError(true)
      setErrorMessage('User not found.')
      return
    }

    let isMounted = true

    async function loadUser() {
      setIsLoading(true)
      setHasError(false)
      setErrorMessage('')

      try {
        const data = await fetchUserById(id as string)
        if (!isMounted) return
        setUser(data)
      } catch (error) {
        if (!isMounted) return
        setUser(null)
        setHasError(true)
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load user details.'
        )
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [id])

  return {
    user,
    isLoading,
    hasError,
    errorMessage,
  }
}
