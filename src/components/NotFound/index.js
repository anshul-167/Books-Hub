import './index.css'
import {withRouter, Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-cont">
    <img
      src="https://res.cloudinary.com/dxebvkapr/image/upload/v1706002588/Group_7484_vinux4.jpg"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default withRouter(NotFound)
