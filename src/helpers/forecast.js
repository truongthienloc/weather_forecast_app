import dayjs from 'dayjs'
import { convertDate2Day } from './date'
import { DAY } from '~/configs/time.constant'

export function getItemForCurrent(data) {
    const current = data.current
    const hour = data.forecast.forecastday[0].hour.find(
        (value) => new Date(value.time) - new Date(current.last_updated) > 0,
    )
    const day = data.forecast.forecastday[0].day
    const astro = data.forecast.forecastday[0].astro

    console.log('hour: ', data.forecast.forecastday[0].hour);

    return {
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        condition: {
            text: current.condition.text,
        },
        wind_kph: current.wind_kph,
        wind_degree: current.wind_degree,
        wind_dir: current.wind_dir,
        pressure_mb: current.pressure_mb,
        humidity: current.humidity,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        uv: current.uv,
        chance_of_rain: hour.chance_of_rain,
        maxtemp_c: day.maxtemp_c,
        mintemp_c: day.mintemp_c,
        astro: {
            sunrise: astro.sunrise,
            sunset: astro.sunset,
        },
    }
}

export function getItemsForDaily(data, curr) {
    // console.log('curr: ', curr);
    const current = curr ?? data.current
    const forecastDay = data.forecast.forecastday

    const printDay = (date) => {
        const now = dayjs(new Date(current.last_updated)).format('YYYY-MM-DD')
        if (date === now) {
            return 'Hôm nay'
        } else if (new Date(date) - new Date(now) === DAY) {
            return 'Ngày mai'
        } else if (new Date(date) - new Date(now) === -DAY) {
            return 'Hôm qua'
        } else {
            return convertDate2Day(date)
        }
    }

    return forecastDay.map((fore, index) => {
        return {
            day: printDay(fore.date, index),
            date: dayjs(fore.date).format('DD/MM'),
            maxtemp_c: fore.day.maxtemp_c,
            maxtemp_f: fore.day.maxtemp_f,
            mintemp_c: fore.day.mintemp_c,
            mintemp_f: fore.day.mintemp_f,
            condition: {
                text: fore.day.condition.text,
            },
            maxwind_kph: fore.day.maxwind_kph,
        }
    })
}

export function getItemsForHourly(data) {
    const hour = data.forecast.forecastday[0].hour

    return hour.map((fore) => {
        return {
            time: fore.time,
            temp_c: fore.temp_c,
            temp_f: fore.temp_f,
            condition: {
                text: fore.condition.text,
                icon: fore.condition.icon,
            },
            wind_kph: fore.wind_kph,
            is_day: fore.is_day,
        }
    })
}

export function filterForecast(data) {
    const current = getItemForCurrent(data)
    // console.log('current: ', current);
    const daily = getItemsForDaily(data)
    // console.log('daily: ', daily);
    const hourly = getItemsForHourly(data)
    // console.log('hourly: ', hourly);
    const location = data.location

    return {
        current,
        daily,
        hourly,
        location,
    }
}
