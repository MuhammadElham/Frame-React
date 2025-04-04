import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const { getCartAmount } = useContext(ShopContext)
  return (
    <div>
      <p>{getCartAmount()}.00</p>
    </div>
  )
}

export default CartTotal
