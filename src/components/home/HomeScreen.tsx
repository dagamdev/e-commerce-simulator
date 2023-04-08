import "./home.css"

import {useEffect, useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import { RootState, AppDispatch } from "../../store"
import { getProducts } from "../../store/slices/products.slice"
import { CardProduct } from "./CardProduct"
import { Filters, Product, Toast } from "../../types"
import { SearchProduct } from "./SearchProduct"
import { PriceFilter } from "./PriceFilter"
import { CategoryFilter } from "./CategoryFilter"
import { BiX, BiFilter, BiChevronDown } from 'react-icons/bi'
import Loader from "../shared/loading/Locader"
import { useToasts } from "../../hooks/useToasts"

export const HomeScreen = () => {
  const filtersRef = useRef<HTMLDListElement>(null)
  const dispatch: AppDispatch = useDispatch()
  const [filters, setFilters] = useState<Filters>({from: null, to: null, category: null})
  const products: Product[] = useSelector((state: RootState)=> state.products)
  const [loader, setLoader] = useState(true)
  const { createNotification } = useToasts()

  let productsFilter = (filters.category || filters.from) ? products?.filter(({category, price})=> {
    const { category: categoryName, from, to } = filters
    return (categoryName ? categoryName == 'all' ? true : categoryName == category.name : true) && (from && to ? (from <= parseInt(price) && to >= parseInt(price)) : true) 
  }) : [] 

  useEffect(()=> {
    dispatch(getProducts())

    setTimeout(()=> {
      setLoader(false)
    }, 3000)

    document.addEventListener('mousedown', (event) => {
      if(filtersRef.current && !filtersRef.current.contains(event.target as Node | null)){
        filtersRef.current.classList.remove('home_filters-open')
      }
    })
  }, [])

  const openFilters = () => {
    document.querySelector(".home_filters")?.classList.add("home_filters-open")
    const types: Toast['type'][] = ['success', 'info', 'warning', 'error']
    createNotification({type: types[Math.floor(Math.random()*types.length)], content: 'Hello?', time: 10*60000})
  }

  // console.log(productsFilter)

  return (
    <div className="home">
      <aside ref={filtersRef} className="home_filters">
        <BiX onClick={()=> document.querySelector(".home_filters")?.classList.remove("home_filters-open")} className='home_filters-close' />
        <h3>Filters</h3>
        <div className="home_filter-drop filter-drop-1 drop-open">
          <div onClick={()=> document.querySelector(".filter-drop-1")?.classList.toggle("drop-open")} className="home_filter-drop-title">
            <p>Price</p>
            <BiChevronDown className='bx-chevron-down' />
          </div>
          <PriceFilter filters={filters} setFilters={setFilters} limits={{min: Math.min(...products.map(m=> parseInt(m.price))), max: Math.max(...products.map(m=> parseInt(m.price)))}} />
        </div>
        <div className="home_filter-drop filter-drop-2 drop-open">
          <div onClick={()=> document.querySelector(".filter-drop-2")?.classList.toggle("drop-open")} className="home_filter-drop-title">
            <p>Category</p>
            <BiChevronDown className='bx-chevron-down' />
          </div>
          <CategoryFilter filters={filters} setFilters={setFilters} />
        </div>
      </aside>
      <section className="home_container">
        <div className="home_container-search">
          <SearchProduct products={productsFilter.length >0 ? productsFilter : products} />
          <div className="home_container-filters">
            <p onClick={openFilters}>
              <BiFilter /> <span>Filters</span>
            </p>
          </div>
        </div>
        <div className="home_container-cards">
          {loader ? <Loader /> : (productsFilter.length >0 ? productsFilter : products)?.map((product) => <CardProduct key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  )
}