import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Home = () => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const offersResponse = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const offersData = await offersResponse.json()

    const restaurantsResponse = await fetch(
      'https://apis.ccbp.in/restaurants-list?offset=0&limit=9',
      options,
    )
    const restaurantsData = await restaurantsResponse.json()

    setOffers(offersData.offers || [])
    setRestaurants(restaurantsData.restaurants || [])
    setLoading(false)
  }

  const filteredRestaurants = restaurants.filter(each => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (normalizedSearch === '') {
      return true
    }

    return (
      each.name.toLowerCase().includes(normalizedSearch) ||
      each.cuisine.toLowerCase().includes(normalizedSearch)
    )
  })

  if (loading) {
    return (
      <div className="loader-container" testid="restaurants-list-loader">
        <Oval color="gold" height={40} width={50} />
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className="home-container">
        <div className="offers-container">
          {offers.map(each => (
            <img key={each.id} src={each.image_url} alt="offer" />
          ))}
        </div>

        <div className="search-bar">
          <input
            type="search"
            className="search-input"
            placeholder="Search hotels or cuisine"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>

        <h1>Popular Restaurants</h1>

        {filteredRestaurants.length === 0 ? (
          <p className="no-results">No hotels found. Try another name or cuisine.</p>
        ) : (
          <ul className="restaurant-list">
          {filteredRestaurants.map(each => (
            <li className="restaurant-card" testid="restaurant-item" key={each.id}>
              <Link to={`/restaurant/${each.id}`}>
                <img src={each.image_url} alt="restaurant" />
                <h3>{each.name}</h3>
                <p>{each.cuisine}</p>
                <p>⭐ {each.user_rating.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>

      <Footer />
    </>
  )
}

export default Home