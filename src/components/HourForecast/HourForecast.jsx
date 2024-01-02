import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React, { useMemo } from 'react'
import { WEATHER_ICON, WEATHER_NAME } from '~/configs/image'

export default function HourForecast({ data }) {
    const _data = useMemo(
        () =>
            data.hour.map((value) => {
                const gap =
                    (new Date(data.location.localtime) - new Date(value.time)) /
                    1000

                return {
                    ...value,
                    time: value.time.split(' ')[1],
                    isNow: gap >= 0 && gap < 3600,
                }
            }),
        [data],
    )

    return (
        <View className="">
            <FlatList
                contentContainerStyle={{
                    gap: 8,
                }}
                horizontal
                data={_data}
                keyExtractor={(item) => item.time}
                renderItem={({ item }) => (
                    <View className="items-center bg-primary w-32 rounded-2xl py-2 px-1">
                        <Text className="text-base text-white">
                            {item.isNow ? 'Bây giờ' : item.time}
                        </Text>
                        <Text className="text-base text-white mb-1">
                            {item.temp_c}&#176;C
                        </Text>
                        <Image
                            className="h-11 aspect-square mb-1"
                            source={
                                item.is_day === 1
                                    ? WEATHER_ICON[item.condition.text] ??
                                      WEATHER_ICON.other
                                    : { uri: `https:${item.condition.icon}` }
                            }
                        />
                        <Text className="text-base text-white text-center">
                            {WEATHER_NAME[item.condition.text]}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}
