import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchForecast } from '~/services/axios/actions/forecast.action'

const initialState = {
    daily: [],
    history: [],
    hourly: [],
    current: {},
    location: {},
    isLoading: true,
}

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setDaily(state, action) {
            state.daily = action.payload
        },
        setHistory(state, action) {
            state.current = action.payload
        },
        setHourly(state, action) {
            state.hourly = action.payload
        },
        setCurrent(state, action) {
            state.current = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecastThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchForecastThunk.fulfilled, (state, action) => {
                state.current = action.payload.current
                state.daily = action.payload.daily
                state.hourly = action.payload.hourly
                state.location = action.payload.location
                state.history = action.payload.history
                state.isLoading = false
            })
    },
})

export default forecastSlice
export const forecastActions = forecastSlice.actions

export const fetchForecastThunk = createAsyncThunk(
    'forecast/fetching',
    async (query) => {
        try {
            return await fetchForecast(query)
        } catch (error) {
            console.log(error)
        }
    },
)
