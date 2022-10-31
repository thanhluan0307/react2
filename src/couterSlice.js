import {createSlice} from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: "couter",
    initialState:0,
    reducers: {
        upCouter: (state) => {
          return state + 1
        },
    }
})
export const {upCouter} = counterSlice.actions
export default counterSlice.reducer