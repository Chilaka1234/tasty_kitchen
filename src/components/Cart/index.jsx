import {useEffect, useState} from 'react'
import {FaRupeeSign, FaCheckCircle} from 'react-icons/fa'
import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'

import Header from '../Header'
import CartEmpty from '../CartEmpty'
import './index.css'

const Cart = () => {
  const [cartList, setCartList] = useState([])
  const [checkoutStarted, setCheckoutStarted] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [checkoutData, setCheckoutData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
  })
  const [orderInfo, setOrderInfo] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    setCartList(data)
  }, [])

  const saveCart = updatedCart => {
    localStorage.setItem('cartData', JSON.stringify(updatedCart))
    setCartList(updatedCart)
  }

  const increaseQuantity = id => {
    const updatedCart = cartList.map(each =>
      each.id === id ? {...each, quantity: each.quantity + 1} : each,
    )
    saveCart(updatedCart)
  }

  const decreaseQuantity = id => {
    const selectedItem = cartList.find(each => each.id === id)

    const updatedCart =
      selectedItem.quantity === 1
        ? cartList.filter(each => each.id !== id)
        : cartList.map(each =>
            each.id === id ? {...each, quantity: each.quantity - 1} : each,
          )

    saveCart(updatedCart)
  }

  const removeItem = id => {
    const updatedCart = cartList.filter(each => each.id !== id)
    saveCart(updatedCart)
  }

  const startCheckout = () => {
    setCheckoutStarted(true)
  }

  const handleCheckoutChange = event => {
    const {name, value} = event.target
    setCheckoutData(prev => ({...prev, [name]: value}))
  }

  const submitOrder = event => {
    event.preventDefault()
    localStorage.removeItem('cartData')
    setCartList([])
    setOrderInfo(checkoutData)
    setCheckoutStarted(false)
    setOrderPlaced(true)
  }

  const total = cartList.reduce(
    (acc, each) => acc + each.cost * each.quantity,
    0,
  )

  if (orderPlaced) {
    const fullAddress = [
      orderInfo.addressLine1,
      orderInfo.addressLine2,
      orderInfo.city,
      orderInfo.state,
      orderInfo.pincode,
    ]
      .filter(Boolean)
      .join(', ')

    return (
      <>
        <Header />
        <div className="order-success-container">
          <FaCheckCircle className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Your order will be delivered soon.</p>
          <h2>Payment Method: {orderInfo.paymentMethod}</h2>
          <p className="order-address">Delivery Address: {fullAddress}</p>
        </div>
      </>
    )
  }

  if (checkoutStarted) {
    return (
      <>
        <Header />
        <div className="checkout-container">
          <h1>Checkout</h1>
          <p>Please enter your delivery address and confirm payment details.</p>
          <form className="checkout-form" onSubmit={submitOrder}>
            <div className="form-field">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                value={checkoutData.addressLine1}
                onChange={handleCheckoutChange}
                required
                placeholder="Street, number, building"
              />
            </div>

            <div className="form-field">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                id="addressLine2"
                name="addressLine2"
                type="text"
                value={checkoutData.addressLine2}
                onChange={handleCheckoutChange}
                placeholder="Apartment, suite, landmark"
              />
            </div>

            <div className="form-row">
              <div className="form-field half-width">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={checkoutData.city}
                  onChange={handleCheckoutChange}
                  required
                  placeholder="City"
                />
              </div>
              <div className="form-field half-width">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={checkoutData.state}
                  onChange={handleCheckoutChange}
                  required
                  placeholder="State"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={checkoutData.pincode}
                onChange={handleCheckoutChange}
                required
                placeholder="Postal code"
              />
            </div>

            <div className="form-field">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={checkoutData.paymentMethod}
                onChange={handleCheckoutChange}
              >
                <option>Cash on Delivery</option>
                <option>Credit / Debit Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
              </select>
            </div>

            <p className="checkout-note">
              Payment is not verified here. This page only shows the selected payment type.
            </p>

            <button type="submit" className="place-order-button">
              Confirm Order
            </button>
          </form>
        </div>
      </>
    )
  }

  if (cartList.length === 0) {
    return <CartEmpty />
  }

  return (
    <>
      <Header />

      <div className="cart-container">
        <ul className="cart-list">
          {cartList.map(each => (
            <li className="cart-item" testid="cartItem" key={each.id}>
              <img src={each.imageUrl} alt={each.name} />
              <h3>{each.name}</h3>

              <div className="cart-quantity-container">
                <button
                  type="button"
                  testid="decrement-quantity"
                  onClick={() => decreaseQuantity(each.id)}
                >
                  <HiOutlineMinusSm />
                </button>

                <p testid="item-quantity">{each.quantity}</p>

                <button
                  type="button"
                  testid="increment-quantity"
                  onClick={() => increaseQuantity(each.id)}
                >
                  <BsPlus />
                </button>
              </div>

              <p>
                <FaRupeeSign /> {each.cost * each.quantity}
              </p>

              <button
                className="remove-button"
                type="button"
                onClick={() => removeItem(each.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="total-price-container">
          <h1>
            Order Total: <FaRupeeSign />
            <span testid="total-price">{total}</span>
          </h1>

          <button type="button" className="place-order-button" onClick={startCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart