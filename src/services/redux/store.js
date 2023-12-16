import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './slices/location.slice'

const store = configureStore({
    reducer: {
        [locationSlice.name]: locationSlice.reducer
    },
})

export default store
