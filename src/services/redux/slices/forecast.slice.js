import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fakeData } from '~/configs/fakeData'
import { filterForecast } from '~/helpers/forecast'
import { api } from '~/services/axios'

const initialState = {
    daily: [],
    history: [],
    hourly: [],
    current: {},
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
            // const res = await api.get('/forecast.json', {
            //     params: {
            //         q: query,
            //         days: 3,
            //         aqi: 'no',
            //         alerts: 'no',
            //     }
            // })

            // const data = filterForecast(res.data)

            const data = filterForecast(fakeData)

            return data
        } catch (error) {
            console.log(error)
        }
    },
)
