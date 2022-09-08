import "./cart.css"
import React, {useEffect, useState} from 'react'
import { Product, ProductCart } from '../../types'
import { getConfig } from '../../utils'
import { CartCard } from './CartCard'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import axios from "axios"

export const CartScreen = ()=> {
  const products: Product[] = useSelector((state: RootState)=> state.products)
  const [productsCr, setProductsCr] = useState<ProductCart[]>([])
  const [total, setTotal] = useState(0)
  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false

  useEffect(()=> {
    setTotal(productsCr.reduce((acc, pr)=> acc += (parseInt(pr.price)*pr.productsInCart.quantity), 0))

    fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
      method: 'GET',  
      headers: {
        Authorization: `Bearer ${data.user.token}`
      }
    }).then(prom=> prom.json()).then(res=> setProductsCr(res.data.cart.products)).catch(err=> err)
  }, [])

  function checkout(){
    axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {
      "street": "Green St. 1456",
      "colony": "Academlo",
      "zipCode": 12345,
      "city": "CMX",
      "references": "Some references"
    },
    getConfig(data.user.token)
    ).then(res=> {
      console.log(res)
      fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
        method: 'GET',  
        headers: {
          Authorization: `Bearer ${data.user.token}`
        }
      }).then(prom=> prom.json()).then(res=> setProductsCr(res.data.cart.products)).catch(err=> setProductsCr([]))
    }).catch(err=> err)
  }

  console.log(productsCr)

  return (
    <section className="cart">
      {productsCr.length>0 ? (
        <>
          {productsCr?.map(m=> <CartCard key={m.id} product={m} img={products.find(f=> f.id==m.id)?.productImgs[0]} setProducts={setProductsCr} />)}
          <div className="cart_checkout">
            <div className="cart_checkout-text">
              <p>Total:</p>
              <p>$ {total}</p>
            </div>
            <button onClick={checkout} className="cart_checkout-btn">Checkout</button>
          </div>
        </>
        ) : <p>There are no products</p>
      }
    </section>
  )
}