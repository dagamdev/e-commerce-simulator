import {AnyAction, createSlice, ThunkDispatch} from "@reduxjs/toolkit"
import { ThunkAction } from "@reduxjs/toolkit"
import { RootState } from ".."

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action)=> action.payload
  }
})

export const {setProducts} = productsSlice.actions
export const getProducts = (): ThunkAction<void, RootState, unknown, AnyAction> => 
  async dispatch => {
  return fetch("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then(prom=> prom.json())
    .then(res=> dispatch(setProducts(res.data.products)))
    .catch(err=> console.error(err))
}
export default productsSlice.reducer