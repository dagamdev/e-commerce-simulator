import React, {ChangeEvent, useState} from 'react'
import { Product, Suggestion } from '../../types'
import { ProductSuggestion } from './ProductSuggestion'

export const SearchProduct = ({products}: {products: Product[]|undefined})=> {
  const [suggestions, setSuggestions] = useState<Suggestion[]|undefined>(undefined)

  function inputChange({target: {value}}: ChangeEvent<HTMLInputElement>){
    const infoSearch = document.querySelector(".home_container-form")
    const text = value.toLowerCase()
    if(text){
      const productsFilter = products?.filter(f=> f.title.startsWith(text)).length == 0 ? products?.filter(f=> f.title.includes(text)) : products?.filter(f=> f.title.startsWith(text))
      setSuggestions(productsFilter?.map(m=> {
        let tlc = m.title.toLowerCase()
        let indS = tlc.split(text)[0].length, indE = tlc.split(text).length >2 ? tlc.length - tlc.replace(text, "").length : tlc.length - tlc.split(text).filter((f,i)=> i>0).join("").length
        return {start: tlc.startsWith(text) ? "" : m.title.slice(0, indS), span: m.title.slice(indS, indE), end: m.title.slice(indE, tlc.length), id: m.id}
      }))
      infoSearch?.classList.add("search-active")
    }else infoSearch?.classList.remove("search-active")
  }
  // console.log(suggestions)
  
  return (
    <form className='home_container-form' >
      <input onChange={inputChange} className='home_container-input' id='text' name='text' type="text" placeholder='What are you looking for?' autoComplete="off" />
      <div className="home_container-suggestions">
        {suggestions?.map(sugg=> sugg && <ProductSuggestion key={sugg.id} suggestion={sugg} />)}
      </div>
      <button className='home_container-btn'>
        <i className='bx bx-search'></i> <span>Search</span>
      </button>
    </form>
  )
}