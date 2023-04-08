import { Product, Purchase } from '../../types'

export const PurchaseCard = ({purchase}: {purchase: Purchase})=> {
  const title = new Date(purchase.createdAt).toLocaleString()

  return (
    <article className='purchase_card'>
      <div className="purchase_card-title">
        <p>{title}</p>
      </div>
      <div className='purchase_card-product'>
        <div className='purchase_card-product-imagen'>
          <img className='purchase_card-product-img' src={purchase.product.images[0].url} alt={purchase.product.title} />
        </div>
        <div className='purchase_card-product-details'>
          <div className='purchase_card-product-section one'>
            <p className="purchase_element-title">{purchase.product.brand}</p>
            <p className="purchase_element-content">{purchase.product.title}</p>
          </div>

          <div className='purchase_card-product-group'>
            <div className='purchase_card-product-section'>
              <p className='purchase_element-title'>Quantity</p>
              <p className='purchase_element-content'>{purchase.quantity}</p>
            </div>
            <div className='purchase_card-product-section'>
              <p className='purchase_element-title'>Total</p>
              <p className='purchase_element-content'>$ {(parseInt(purchase.product.price) * purchase.quantity).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}