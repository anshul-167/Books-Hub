import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {withRouter, Redirect, Link} from 'react-router-dom'
import './index.css'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TopRatedBookItem from './TopRatedBookItem/index'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  state = {isLoading: true, topRatedBooksList: [], showFailedView: false}

  componentDidMount() {
    this.getHomeBooks()
  }

  getHomeBooks = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({topRatedBooksList: formattedData, isLoading: false})
    } else {
      this.setState({showFailedView: true, isLoading: false})
    }
  }

  onClickTryAgain = () => {
    this.setState({isLoading: true}, this.getHomeBooks)
  }

  renderReactSlick = () => {
    const settings = {
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1824, // screen size up to 1024 pixels
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 800, // screen size up to 1024 pixels
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600, // screen size up to 768 pixels
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const {topRatedBooksList} = this.state
    return (
      <>
        <div className="slider-container">
          <div className="home-carousel-top-row">
            <h2 className="top-rated-books-title">Top Rated Books</h2>
            <Link to="/shelf" className="link">
              <button
                type="button"
                className="view-more-button-2"
                onClick={this.onClickFindBooks}
              >
                Find Books
              </button>
            </Link>
          </div>
          <Slider {...settings} className="slider">
            {topRatedBooksList.map(each => (
              <li key={each.id}>
                <TopRatedBookItem bookDetails={each} />
              </li>
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderHomeSection = () => {
    const {isLoading, showFailedView} = this.state
    let content
    if (isLoading) {
      content = this.renderLoader()
    } else if (showFailedView) {
      content = this.renderFailureView()
    } else {
      content = this.renderReactSlick()
    }
    return (
      <div className="home-main-cont">
        <h1 className="home-main-head">Find Your Next Favorite Books?</h1>
        <p className="home-para">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <button
          type="button"
          className="view-more-button-1"
          onClick={this.onClickFindBooks}
        >
          Find Books
        </button>
        <div className="home-carousel-cont">{content}</div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
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
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      Cookies.remove('jwt_token')
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        {this.renderHomeSection()}
        <Footer />
      </div>
    )
  }
}
export default withRouter(Home)
