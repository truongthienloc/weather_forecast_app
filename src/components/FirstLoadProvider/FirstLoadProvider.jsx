import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCities } from '~/services/redux/slices/cities.slice'

export default function FirstLoadProvider({ children }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCities())
    }, [])

    return children
}
