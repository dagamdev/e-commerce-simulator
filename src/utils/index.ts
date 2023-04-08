import { LocalData } from "../types"

export const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getLocalData = (): LocalData | undefined => {
  const localData = localStorage.getItem('e-commerce')
  return localData ? JSON.parse(localData) : undefined
}
