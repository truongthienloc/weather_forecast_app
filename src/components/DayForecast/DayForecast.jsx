import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { DayForecastItem } from '../DayForecastItem'
import { WEATHER_ICON, WEATHER_NAME } from '~/configs/image'

export default function DayForecast({ data, onPress }) {
    return (
        <TouchableOpacity className="w-full rounded-xl bg-primary p-4 ">
            <View className="flex-row gap-3 items-center mb-4">
                <AntDesign name="calendar" size={24} color="rgb(209 213 219)" />
                <Text className="text-gray-300 text-lg mr-auto">
                    Dự báo 5 ngày
                </Text>
                <View className="flex-row items-center gap-1">
                    <Text className="text-gray-300 text-base">
                        Thêm chi tiết
                    </Text>
                    <AntDesign
                        name="caretright"
                        size={10}
                        color="rgb(209 213 219)"
                    />
                </View>
            </View>

            <FlatList
                scrollEnabled={false}
                data={data}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <DayForecastItem
                        icon={WEATHER_ICON[item.condition.text]}
                        day={item.date}
                        weatherName={WEATHER_NAME[item.condition.text]}
                        max={item.maxtemp_c}
                        min={item.mintemp_c}
                    />
                )}
            />

            <TouchableOpacity className="py-3 mx-2 rounded-full bg-gray-500 items-center">
                <Text className="text-2xl text-white">Dự báo 5 ngày</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
