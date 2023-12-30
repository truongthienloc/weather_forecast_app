import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './slices/location.slice'
import forecastSlice from './slices/forecast.slice'
import citiesSlice from './slices/cities.slice'

const store = configureStore({
    reducer: {
        [locationSlice.name]: locationSlice.reducer,
        [forecastSlice.name]: forecastSlice.reducer,
        citiesSlice: citiesSlice,
    },
})

export default store
