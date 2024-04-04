import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import EachBook from './EachBook/index'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    activeTab: bookshelvesList[0],
    booksList: [],
    isLoading: true,
    showError: false,
    searchText: '',
  }

  componentDidMount() {
    this.getBooksData()
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  getBooksData = async () => {
    const {activeTab, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab.value}&search=${searchText}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      const formattedData = data.books.map(item => ({
        authorName: item.author_name,
        coverPic: item.cover_pic,
        id: item.id,
        rating: item.rating,
        readStatus: item.read_status,
        title: item.title,
      }))
      this.setState({isLoading: false, booksList: formattedData})
    } else {
      this.setState({showError: true, isLoading: false})
    }
  }

  onClickSearchButton = () => {
    this.getBooksData()
  }

  onClickTabButton = id => {
    const activeTabButton = bookshelvesList.find(each => each.id === id)
    this.setState({activeTab: activeTabButton}, this.getBooksData)
  }

  onClickTryAgain = () => {
    this.setState({isLoading: true}, this.getBooksData)
  }

  renderTabsSection = () => {
    const {activeTab} = this.state
    return (
      <>
        <div className="bookshelves-tabs-cont">
          <h2 className="bookshelves-tabs-head">Bookshelves</h2>
          <ul className="bookshelves-tabs-list-cont">
            {bookshelvesList.map(each => (
              <li className="bookshelves-tabs-list-item" key={each.id}>
                <button
                  type="button"
                  className={
                    activeTab.id === each.id
                      ? 'bookshelves-tabs-button-active'
                      : 'bookshelves-tabs-button-inactive'
                  }
                  onClick={() => this.onClickTabButton(each.id)}
                >
                  {each.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderBooksSection = () => {
    const {searchText, booksList, activeTab} = this.state
    return (
      <div className="bookshelves-main-cont">
        <div className="bookshelves-top-cont">
          <h2 className="bookshelves-tabs-head">{`${activeTab.label} Books`}</h2>
          <div className="bookshelves-input-cont">
            <input
              type="search"
              placeholder="Search"
              value={searchText}
              onChange={this.onChangeSearch}
              className="bookshelves-input"
            />
            <button
              type="button"
              className="bookshelves-search-button"
              onClick={this.onClickSearchButton}
              testid="searchButton"
            >
              <BsSearch />
            </button>
          </div>
        </div>
        <ul className="bookshelves-books-cont">
          {booksList.length === 0
            ? this.renderNoBooksView()
            : booksList.map(each => (
                <EachBook bookDetails={each} key={each.id} />
              ))}
        </ul>
      </div>
    )
  }

  renderNoBooksView = () => {
    const {searchText} = this.state
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dxebvkapr/image/upload/v1706090087/Asset_1_1_jny0dz.jpg"
          alt="no books"
        />
        <p>{`Your search for ${searchText} did not find any matches`}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="bookshelves-main-cont">
      <img
        src="https://res.cloudinary.com/dxebvkapr/image/upload/v1706090619/Group_7522_ih5m7t.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button
        type="button"
        onClick={this.onClickTryAgain}
        className="header-logout-button "
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading, showError, searchText} = this.state
    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (showError) {
      content = this.renderFailureView()
    } else {
      content = this.renderBooksSection()
    }
    return (
      <>
        <Header />
        <div className="bookshelves-cont">
          <div className="bookshelves-input-cont-small">
            <input
              type="search"
              placeholder="Search"
              value={searchText}
              onChange={this.onChangeSearch}
              className="bookshelves-input"
            />
            <button
              type="button"
              className="bookshelves-search-button"
              onClick={this.onClickSearchButton}
              testid="searchButton"
            >
              <BsSearch />
            </button>
          </div>
          {this.renderTabsSection()}
          {content}
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
