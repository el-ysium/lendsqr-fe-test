import { type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import profileImg from '../../assets/profile.png'
import { useSearch } from '../../context/search-context'
import { IconBell, IconChevronDown, IconMenu, IconSearch } from '../icons/Icons'
import './Topbar.scss'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { searchQuery, setSearchQuery } = useSearch()

  function handleSearch(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu-btn"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <IconMenu />
        </button>
        <Link to="/users" className="topbar__logo">
          <img src={logo} alt="lendsqr" />
        </Link>
      </div>

      <form className="topbar__search" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search for anything"
          aria-label="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" aria-label="Submit search">
          <IconSearch />
        </button>
      </form>

      <div className="topbar__right">
        <a href="#docs" className="topbar__docs">
          Docs
        </a>
        <button type="button" className="topbar__bell" aria-label="Notifications">
          <IconBell />
        </button>
        <button type="button" className="topbar__profile">
          <img src={profileImg} alt="" className="topbar__avatar" />
          <span>Adedeji</span>
          <IconChevronDown />
        </button>
      </div>
    </header>
  )
}
