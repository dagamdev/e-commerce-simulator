import React, {useState, useEffect, Dispatch, SetStateAction, MouseEvent, HTMLAttributes, DetailedHTMLProps, LiHTMLAttributes} from 'react'
import { Filters } from "../../types"
import { endPoint } from '../../utils/config'
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
    fetch(endPoint+"categories").then(prom=> prom.json().then(res=> {
      setCategories(res)
    })).catch((e) => console.error(e))
  }, [])

  function selectCategory({currentTarget}: MouseEvent<HTMLElement>){
    document.querySelectorAll(".category-active").forEach(doc=> {
      doc.classList.remove("category-active")
    })
    currentTarget.classList.add("category-active")
    const categoryName = currentTarget.dataset.name
    if(categoryName == 'all') setFilters({from: null, to: null, category: currentTarget.dataset.name || null})
    else setFilters({from: filters.from, to: filters.to, category: currentTarget.dataset.name || null})
  }

  return (
    <ul className="category_filter">
      <li onClick={selectCategory} data-name={'all'}  className="category_filter-element category-active">All</li>
      {categories?.map(m=> <li onClick={selectCategory} key={m.id} data-name={m.name}  className="category_filter-element">{m.name}</li>)}
    </ul>
  )
}