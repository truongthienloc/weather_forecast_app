import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { WEATHER_NAME } from '~/configs/image'

export default function TopCurrentForecast({ data }) {
    return (
        <View className="pt-32 gap-4">
            <View className="flex-row justify-center gap-2">
                <Text className="text-white text-9xl">{data.temp_c}</Text>
                <Text className="text-white text-4xl font-bold">&#176;C</Text>
            </View>
            <Text className="text-white text-3xl text-center">
                {WEATHER_NAME[data.condition.text]} {data.maxtemp_c}&#176;/
                {data.mintemp_c}&#176;
            </Text>
            <View className="flex-row justify-center">
                <TouchableOpacity className="px-4 py-1 flex-row bg-gray-500 w-fit rounded-full  items-center opacity-80">
                    <Entypo name="leaf" size={24} color="white" />
                    <Text className="text-white text-base"> AQI 30</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
