import { convertDate2Day } from './date'

export function getItemForCurrent(data) {
    const now = new Date()
    const current = data.current
    const hour = data.forecast.forecastday[0].hour.find(
        (value) => new Date(value.time) - now > 0,
    )
    const day = data.forecast.forecastday[0].day

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
    }
}

export function getItemsForDaily(data) {
    const forecastDay = data.forecast.forecastday

    const printDay = (date, index) => {
        if (index === 0) {
            return 'Hôm nay'
        } else if (index === 1) {
            return 'Ngày mai'
        } else {
            return convertDate2Day(date)
        }
    }

    return forecastDay.map((fore, index) => {
        return {
            date: printDay(fore.date, index),
            maxtemp_c: fore.day.maxtemp_c,
            maxtemp_f: fore.day.maxtemp_f,
            mintemp_c: fore.day.mintemp_c,
            mintemp_f: fore.day.mintemp_f,
            condition: {
                text: fore.day.condition.text,
            },
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
    const daily = getItemsForDaily(data)
    const hourly = getItemsForHourly(data)
    const location = data.location

    return {
        current,
        daily,
        hourly,
        location,
    }
}
