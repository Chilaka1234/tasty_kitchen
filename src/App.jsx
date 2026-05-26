import {Routes, Route, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

export const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 1,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route
      path="/restaurant/:id"
      element={
        <ProtectedRoute>
          <RestaurantDetails />
        </ProtectedRoute>
      }
    />

    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }
    />

    <Route path="/not-found" element={<NotFound />} />

    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
)

export default App
