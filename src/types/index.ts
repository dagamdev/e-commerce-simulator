export type Product = {
  id: number
  user: {
    id: number
    role: string
    email: string
    phone: string
    status: string
    lastName: string
  },
  title: string
  price: string
  status: string
  category: {
    id: number
    name: string
    status: string
  }
  description: string
  productImgs: string[]
}

export type ProductCart = {
  brand: string
  categoryId: number
  description: string 
  id: number
  price: string
  productsInCart: { 
    cartId: number
    id: number
    productId: number
    quantity: number
    status: string
  }
  quantity: number
  status: string
  title: string
  userId: number
}

export type Purchase = {
  cart: { 
    id: number
    products: ProductCart[]
    status: string
    userId: number
  }
  cartId: number
  createdAt: string
  id: number
  updatedAt: string
  userId: number
}

export type Suggestion = {
  id: number
  start: string
  span: string
  end: string
}

export type Filters = {
  from: number|null
  to: number|null
  category: string|null
}