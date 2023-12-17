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

import { useSelector, useDispatch } from 'react-redux'
import { TopCurrentForecast } from '~/components/CurrentForcast'
import { DayForecast } from '~/components/DayForecast'
import { HourForecast } from '~/components/HourForecast'

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
        console.log(location.lat, location.lon)
        if (location.isLoading) {
            return
        }

        dispatch(fetchForecastThunk(`${location.lat},${location.lon}`))
    }, [location])

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
                contentContainerStyle={{ gap: 32, padding: 16 }}
            >
                <TopCurrentForecast data={forecast.current} />
                <DayForecast data={forecast.daily} />
                <HourForecast data={forecast.hourly} />
            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})
