import { Dispatch, SetStateAction, useState, MouseEvent } from 'react'
import { Purchase } from '../../types'
import { endPoint } from '../../utils/config'
import { useDispatch } from 'react-redux'
import { removeCart } from '../../store/slices/carts.slice'
import { BiTrash } from 'react-icons/bi'
import axios from 'axios'
import { getConfig, getLocalData } from '../../utils'
import { useToasts } from '../../hooks/useToasts'
import { useNavigate } from 'react-router-dom'

interface CartCardType {
  product: Purchase
  setTotal: Dispatch<SetStateAction<number>>
  setProducts: Dispatch<SetStateAction<Purchase[]>>
}

export const CartCard = ({product, setTotal, setProducts}: CartCardType)=> {
  const localData = getLocalData()
  const config = getConfig(localData?.user.token || '')
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(product.quantity)
  const { createNotification } = useToasts()
  const navigate = useNavigate()

  function deleteProduct(e: MouseEvent<HTMLDivElement>){
    e.stopPropagation()
    fetch(endPoint+"cart/"+product.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localData?.user.token}`
      }
    }).then(()=> {
      dispatch(removeCart())
      setTotal(t=> t-(product.quantity*parseInt(product.product.price)))
      
      fetch(endPoint+"cart", config).then(prom=> prom.json()).then((res: Purchase[])=> {
        setProducts(res)
        createNotification({type: 'warning', content: `Removed ${product.product.title} product from cart`})
      }).catch(err=> {
        console.error('Error', err)
      })
    }).catch(err=> console.error("Error",err))
  }

  const addProduct = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    axios.put(endPoint+"cart/"+product.id, {
        "quantity": amount+1
      },
      config
    ).then(()=> {
      setTotal(t=> t+parseInt(product.product.price))
      setAmount(a=> a+1)
    }).catch(err=> console.error(err))
  }

  const removeProduct = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    axios.put(endPoint+"cart/"+product.id, {
        "quantity": amount-1
      },
      config
    ).then(()=> {
      setTotal(t=> t-parseInt(product.product.price))
      setAmount(a=> a-1)
    }).catch(err=> console.error(err))
  }

  return (
    <article className='cart_card'>
      <div className="cart_card-img" onClick={()=> navigate(`/product/${product.productId}`)} >
        <img src={product.product.images[0].url} alt={product.product.brand} />
      </div>
      <div className="cart_card-info">
        <div className="cart_card-details">
          <div className='cart_card-product'>
            <p className='cart_card-brand CC_text-gray'>{product.product.brand}</p>
            <p className="cart_card-name CC_text-bold">{product.product.title}</p>
          </div>
          <div className='cart_card-buttons'>
            <button onClick={removeProduct} className={`cart_card-buttons-remove ${amount <= 1 ? 'inactive' : ''}`}>-</button>
            <button onClick={addProduct} className={`cart_card-buttons-add ${amount >= 10 ? 'inactive' : ''}`}>+</button>
          </div>
        </div>

        <div className="cart_card-last">
          <div className="card_amount">
            <p className='card_amount-title CC_text-gray'>Amount</p>
            <div className="card_amount-value CC_text-bold">
              <samp>{amount}</samp>
            </div>
          </div>
          <div className="card_total">
            <p className='card_total-title CC_text-gray'>Total</p>
            <samp className='card_total-value CC_text-bold'>{(parseInt(product.product.price) * amount).toLocaleString()}</samp>
          </div>

          <div onClick={deleteProduct} className="cart_card-trash">
            <BiTrash />
          </div>
        </div>
      </div>

    </article>
  )
}