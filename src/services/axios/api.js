import axios from 'axios'
import { WEATHER_API, WEATHER_API_KEY } from '@env'

const api = axios.create({
    baseURL: WEATHER_API,
    timeout: 10000,
})

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        key: WEATHER_API_KEY,
    }

    return config
})

export default api
