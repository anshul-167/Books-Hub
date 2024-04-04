import './index.css'
import {Link} from 'react-router-dom'

const TopRatedBookItem = props => {
  const {bookDetails} = props
  const {authorName, coverPic, id, title} = bookDetails
  return (
    <Link className="top-rated-book-item-cont" to={`/books/${id}`}>
      <img src={coverPic} alt={title} className="top-rated-book-img" />
      <h1 className="top-rated-book-title">{title}</h1>
      <p className="top-rated-book-author">{authorName}</p>
    </Link>
  )
}

export default TopRatedBookItem
