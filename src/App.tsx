import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomeScreen } from './components/home/HomeScreen'
import { LoginScreen } from './components/login/LoginScreen'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { CartScreen } from './components/cart/CartScreen'
import { PurchasesScreen } from './components/purchases/PurchasesScreen'
import { HeaderScreen } from './components/shared/HeaderScreen'
import { getProducts } from './store/slices/products.slice'
import {useSelector} from "react-redux"

function App() {

  return (
    <div className="App">
      <HeaderScreen />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />

        <Route element={<ProtectedRoutes isLogged={true} />} >
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/purchases' element={<PurchasesScreen />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
