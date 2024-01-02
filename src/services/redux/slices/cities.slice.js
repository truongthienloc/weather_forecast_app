import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    citiesList: [],
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
})

// Action creators are generated for each case reducer function
export const { initValue, addCity, removeCity } = citiesSlice.actions

export default citiesSlice.reducer
