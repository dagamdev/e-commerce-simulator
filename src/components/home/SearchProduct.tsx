import { ChangeEvent, FormEvent, useState } from 'react'
import { Product, Suggestion } from '../../types'
import { ProductSuggestion } from './ProductSuggestion'
import { useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'

export const SearchProduct = ({products}: {products: Product[]|undefined})=> {
  const [suggestions, setSuggestions] = useState<Suggestion[]|undefined>(undefined)
  const navigate = useNavigate()

  function inputChange({target: {value}}: ChangeEvent<HTMLInputElement>){
    const infoSearch = document.querySelector(".home_container-form")
    const text = value.toLowerCase()
    if(text){
      const productsFilter = products?.filter(f=> f.title.toLowerCase().startsWith(text)).length == 0 ? products?.filter(f=> f.title.toLowerCase().includes(text)) : products?.filter(f=> f.title.toLowerCase().startsWith(text))
      setSuggestions(productsFilter?.map(m=> {
        let tlc = m.title.toLowerCase()
        let indS = tlc.split(text)[0].length, indE = tlc.split(text).length >2 ? tlc.length - tlc.replace(text, "").length : tlc.length - tlc.split(text).filter((f,i)=> i>0).join("").length
        return {start: tlc.startsWith(text) ? "" : m.title.slice(0, indS), span: m.title.slice(indS, indE), end: m.title.slice(indE, tlc.length), id: m.id}
      }))
      infoSearch?.classList.add("search-active")
    }else infoSearch?.classList.remove("search-active")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const text = event.currentTarget.text.value.toLowerCase()
    const productsFilter = products?.filter(f=> f.title.toLowerCase().startsWith(text)).length == 0 ? products?.filter(f=> f.title.toLowerCase().includes(text)) : products?.filter(f=> f.title.toLowerCase().startsWith(text))
    if(productsFilter) navigate("/product/"+productsFilter[0].id)
  }
  // console.log(suggestions)
  
  return (
    <form onSubmit={handleSubmit} className='home_container-form' >
      <input onChange={inputChange} className='home_container-input' id='text' name='text' type="text" placeholder='What are you looking for?' autoComplete="off" />
      <div className="home_container-suggestions">
        {suggestions?.map(sugg=> sugg && <ProductSuggestion key={sugg.id} suggestion={sugg} />)}
      </div>
      <button className='home_container-btn'>
        <BiSearch /> <span>Search</span>
      </button>
    </form>
  )
}