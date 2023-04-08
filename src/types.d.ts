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
  images: {
    id: number
    url: string
  }[]
}

export interface ProductPurchase {
  id: number
  brand: string 
  categoryId: number
  createdAt: string
  description: string
  images: {
    id: number,
    url: string
  }[]
  price: string
  title: string
  updatedAt: string
}

export interface Purchase {
  id: number
  createdAt: string 
  product: ProductPurchase
  productId: number
  quantity: number
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

export interface Toast {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  time: number
  content: string
}

export interface LocalData {
  user: {
    firstName: string
    lastName: string
    token: string
    img: string
  }
}