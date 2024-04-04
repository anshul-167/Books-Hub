import {withRouter, Link} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

import Select from 'react-select'

import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const buttonList = ['homeButton', 'bookshelvesButton']

const Header = props => {
  const {history} = props
  const [isSelected, setIsSelected] = useState(buttonList[0])

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickHome = () => {
    setIsSelected(buttonList[0])
  }

  const onClickBookshelves = () => {
    setIsSelected(buttonList[1])
  }

  const HomeButton = () => (
    <Link to="/">
      <button
        type="button"
        className={
          isSelected === 'homeButton'
            ? 'header-link-selected'
            : 'header-link-unselected'
        }
        onClick={onClickHome}
      >
        Home
      </button>
    </Link>
  )

  const ShelfButton = () => (
    <Link to="/shelf">
      <button
        type="button"
        className={
          isSelected === 'bookshelvesButton'
            ? 'header-link-selected'
            : 'header-link-unselected'
        }
        onClick={onClickBookshelves}
      >
        Bookshelves
      </button>
    </Link>
  )

  const LogoutButton = () => (
    <div>
      <button
        onClick={onClickLogout}
        type="button"
        className="header-logout-button"
      >
        Logout
      </button>
    </div>
  )

  const HamburgerMenu = () => {
    console.log('c')
    const options = [
      {value: 'home', label: 'Home', onClick: onClickHome},
      {value: 'bookshelves', label: 'Bookshelves', onClick: onClickBookshelves},
      {value: 'logout', label: 'Logout', onClick: onClickLogout},
    ]

    return (
      <Select
        options={options}
        onChange={selectedOption => console.log(selectedOption)}
      />
    )
  }

  return (
    <nav>
      <Link className="header-logo-cont" to="/">
        <img
          src="https://res.cloudinary.com/dxebvkapr/image/upload/v1705754565/Group_7730_utec8z.jpg"
          alt="login website logo"
          className="header-login-logo"
        />
        <p className="header-login-logo-text">ook Hub</p>
      </Link>
      <ul className="header-link-cont">
        <li>{HomeButton()}</li>
        <li>{ShelfButton()}</li>
        <li>{LogoutButton()}</li>
      </ul>
      <button type="button" onClick={HamburgerMenu} className="hamburger-menu">
        <GiHamburgerMenu />
      </button>
    </nav>
  )
}

export default withRouter(Header)
