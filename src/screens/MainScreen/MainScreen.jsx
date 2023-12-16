import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import bgImage from '@assets/images/bg.png'
import { MainHead } from '~/components/MainHead'
import { Entypo, AntDesign  } from '@expo/vector-icons'
import { DayForecastItem } from '~/components/DayForecastItem'
import { WEATHER_ICON, WEATHER_NAME } from '~/configs/image'

export default function MainScreen() {
    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <ImageBackground
                className="absolute w-full h-full"
                source={bgImage}
                blurRadius={70}
            />
            <MainHead city="Quận 9" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flex: 1, gap: 32, padding: 16 }}
            >
                <View className="pt-32 gap-4">
                    <View className="flex-row justify-center gap-2">
                        <Text className="text-white text-9xl">34</Text>
                        <Text className="text-white text-4xl font-bold">
                            &#176;C
                        </Text>
                    </View>
                    <Text className="text-white text-3xl text-center">
                        Quang 34&#176;/24&#176;
                    </Text>
                    <View className="flex-row justify-center">
                        <TouchableOpacity className="px-4 py-1 flex-row bg-gray-500 w-fit rounded-full  items-center opacity-80">
                            <Entypo name="leaf" size={24} color="white" />
                            <Text className="text-white text-base">
                                {' '}
                                AQI 30
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity className="w-full rounded-xl bg-primary p-4 ">
                    <View className='flex-row gap-3 items-center mb-4'>
                        <AntDesign name="calendar" size={24} color="rgb(209 213 219)" />
                        <Text className='text-gray-300 text-lg mr-auto'>Dự báo 5 ngày</Text>
                        <View className='flex-row items-center gap-1'>
                            <Text className='text-gray-300 text-base'>Thêm chi tiết</Text>
                            <AntDesign name="caretright" size={10} color="rgb(209 213 219)" />
                        </View>
                    </View>

                    <DayForecastItem
                        icon={WEATHER_ICON['Heavy rain']}
                        day={'Hôm nay'}
                        weatherName={WEATHER_NAME['Heavy rain']}
                        max={34}
                        min={24}
                    />
                    <DayForecastItem 
                        icon={WEATHER_ICON['Cloudy']}
                        day={'Ngày mai'}
                        weatherName={WEATHER_NAME['Cloudy']}
                        max={34}
                        min={24}
                    />
                    <DayForecastItem 
                        icon={WEATHER_ICON['Sunny']}
                        day={'Th 2'}
                        weatherName={WEATHER_NAME['Sunny']}
                        max={34}
                        min={24}
                    />

                    <TouchableOpacity className='py-3 mx-2 rounded-full bg-gray-500 items-center'>
                        <Text className='text-2xl text-white'>Dự báo 5 ngày</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})
