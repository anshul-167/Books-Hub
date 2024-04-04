import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import BookItemDetails from './components/BookItemDetails'
import Bookshelves from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
