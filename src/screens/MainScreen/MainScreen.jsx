import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { Entypo } from '@expo/vector-icons'
import { WEATHER_NAME } from '~/configs/image'
import { useSelector, useDispatch } from 'react-redux'
import { DayForecast } from '~/components/DayForecast'

import { forecastSelector } from '~/services/redux/selectors/forecast.selector'
import { locationSelector } from '~/services/redux/selectors/location.selector'
import { fetchForecastThunk } from '~/services/redux/slices/forecast.slice'
import { locationActions } from '~/services/redux/slices/location.slice'
import { MainLayout } from '~/layouts/MainLayout'

export default function MainScreen() {
    const dispatch = useDispatch()
    const forecast = useSelector(forecastSelector)
    const location = useSelector(locationSelector)
    const [isPermissionDenied, setIsPermissionDenied] = useState(false)

    useEffect(() => {
        ;(async () => {
            if (!location.isLoading) {
                return
            }

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setIsPermissionDenied(true)
                return
            }

            setIsPermissionDenied(false)

            const loc = await Location.getCurrentPositionAsync({})
            dispatch(
                locationActions.setLocation({
                    lat: loc.coords.latitude,
                    lon: loc.coords.longitude,
                }),
            )
        })()
    }, [])

    useEffect(() => {
        console.log(location.isLoading)
        if (location.isLoading) {
            return
        }

        dispatch(fetchForecastThunk(`${location.lat},${location.lon}`))
    }, [location.lat, location.lon])

    if (isPermissionDenied && location.isLoading) {
        return (
            <MainLayout>
                <View className="pt-10 gap-4 px-5">
                    <Text className="text-center text-xl text-white">
                        Không xác định được vị trí hiện tại.{'\n'}Vui lòng chọn
                        một địa điểm.
                    </Text>
                    <TouchableOpacity className="rounded-full bg-gray-500 bg-opacity-0 items-center p-3">
                        <Text className="text-white text-2xl">
                            Chọn địa điểm
                        </Text>
                    </TouchableOpacity>
                </View>
            </MainLayout>
        )
    }

    if (forecast.isLoading) {
        return <MainLayout></MainLayout>
    }

    return (
        <MainLayout>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flex: 1, gap: 32, padding: 16 }}
            >
                <View className="pt-32 gap-4">
                    <View className="flex-row justify-center gap-2">
                        <Text className="text-white text-9xl">
                            {forecast.current.temp_c}
                        </Text>
                        <Text className="text-white text-4xl font-bold">
                            &#176;C
                        </Text>
                    </View>
                    <Text className="text-white text-3xl text-center">
                        {WEATHER_NAME[forecast.current.condition.text]}{' '}
                        {forecast.current.maxtemp_c}&#176;/
                        {forecast.current.mintemp_c}&#176;
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

                <DayForecast data={forecast.daily} />
            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})
