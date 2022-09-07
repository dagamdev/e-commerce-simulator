import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Suggestion } from '../../types'

export const ProductSuggestion = ({suggestion}: {suggestion: Suggestion})=> {
  const navigate = useNavigate()

  return (
    <div onClick={()=> navigate("/product/"+suggestion.id)} className="home_container-suggestion">
      <p>{suggestion.start}<span>{suggestion.span}</span>{suggestion.end}</p>
    </div>
  )
}