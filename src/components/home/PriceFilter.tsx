import React, { Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import { Filters } from '../../types'

interface PriceFilterType {
  filters: Filters 
  setFilters: Dispatch<SetStateAction<Filters>>
  limits: {min: number, max: number}
}

export const PriceFilter = ({filters, setFilters, limits}: PriceFilterType)=> {
  const fromInput = useRef<HTMLInputElement>(null)
  const toInput = useRef<HTMLInputElement>(null)

  function setFilterPrice(evetn: FormEvent){
    evetn.preventDefault()
    if(fromInput.current && toInput.current) {
      setFilters({from: parseInt(fromInput.current.value), to: parseInt(toInput.current.value), category: filters.category})
      fromInput.current.placeholder = fromInput.current.value
      toInput.current.placeholder = toInput.current.value

      fromInput.current.value = ''
      toInput.current.value = ''

    }
  }

  return (
    <form onSubmit={setFilterPrice} className="price_filter">
      <div className='price_filter-div'>
        <label htmlFor="from">From</label>
        <input ref={fromInput} type="number" id='from' min={1} max={limits.max} placeholder='From price' required />
      </div>
      <div className='price_filter-div'>
        <label htmlFor="to">To</label>
        <input ref={toInput} type="number" id='to' min={limits.min} max={limits.max} placeholder='To price' required />
      </div>
      <button className='price_filter-btn'>Filter price</button>
    </form>
  )
}