import { MouseEvent, useRef, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product, Purchase } from '../../types'
import { getConfig, getLocalData } from '../../utils'
import axios from "axios"
import { endPoint } from '../../utils/config'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addCart } from '../../store/slices/carts.slice'
import { BiCartAdd } from 'react-icons/bi'
import { useToasts } from '../../hooks/useToasts'

const localData = getLocalData()

export const CardProduct = ({product, setAmountProduct}: {product: Product, setAmountProduct?: Dispatch<SetStateAction<number>>})=> {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const {current} = useRef(product.id)
  const button = useRef<HTMLButtonElement>(null)
  const { createNotification } = useToasts()

  function productSelect({target}: MouseEvent<HTMLElement>){
    console.log('producto')
    if(button.current && button.current!=target && button.current.childNodes[0]!=target){
      navigate("/product/"+current)
    }

    if(setAmountProduct) setAmountProduct(1)
  }

  function addToCart(e: MouseEvent<HTMLButtonElement>){
    e.stopPropagation()
    if(localData){
      const { user: { token } } = localData
      axios.get(endPoint+'cart', getConfig(token)).then(({data: products}: {data: Purchase[]})=> {
        const prodCart = products.find(c=> c.productId == product.id)
        if(prodCart){
          axios.put(endPoint+"cart/"+prodCart.id, {
              "quantity": prodCart.quantity+1
            },
            getConfig(token)
          ).then(()=> {
            createNotification({type: 'success', content: `One more ${product.title} added to cart`})
          }).catch(err=> console.error(err))
        
        }else{
          axios.post(endPoint+"cart", {
              "productId": product.id, 
              "quantity": 1
            },
            getConfig(token)
          ).then(()=> {
            dispatch(addCart())
            createNotification({type: 'success', content: `Product ${product.title} added to cart`})
          }).catch(err=> console.error(err))
        }
      }).catch(e=> console.error(e))
    
    }else{
      createNotification({type: 'error', content: 'Log in to add the product to the cart'})
    }
  }
  
  return (
    <article onClick={productSelect} className='card-home'>
      <header className='card-home_header'>
        <img className='card-home_img' src={product.images[0].url} alt="" />
      </header>
      <div className="card-home_body">
        <h3 className='card-home_name'>{product.title}</h3>
        <section className="card-home_info">
          <div className="card-home_price">
            <h4 className="card-home_price-label">Price</h4>
            <span className='card-home_price-value'>$ {product.price}</span>
          </div>
          <button onClick={addToCart} ref={button} className='card-home_btn'>
            <BiCartAdd className='card-home_btn-icon' />
          </button>
        </section>
      </div>
    </article>
  )
}