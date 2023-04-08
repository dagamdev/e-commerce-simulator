import "./cart.css"

import {useEffect, useState} from 'react'
import { Purchase } from '../../types'
import { CartCard } from './CartCard'
import axios from "axios"
import { endPoint } from "../../utils/config"
import Loader from "../shared/loading/Locader"
import { useToasts } from "../../hooks/useToasts"
import { getConfig, getLocalData } from "../../utils"
import { AppDispatch } from "../../store"
import { useDispatch } from "react-redux"
import { removeCart } from "../../store/slices/carts.slice"

export const CartScreen = ()=> {
  const localData = getLocalData()
  const [productsCr, setProductsCr] = useState<Purchase[]>([])
  const [total, setTotal] = useState(0)
  const [loader, setLoader] = useState(true)
  const { createNotification } = useToasts()
  const dispatch: AppDispatch = useDispatch()

  useEffect(()=> {    
    if(localData){
      fetch(endPoint+"cart", {
        method: 'GET',  
        headers: {
          Authorization: `Bearer ${localData?.user.token}`
        }
      }).then(prom=> prom.json()).then((res: Purchase[])=> {
        setProductsCr(res.reverse())
        setLoader(false)
        if(res.length) setTotal(res.reduce((acc, pr)=> acc += (parseInt(pr.product.price)*pr.quantity), 0))
      }).catch(err=> err)
    }
  }, [])

  function checkout(){
    axios.post(endPoint+"purchases", {}, getConfig(localData?.user.token || '')).then(res=> {
      console.log(res)

      fetch(endPoint+"cart", {
        method: 'GET',  
        headers: {
          Authorization: `Bearer ${localData?.user.token}`
        }
      }).then(prom=> prom.json()).then(()=> {
        dispatch(removeCart())
        setProductsCr([])
        createNotification({type: 'success', content: 'Purchase completed'})
      })
    }).catch(err=> console.log(err))
  }


  return (
    <section className="cart">
      {loader ?
        <Loader /> :
        (productsCr.length>0 ? (
          <>
            <div className="cart_products">
              {productsCr?.map(m=> <CartCard key={m.id} product={m} setTotal={setTotal} setProducts={setProductsCr} />)}
            </div>
            <div className="cart_checkout">
              <div className="cart_checkout-text">
                <p>Total:</p>
                <p>$ {total.toLocaleString()}</p>
              </div>
              <button onClick={checkout} className="cart_checkout-btn">Checkout</button>
            </div>
          </>
          ) : <i>There are no products</i>
        )
      }
    </section>
  )
}