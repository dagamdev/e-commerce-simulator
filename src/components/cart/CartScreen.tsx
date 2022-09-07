import React, {useEffect, useState} from 'react'

export const CartScreen = ()=> {
  const [products, setProducts] = useState([])

  const obtaining = localStorage.getItem("e-commerce") || ""
  const data = obtaining ? JSON.parse(obtaining) : false
  useEffect(()=> {
    console.log(data.user.token)
    fetch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", {
      method: 'GET',  
      headers:{
        Authorization: `Bearer ${data.user.token}`
      }
    }).then(prom=> prom.json()).then(res=> console.log(res)).catch(err=> console.error(err))
  }, [])
  return (
    <div className="cart"></div>
  )
}