import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Toast } from "../../types"

export const toastsSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    createToast: (state: Toast[], action: PayloadAction<Toast>)=> {
      state.push(action.payload)
    },
    deleteToast: (state: Toast[], action: PayloadAction<string>) => {
      const index = state.findIndex(f=> f.id == action.payload)
      if(index >= 0) state.splice(index, 1)
    }
  }
})

export const { createToast, deleteToast } = toastsSlice.actions
export default toastsSlice.reducer