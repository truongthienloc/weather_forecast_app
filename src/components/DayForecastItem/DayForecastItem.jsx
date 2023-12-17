import { View, Text, Image } from 'react-native'
import React from 'react'

export default function DayForecastItem({ icon, day, weatherName, max, min }) {
    return (
        <View className="flex-row gap-3 items-center mb-4">
            <Image className="w-6 aspect-square" source={icon} />
            <Text className="text-lg text-white">{day}</Text>
            <Text className="text-lg text-white flex-1">{weatherName}</Text>
            <Text className="text-base text-white">
                {max}&#176; / {min}&#176;
            </Text>
        </View>
    )
}
