export const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})
