import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as Location from 'expo-location'

import { useSelector, useDispatch } from 'react-redux'
import {
    TopCurrentForecast,
    BottomCurrentForecast,
} from '~/components/CurrentForcast'
import { DayForecast } from '~/components/DayForecast'
import { HourForecast } from '~/components/HourForecast'

import { forecastSelector } from '~/services/redux/selectors/forecast.selector'
import { locationSelector } from '~/services/redux/selectors/location.selector'
import { fetchForecastThunk } from '~/services/redux/slices/forecast.slice'
import { locationActions } from '~/services/redux/slices/location.slice'
import { MainLayout } from '~/layouts/MainLayout'

export default function MainScreen({ navigation }) {
    const dispatch = useDispatch()
    const forecast = useSelector(forecastSelector)
    const location = useSelector(locationSelector)
    const [isPermissionDenied, setIsPermissionDenied] = useState(false)

    useEffect(() => {
        ;(async () => {
            if (location.isFirstLoaded) {
                return
            }

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setIsPermissionDenied(true)
                return
            }

            setIsPermissionDenied(false)

            const loc = await Location.getCurrentPositionAsync({
                mayShowUserSettingsDialog: false,
            })
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

    const handleDailyPress = () => {
        navigation.navigate('daily-detail-screen', {
            data: [...forecast.history, ...forecast.daily],
        })
    }

    if (isPermissionDenied && location.isLoading) {
        return (
            <MainLayout>
                <View className="pt-10 gap-4 px-5">
                    <Text className="text-center text-xl text-white">
                        Không xác định được vị trí hiện tại.{'\n'}Vui lòng chọn
                        một địa điểm.
                    </Text>
                    <TouchableOpacity className="rounded-full bg-primary items-center p-3">
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
                <DayForecast data={forecast.daily} onPress={handleDailyPress} />
                <HourForecast
                    data={{
                        hour: forecast.hourly,
                        location: forecast.location,
                    }}
                />
                <BottomCurrentForecast data={forecast.current} />
            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})
