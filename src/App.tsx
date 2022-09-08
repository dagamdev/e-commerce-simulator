import './App.css'
import { MouseEvent, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {useSelector} from "react-redux"
import { HomeScreen } from './components/home/HomeScreen'
import { LoginScreen } from './components/login/LoginScreen'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { CartScreen } from './components/cart/CartScreen'
import { PurchasesScreen } from './components/purchases/PurchasesScreen'
import { HeaderScreen } from './components/shared/HeaderScreen'
import { FooterScreen } from './components/shared/FooterScreen'
import { ProductScreen } from './components/product/ProductScreen'
import { UserScreen } from "./components/user/UserScreen"

type CloseInput = (doc: Element|ChildNode|null) => boolean


function App() {

  function closeInput({target}: MouseEvent<HTMLElement>){
    const searchProduct = document.querySelector(".search-active")
    const allChilds: CloseInput = function (doc){
      let res = false
      if(doc && doc == target) return res = true
      if(doc && doc.childNodes.length > 0){
        for(let dch of doc.childNodes){
          if(dch == target) return res = true
          if(dch.childNodes.length > 0) res = allChilds(dch)
        }
      }
      return res
    }

    if(searchProduct && !allChilds(searchProduct)) searchProduct.classList.remove("search-active")
  }

  return (
    <div onClick={closeInput} className="App">
      <HeaderScreen />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />

        <Route element={<ProtectedRoutes />} >
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/purchases' element={<PurchasesScreen />} />
          <Route path='/user' element={<UserScreen />} />
        </Route>

        <Route path='/product'>
          <Route path=':id' element={<ProductScreen />} />
        </Route>
      </Routes>
      <FooterScreen />
    </div>
  )
}

export default App
