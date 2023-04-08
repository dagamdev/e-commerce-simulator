import { AnyAction, ThunkAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { endPoint } from "../../utils/config"
import { getConfig, getLocalData } from "../../utils"

const LocalData = getLocalData()

export const cartsSlice = createSlice({
  name: "carts",
  initialState: 0,
  reducers: {
    setCartAmount: (state, action) => action.payload,
    addCart: (state) => state+1,
    removeCart: (state) => state-1,
  }
})

export const { setCartAmount, addCart, removeCart } = cartsSlice.actions
export const getCartAmount = (): ThunkAction<void, RootState, unknown, AnyAction> => 
  async dispatch => {
  if(LocalData){
    return fetch(endPoint+"cart", getConfig(LocalData.user.token))
      .then(prom=> prom.json())
      .then((res)=> {
        dispatch(setCartAmount(res.length))
      })
      .catch(err=> console.error(err))

  }
}
export default cartsSlice.reducer