import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   tkUser: JSON.parse(localStorage.getItem('acc')) || ''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state,actions) => {
          state.tkUser = actions.payload
        },
        deleteUser : (state) => {
          state.tkUser = ''
        }
    }
})
export const {addUser,deleteUser} = userSlice.actions
export default userSlice.reducer