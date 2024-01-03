import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
    citiesList: [],
    status: 'idle',
}

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        initValue: (state, action) => {
            return {
                ...state,
                citiesList: action.payload,
            }
        },
        addCity: (state, action) => {
            try {
                console.log(action.payload)
                const citiesList = [...state.citiesList, action.payload]
                AsyncStorage.setItem('citiesList', JSON.stringify(citiesList))
                // console.log('cityList', citiesList)
                return {
                    ...state,
                    citiesList,
                }
            } catch (error) {
                console.error('Error saving citiesList to AsyncStorage:', error)
                return state
            }
        },
        removeCity: (state, action) => {
            try {
                const citiesList = [...state.citiesList].filter(
                    (c) => c !== action.payload,
                )
                AsyncStorage.setItem('citiesList', JSON.stringify(citiesList))
                return {
                    ...state,
                    citiesList,
                }
            } catch (error) {
                console.error('Error saving citiesList to AsyncStorage:', error)
                return state
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.citiesList = action.payload
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.status = 'failed'
                // state.error = action.error.message
            })
    },
})

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
    try {
        const citiesListJSON = await AsyncStorage.getItem('citiesList')
        const citiesList = JSON.parse(citiesListJSON) || []
        return citiesList
    } catch (error) {
        throw new Error(
            'Error fetching cities from AsyncStorage: ' + error.message,
        )
    }
})

// Action creators are generated for each case reducer function
export const { initValue, addCity, removeCity } = citiesSlice.actions

export default citiesSlice
