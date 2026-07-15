import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface SearchContextValue {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearch must be used within SearchProvider')
  return context
}
