import api from '../api'
import dayjs from 'dayjs'
import { fakeData } from '~/configs/fakeData'
import { fakeHistory1 } from '~/configs/fakeHistory1'
import { fakeHistory2 } from '~/configs/fakeHistory2'
import { DAY } from '~/configs/time.constant'
import { filterForecast, getItemsForDaily } from '~/helpers/forecast'

export const fetchForecast = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.get('/forecast.json', {
                params: {
                    q: query,
                    days: 3,
                    aqi: 'no',
                    alerts: 'no',
                },
            })

            const now = res.data.current.last_updated

            const res_his1 = await api.get('/history.json', {
                params: {
                    q: query,
                    dt: dayjs(new Date(now) - DAY).format('YYYY-MM-DD'),
                },
            })

            const res_his2 = await api.get('/history.json', {
                params: {
                    q: query,
                    dt: dayjs(new Date(now) - 2 * DAY).format('YYYY-MM-DD'),
                },
            })

            // console.log('res: ', res.data);
            const forecasts = filterForecast(res.data)
            const his1 = getItemsForDaily(res_his1.data, res.data.current)
            const his2 = getItemsForDaily(res_his2.data, res.data.current)

            // const forecasts = filterForecast(fakeData)
            // const his1 = getItemsForDaily(fakeHistory1)[0]
            // const his2 = getItemsForDaily(fakeHistory2)[0]

            const data = { ...forecasts, history: [his2[0], his1[0]] }

            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
