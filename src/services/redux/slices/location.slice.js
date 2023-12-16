import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat: 0,
    lon: 0,
    isLoading: true,
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
            state.isLoading = false;
        }
    }
})

export default locationSlice;
export const locationActions = locationSlice.actions;