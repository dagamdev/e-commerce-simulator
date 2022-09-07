export const getConfigPost = (body: any ,token: string) => ({
  method: 'POST',
  body: JSON.stringify(body),
  headers:{
    Authorization: `Bearer ${token}`
  }
})
