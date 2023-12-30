import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    citiesList: [],
}

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        increasement: (state, actions) => {
            let data = state.citiesList
            const isExist = data.some((item) => item?.id === actions.payload.id)
            if (isExist) {
                const citiesData = data.map((item) => {
                    if (item.id === actions.payload.id) {
                        item.quantity += 1
                    }
                    return item
                })
                state.citiesList = citiesData
                state.total += 1
                return state
            }
            return {
                ...state,
                citiesList: [...data, { ...actions.payload, quantity: 1 }],
                total: state.total + 1,
            }
        },
        deleteItem: (state, actions) => {
            let data = state.citiesList
            const item = data.find((item) => item?.id === actions.payload)
            if (!item) {
                return state
            }
            state.total -= item.quantity
            state.citiesList = data.filter((item) => item?.id !== actions.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { increasement, deleteItem } =
    citiesSlice.actions

export default citiesSlice.reducer
