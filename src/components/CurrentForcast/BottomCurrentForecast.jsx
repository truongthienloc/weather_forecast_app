import { View, Text } from 'react-native'
import React from 'react'
import { WIND_DIRECTION } from '~/configs/image'

export default function BottomCurrentForecast({ data }) {
    return (
        <View className='flex-row gap-2'>
            <View className='flex-1'>
                <View className='flex-1 bg-primary mb-2 rounded-xl'>
                    <View className='flex-1 justify-center gap-1 p-2'>
                        <Text className='text-base text-white'>{WIND_DIRECTION[data.wind_dir]}</Text>
                        <Text className='text-base text-white'>{data.wind_kph}km/h</Text>
                    </View>
                </View>

                <View className='flex-1 justify-center bg-primary p-2 rounded-xl'>
                    <View className='flex-row gap-1 mb-1'>
                        <Text className='text-base text-white'>{data.astro.sunrise}</Text>
                        <Text className='text-base text-[#ffffff80]'>Bình minh</Text>
                    </View>
                    <View className='flex-row gap-1'>
                        <Text className='text-base text-white'>{data.astro.sunset}</Text>
                        <Text className='text-base text-[#ffffff80]'>Hoàng hôn</Text>
                    </View>
                </View>
            </View>

            <View className='flex-1 bg-primary p-2 rounded-xl'>
                <View className=''>
                    <CurrentItem
                        label='Độ ẩm'
                        value={`${data.humidity}%`}
                    />
                    <CurrentItem
                        label='Cảm giác như'
                        value={`${data.feelslike_c}\u00B0`}
                    />
                    <CurrentItem
                        label='UV'
                        value={`${data.uv}`}
                    />
                    <CurrentItem
                        label='Áp suất'
                        value={`${data.pressure_mb}mbar`}
                    />
                    <CurrentItem
                        label='Có thể mưa'
                        value={`${data.chance_of_rain}%`}
                    />
                </View>
            </View>
        </View>
    )
}

function CurrentItem({ label, value }) {
    return (
        <View className='flex-row border-b border-[#ffffff50] mb-2 py-1'>
            <Text className='text-base text-[#ffffff80] mr-auto'>{label}</Text>
            <Text className='text-base text-white'>{value}</Text>
        </View>
    )
}
