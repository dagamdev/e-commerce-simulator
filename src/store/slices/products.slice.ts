import {createSlice} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action)=> action.payload
  }
})

export const {setProducts} = productsSlice.actions
export const getProducts = (url: string) =>  (dispatch: string) => {
  // return fetch(url).then(prom=> prom.json()).then(res=> dispatch(setProducts(res.data.products))).catch(err=> console.error(err))
}
export default productsSlice.reducer