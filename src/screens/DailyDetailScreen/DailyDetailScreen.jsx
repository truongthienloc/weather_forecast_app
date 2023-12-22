import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { WEATHER_ICON } from '~/configs/image'
import { FontAwesome5, Entypo } from '@expo/vector-icons'
import clsx from 'clsx'

export default function DailyDetailScreen({ route, navigation }) {
    const { data } = route.params
    // console.log('data: ', data);
    return (
        <View className="flex-1">
            <FlatList
                horizontal
                data={data}
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
