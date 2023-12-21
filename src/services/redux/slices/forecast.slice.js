import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { fakeData } from '~/configs/fakeData'
import { fakeHistory1 } from '~/configs/fakeHistory1'
import { fakeHistory2 } from '~/configs/fakeHistory2'
import { DAY } from '~/configs/time.constant'
import { filterForecast, getItemsForDaily } from '~/helpers/forecast'
import { api } from '~/services/axios'

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
            // const res = await api.get('/forecast.json', {
            //     params: {
            //         q: query,
            //         days: 3,
            //         aqi: 'no',
            //         alerts: 'no',
            //     }
            // })

            // const res_his1 = await api.get('/history.json', {
            //     params: {
            //         q: query,
            //         dt: dayjs((new Date) - DAY).format('YYYY-MM-DD')
            //     }
            // })

            // const res_his2 = await api.get('/history.json', {
            //     params: {
            //         q: query,
            //         dt: dayjs((new Date) - 2 * DAY).format('YYYY-MM-DD')
            //     }
            // })

            // const forecasts = filterForecast(res.data)
            // const his1 = getItemsForDaily(res_his1.data)
            // const his2 = getItemsForDaily(res_his2.data)

            const forecasts = filterForecast(fakeData)
            const his1 = getItemsForDaily(fakeHistory1)[0]
            const his2 = getItemsForDaily(fakeHistory2)[0]

            const data = { ...forecasts, history: [his2, his1] }

            return data
        } catch (error) {
            console.log(error)
        }
    },
)
