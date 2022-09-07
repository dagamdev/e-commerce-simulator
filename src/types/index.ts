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