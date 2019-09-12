import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: "ontheclock24.myshopify.com",
  storefrontAccessToken: "da6a7a8e70380f457c4d49e80cd6f7f0",
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  removeCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

// Check if it's a browser
const isBrowser = typeof window !== "undefined"

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setCartOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const toggleCartOpen = () => setCartOpen(!isCartOpen)

  useEffect(() => {
    initializeCheckout()
  }, [])

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout
    } catch (e) {
      console.error(e)
    }
  }

  const initializeCheckout = async () => {
    try {
      // Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        // If id exists, fetch checkout from shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
      } else {
        // If id does not, create new checkout
        newCheckout = await getNewId()
      }

      // Set checkout to state
      setCheckout(newCheckout)
    } catch (e) {}
  }

  const addProductToCart = async variantId => {
    try {
      setLoading(true)
      const lineItems = [
        {
          variantId: variantId,
          quantity: 1,
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )

      // Buy Now Button Code
      // window.open(addItems.webUrl, "_blank")

      setCheckout(newCheckout)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      setLoading(true)

      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])

      // Buy Now Button Code
      // window.open(addItems.webUrl, "_blank")

      setCheckout(newCheckout)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const checkCoupon = async coupon => {
    setLoading(true)
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)

    setCheckout(newCheckout)
    setLoading(false)
  }

  const removeCoupon = async coupon => {
    setLoading(true)
    const newCheckout = await client.checkout.removeDiscount(
      checkout.id,
      coupon
    )
    setCheckout(newCheckout)
    setLoading(false)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        removeProductFromCart,
        toggleCartOpen,
        isCartOpen,
        checkCoupon,
        removeCoupon,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
