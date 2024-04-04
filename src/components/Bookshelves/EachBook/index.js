import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const EachBook = props => {
  const {bookDetails} = props
  return (
    <Link to={`/books/${bookDetails.id}`} className="Link">
      <li className="bookshelves-cover-cont">
        <img
          src={bookDetails.coverPic}
          alt={bookDetails.title}
          className="bookshelves-cover-pic"
        />
        <div>
          <h1 className="bookshelves-title">{bookDetails.title}</h1>
          <p className="bookshelves-details-author-name">
            {bookDetails.authorName}
          </p>
          <div className="bookshelves-details-rating-cont">
            <p className="bookshelves-details-avg-rating">Avg Rating </p>
            <div className="bookshelves-details-icon-cont">
              <BsFillStarFill className="bookshelves-details-star" />
              <p className="bookshelves-details-rating">{bookDetails.rating}</p>
            </div>
          </div>
          <p className="bookshelves-details-status">
            Status:{' '}
            <span className="bookshelves-details-status-2">
              {bookDetails.readStatus}
            </span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default EachBook
