import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import couterReducer from './couterSlice'

export const store = configureStore({
    reducer: {
        userReducer,
        couterReducer
    }
})