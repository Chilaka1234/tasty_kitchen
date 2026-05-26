import './index.css'

const CartEmpty = () => (
  <div className="empty-cart-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty cart"
      className="empty-cart-image"
    />

    <h1>No Order Yet!</h1>

    <p>Your cart is empty. Add something from the menu.</p>
  </div>
)

export default CartEmpty