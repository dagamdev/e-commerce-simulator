import { configureStore } from "@reduxjs/toolkit"
import products from "./slices/products.slice"
import carts from "./slices/carts.slice"
import toasts from './slices/toasts.slice'

export const store = configureStore({
  reducer:{
    products,
    carts,
    toasts
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch