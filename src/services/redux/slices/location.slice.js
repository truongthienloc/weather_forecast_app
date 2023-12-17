import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lat: null,
    lon: null,
    city: '',
    country: '',
    isLoading: true,
    isPermissionDenied: false,
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.lat = action.payload.lat
            state.lon = action.payload.lon
            state.isLoading = false
        },
    },
})

export default locationSlice
export const locationActions = locationSlice.actions
