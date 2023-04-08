import {AnyAction, createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit"
import { ThunkAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { endPoint } from "../../utils/config"
import { Toast } from "../../types"

export const toastsSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    createToast: (state: Toast[], action: PayloadAction<Toast>)=> {
      state.push(action.payload)
    },
    deleteToast: (state: Toast[], action: PayloadAction<string>) => {
      state.splice(state.findIndex(t=> t.id == action.payload), 1)
    }
  }
})

export const { createToast, deleteToast } = toastsSlice.actions
export default toastsSlice.reducer