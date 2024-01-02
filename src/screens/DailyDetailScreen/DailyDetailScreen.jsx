import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { WEATHER_ICON } from '~/configs/image'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import clsx from 'clsx'
import { fetchForecast } from '~/services/axios/actions/forecast.action'
import { LoadingScreen } from '~/components/EmptyScreen'

export default function DailyDetailScreen({ route, navigation }) {
    const { data, location } = route.params
    const [daily, setDaily] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchDaily = async () => {
        try {
            setIsLoading(true)
            const res = await fetchForecast(location.url)
            const data = [...res.history, ...res.daily]
            setDaily(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (location && location !== '') {
            fetchDaily()
        } else {
            setDaily(data)
        }
    }, [location])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View className="flex-1">
            <FlatList
                horizontal
                data={daily}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <DailyItem
                        day={item.day}
                        date={item.date}
                        icon={WEATHER_ICON[item.condition.text]}
                        max={item.maxtemp_c}
                        min={item.mintemp_c}
                        maxwind_kph={item.maxwind_kph}
                        highlight={item.day === 'Hôm nay'}
                    />
                )}
            />
        </View>
    )
}

function DailyItem({
    day,
    date,
    icon,
    max,
    min,
    maxwind_kph,
    highlight = false,
}) {
    return (
        <View
            className={clsx('p-4 items-center', {
                'bg-primary': highlight,
            })}
        >
            <Text className="text-lg">{day}</Text>
            <Text className="text-base mb-4">{date}</Text>
            <Image className="h-14 aspect-square" source={icon} />

            <View className="my-10 flex items-center">
                <Text className="text-lg font-bold text-[#ff5b3b] mb-2">
                    {max}&#176;C
                </Text>
                <FontAwesome5 name="temperature-high" size={38} color="black" />
                <Text className="text-lg font-bold text-[#00689c] mt-2">
                    {min}&#176;C
                </Text>
            </View>
            <View className="flex-row items-center mt-2">
                <Entypo name="direction" size={24} color="black" />
                <Text className="text-lg">{maxwind_kph}km/h</Text>
            </View>
        </View>
    )
}
