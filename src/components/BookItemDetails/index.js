import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

class BookItemDetails extends Component {
  state = {bookDetails: {}, isLoading: true, showFailureView: false}

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = item => ({
        aboutAuthor: item.about_author,
        aboutBook: item.about_book,
        authorName: item.author_name,
        coverPic: item.cover_pic,
        id: item.id,
        rating: item.rating,
        readStatus: item.read_status,
        title: item.title,
      })
      const formattedBookDetails = formattedData(data.book_details)
      this.setState({bookDetails: formattedBookDetails, isLoading: false})
    } else {
      this.setState({showFailureView: true, isLoading: false})
    }
  }

  onClickTryAgain = () => {
    this.setState({isLoading: true}, this.getBookItemDetails)
  }

  renderBookDetails = () => {
    const {bookDetails} = this.state
    return (
      <div className="book-details-cont">
        <div className="book-details-cover-cont">
          <img
            src={bookDetails.coverPic}
            alt={bookDetails.title}
            className="book-cover-pic"
          />
          <div>
            <h1 className="book-title">{bookDetails.title}</h1>
            <p className="book-details-author-name">{bookDetails.authorName}</p>
            <div className="book-details-rating-cont">
              <p className="book-details-avg-rating">Avg Rating </p>
              <div className="book-details-icon-cont">
                <BsFillStarFill className="book-details-star" />
                <p className="book-details-rating">{bookDetails.rating}</p>
              </div>
            </div>
            <p className="book-details-status">
              Status:{' '}
              <span className="book-details-status-2">
                {bookDetails.readStatus}
              </span>
            </p>
          </div>
        </div>
        <hr />
        <h2 className="book-details-sub-head">About Author</h2>
        <p className="book-details-sub-para">{bookDetails.aboutAuthor}</p>
        <h2 className="book-details-sub-head">About Book</h2>
        <p className="book-details-sub-para">{bookDetails.aboutBook}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

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

  render() {
    const {isLoading, showFailureView} = this.state
    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (showFailureView) {
      content = this.renderFailureView()
    } else {
      content = this.renderBookDetails()
    }
    return (
      <div className="book-details-main-cont">
        <Header />
        <div className="centering-cont">{content}</div>
        <Footer />
      </div>
    )
  }
}

export default BookItemDetails
