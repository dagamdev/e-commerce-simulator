import "./home.css"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { RootState, AppDispatch } from "../../store"
import { setProducts, getProducts } from "../../store/slices/products.slice"
import { CardProduct } from "./CardProduct"
import { Filters, Product } from "../../types"
import { setLoading } from "../../store/slices/loading.slice"
import { SearchProduct } from "./SearchProduct"
import { PriceFilter } from "./PriceFilter"
import { CategoryFilter } from "./CategoryFilter"

export const HomeScreen = () => {
  const dispatch: AppDispatch = useDispatch()
  const [filters, setFilters] = useState<Filters>({from: null, to: null, category: null})
  const products: Product[] = useSelector((state: RootState)=> state.products)
  const isLoading = useSelector((state: RootState) => state.loading)
  let productsFilter = (filters.category || filters.from) ? products?.filter(({category, price})=> {
    if(filters.category && filters.from && filters.to){
      return filters.category == category.name && (filters.from <= parseInt(price) && filters.to >= parseInt(price))
    }
    if(filters.category) return filters.category == category.name
    if(filters.from && filters.to) return filters.from <= parseInt(price) && filters.to >= parseInt(price)
  }) : [] 
  useEffect(()=> {
    dispatch(getProducts())
  }, [])

  // console.log(productsFilter)

  return (
    <div className="home">
      <aside className="home_filters">
        <i onClick={()=> document.querySelector(".home_filters")?.classList.remove("home_filters-open")} className='bx bx-x home_filters-close'></i>
        <h3>Filters</h3>
        <div className="home_filter-drop filter-drop-1 drop-open">
          <div onClick={()=> document.querySelector(".filter-drop-1")?.classList.toggle("drop-open")} className="home_filter-drop-title">
            <p>Price</p>
            <i className='bx bx-chevron-down'></i>
          </div>
          <PriceFilter filters={filters} setFilters={setFilters} limits={{min: Math.min(...products.map(m=> parseInt(m.price))), max: Math.max(...products.map(m=> parseInt(m.price)))}} />
        </div>
        <div className="home_filter-drop filter-drop-2 drop-open">
          <div onClick={()=> document.querySelector(".filter-drop-2")?.classList.toggle("drop-open")} className="home_filter-drop-title">
            <p>Category</p>
            <i className='bx bx-chevron-down'></i>
          </div>
          <CategoryFilter filters={filters} setFilters={setFilters} />
        </div>
      </aside>
      <section className="home_container">
        <div className="home_container-search">
          <SearchProduct products={productsFilter.length >0 ? productsFilter : products} />
          <div className="home_container-filters">
            <p onClick={()=> document.querySelector(".home_filters")?.classList.add("home_filters-open")}>
              <i className='bx bx-filter-alt'></i> <span>Filters</span>
            </p>
          </div>
        </div>
        <div className="home_container-cards">
          {(productsFilter.length >0 ? productsFilter : products)?.map((product) => <CardProduct key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  )
}