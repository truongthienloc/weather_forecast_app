import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './slices/location.slice'
import forecastSlice from './slices/forecast.slice'

const store = configureStore({
    reducer: {
        [locationSlice.name]: locationSlice.reducer,
        [forecastSlice.name]: forecastSlice.reducer,
    },
})

export default store
