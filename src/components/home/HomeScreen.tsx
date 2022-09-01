import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import { getProducts } from "../../store/slices/products.slice"

export const HomeScreen = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getProducts("https://ecommerce-api-react.herokuapp.com/api/v1/products"))
  }, [])

  return (
    <div className="home">
      home
    </div>
  )
}