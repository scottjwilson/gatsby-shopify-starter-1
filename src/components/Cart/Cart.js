import React, { useContext, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import { animated } from "react-spring"

const Cart = ({ style }) => {
  const {
    isCartOpen,
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)

  const [coupon, setCoupon] = useState("")

  return (
    <animated.div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        background: "white",
        padding: "40px 2%",
        zIndex: 1000,
        boxShadow: "var(--elevation-4)",
        ...style,
      }}
    >
      <button
        style={{
          background: "var(--red)",
          position: "absolute",
          top: 10,
          right: 10,
        }}
        className="delete is-large"
        onClick={toggleCartOpen}
      >
        Close
      </button>
      <h2 className="title">Cart</h2>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{ display: "flex", marginBottom: "2rem" }}>
          <div
            style={{
              width: 60,
              height: 60,
              overflow: "hidden",
              marginRight: 10,
            }}
          >
            <img src={item.variant.image.src} alt="product" />
          </div>
          <div>
            <h4 className="title is-4">{item.title}</h4>
            <p className="subtitle is-5">Qty:{item.quantity}</p>
            <p className="subtitle is-5">${item.variant.price}</p>
            <button
              onClick={() => removeProductFromCart(item.id)}
              className="is-small button is-danger is-outlined"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div>
        {checkout.discountApplications.length > 0 ? (
          <p>
            Coupon:
            <h5 className="title">
              {checkout.discountApplications[0].code} -{" "}
              {checkout.discountApplications[0].value.percentage}% off
            </h5>
            <button
              onClick={() =>
                removeCoupon(checkout.discountApplications[0].code)
              }
              className="is-small button is-danger is-outlined"
            >
              Remove
            </button>
          </p>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault()
              checkCoupon(coupon)
            }}
          >
            <div className="field">
              <label htmlFor="coupon" className="label">
                Coupon
              </label>
              <input
                className="input"
                id="coupon"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                type="text"
              />
            </div>
            <button className="button">Check Coupon</button>
          </form>
        )}
      </div>

      <hr />
      <div>
        Total:
        <h5 className="title">${checkout.totalPrice}</h5>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <a
          href={checkout.webUrl}
          style={{ background: "var(--gold)", color: "white" }}
          className="button is-fullwidth"
        >
          Checkout Now
        </a>
      </div>
    </animated.div>
  )
}

export default Cart
