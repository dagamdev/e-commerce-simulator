import { configureStore } from "@reduxjs/toolkit"
import products from "./slices/products.slice"
import loading from "./slices/loading.slice"

export const store = configureStore({
  reducer:{
    products,
    loading
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch