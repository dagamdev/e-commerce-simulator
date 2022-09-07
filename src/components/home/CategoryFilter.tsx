import React, {useState, useEffect, Dispatch, SetStateAction, MouseEvent, HTMLAttributes, DetailedHTMLProps, LiHTMLAttributes} from 'react'
import {Filters} from "../../types"
interface Category {
  id: number
  name: string
  status: string
}

interface CategoryFilterType {
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
}

export const CategoryFilter = ({filters, setFilters}: CategoryFilterType)=> {
  const [categories, setCategories] = useState<Category[]|undefined>(undefined)

  useEffect(()=>{
    fetch("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories").then(prom=> prom.json().then(res=> setCategories(res.data.categories)))
  }, [])

  function selectCategory({currentTarget}: MouseEvent<HTMLElement>){
    document.querySelectorAll(".category-active").forEach(doc=> {
      doc.classList.remove("category-active")
    })
    currentTarget.classList.add("category-active")
    setFilters({from: filters.from, to: filters.to, category: currentTarget.dataset.name ? currentTarget.dataset.name : null})
  }

  return (
    <ul className="category_filter">
      {categories?.map(m=> <li onClick={selectCategory} key={m.id} data-name={m.name}  className="category_filter-element">{m.name}</li>)}
    </ul>
  )
}