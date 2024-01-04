import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchForecast } from '~/services/axios/actions/forecast.action'

const initialState = {
    cities: [],
    present: {
        daily: [],
        history: [],
        hourly: [],
        current: {},
        location: {},
    },
    index: 0,
    isLoading: true,
}

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        addCities(state, action) {
            state.cities = [...state.cities, action.payload]
        },
        setIndex(state, action) {
            state.index = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecastThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchForecastThunk.fulfilled, (state, action) => {
                // console.log("payload: ", action.payload);
                state.present = { ...action.payload.present }
                state.cities = [...action.payload.cities]
                state.isLoading = false
            })
            .addCase(fetchCitiesForecastThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCitiesForecastThunk.fulfilled, (state, action) => {
                // Assuming the action.payload is an array of forecast data for different cities
                state.cities = action.payload
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
            const resPresent = await fetchForecast(query.present)

            const resCities = []
            for (const city of query.cities) {
                resCities.push(await fetchForecast(city))
            }

            // console.log("resPresent: ", resPresent);
            // console.log("resCities: ", resCities);

            return {
                present: resPresent,
                cities: resCities,
            }
        } catch (error) {
            console.log(error)
        }
    },
)

export const fetchCitiesForecastThunk = createAsyncThunk(
    'forecast/fetching-cities',
    async (cities) => {
        try {
            const resCities = []
            for (const city of cities) {
                resCities.push(await fetchForecast(city))
            }

            return resCities
        } catch (error) {
            console.log(error)
        }
    },
)

// export const fetchCitiesForecast
