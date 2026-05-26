import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import './index.css'

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [foodSearch, setFoodSearch] = useState('')

  const {id} = useParams()

  useEffect(() => {
    getDetails()
    const savedCart = JSON.parse(localStorage.getItem('cartData')) || []
    setCartItems(savedCart)
  }, [])

  const getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(`https://apis.ccbp.in/restaurants-list/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    const data = await response.json()
    setRestaurant(data)
    setLoading(false)
  }

  const filteredFoodItems = restaurant
    ? restaurant.food_items.filter(each =>
        each.name.toLowerCase().includes(foodSearch.trim().toLowerCase()),
      )
    : []

  const saveCart = updatedCart => {
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  const getQuantity = foodId => {
    const item = cartItems.find(each => each.id === foodId)
    return item ? item.quantity : 0
  }

  const addItem = foodItem => {
    const existingItem = cartItems.find(each => each.id === foodItem.id)

    let updatedCart

    if (existingItem) {
      updatedCart = cartItems.map(each =>
        each.id === foodItem.id ? {...each, quantity: each.quantity + 1} : each,
      )
    } else {
      const newItem = {
        id: foodItem.id,
        name: foodItem.name,
        cost: foodItem.cost,
        imageUrl: foodItem.image_url,
        quantity: 1,
      }

      updatedCart = [...cartItems, newItem]
    }

    saveCart(updatedCart)
  }

  const decreaseItem = foodId => {
    const existingItem = cartItems.find(each => each.id === foodId)

    if (!existingItem) {
      return
    }

    let updatedCart

    if (existingItem.quantity === 1) {
      updatedCart = cartItems.filter(each => each.id !== foodId)
    } else {
      updatedCart = cartItems.map(each =>
        each.id === foodId ? {...each, quantity: each.quantity - 1} : each,
      )
    }

    saveCart(updatedCart)
  }

  if (loading) {
    return (
      <div className="loader-container" testid="restaurant-details-loader">
        <Oval color="gold" height={40} width={50} />
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="restaurant-details-container">
        <div className="restaurant-banner">
          <img src={restaurant.image_url} alt="restaurant" />

          <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.location}</p>
            <p>⭐ {restaurant.rating}</p>
            <p>{restaurant.reviews_count}+ Ratings</p>
          </div>
        </div>

        <div className="food-search-bar">
          <input
            type="search"
            className="search-input"
            placeholder="Search food items"
            value={foodSearch}
            onChange={event => setFoodSearch(event.target.value)}
          />
        </div>

        {filteredFoodItems.length === 0 ? (
          <p className="no-results">No matching food items found.</p>
        ) : (
          <ul className="food-items-list">
            {filteredFoodItems.map(each => {
              const quantity = getQuantity(each.id)

              return (
                <li className="food-item-card" testid="foodItem" key={each.id}>
                  <img src={each.image_url} alt={each.name} />

                  <div>
                    <h3>{each.name}</h3>
                    <p>
                      <FaRupeeSign /> {each.cost}
                    </p>

                    {quantity === 0 ? (
                      <button
                        className="add-button"
                        type="button"
                        onClick={() => addItem(each)}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="quantity-container">
                        <button
                          type="button"
                          testid="decrement-count"
                          onClick={() => decreaseItem(each.id)}
                        >
                          -
                        </button>

                        <p testid="active-count">{quantity}</p>

                        <button
                          type="button"
                          testid="increment-count"
                          onClick={() => addItem(each)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default RestaurantDetails