import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import * as Location from 'expo-location'

import { useSelector, useDispatch } from 'react-redux'
import {
    TopCurrentForecast,
    BottomCurrentForecast,
} from '~/components/CurrentForcast'
import { DayForecast } from '~/components/DayForecast'
import { HourForecast } from '~/components/HourForecast'
import Carousel from 'react-native-reanimated-carousel'

import { forecastSelector } from '~/services/redux/selectors/forecast.selector'
import { locationSelector } from '~/services/redux/selectors/location.selector'
import {
    fetchCitiesForecastThunk,
    fetchForecastThunk,
    forecastActions,
} from '~/services/redux/slices/forecast.slice'
import { locationActions } from '~/services/redux/slices/location.slice'
import { MainLayout } from '~/layouts/MainLayout'
import { citiesSelector } from '~/services/redux/selectors/cities.selector'

import { Entypo } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { getCurrentLocation } from '~/helpers/location'

export default function MainScreen({ navigation }) {
    const dispatch = useDispatch()
    const forecast = useSelector(forecastSelector)
    const location = useSelector(locationSelector)
    const cities = useSelector(citiesSelector)
    const [isPermissionDenied, setIsPermissionDenied] = useState(false)
    // const [cityIndex, setCityIndex] = useState(0)
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    const fetchLocation = async () => {
        if (location.isFirstLoaded) {
            return
        }

        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            setIsPermissionDenied(true)
            return
        }

        setIsPermissionDenied(false)

        const loc = await getCurrentLocation()

        dispatch(
            locationActions.setLocation({
                lat: loc.coords.latitude,
                lon: loc.coords.longitude,
            }),
        )
    }

    useEffect(() => {
        fetchLocation()
    }, [])

    useEffect(() => {
        // console.log(location.lat, location.lon)
        if (location.isLoading) {
            return
        }

        dispatch(fetchForecastThunk(`${location.lat},${location.lon}`))
        // console.log("cities: ", cities);
        dispatch(fetchCitiesForecastThunk(cities))
    }, [location])

    const handleChangeIndex = (index) => {
        // console.log("index: ", index);
        dispatch(forecastActions.setIndex(index))
    }

    const handleDailyPress = () => {
        navigation.navigate('daily-detail-screen', {
            data: [...forecast.history, ...forecast.daily],
        })
    }

    const choseForecast = useMemo(() => {
        const data = [forecast.present, ...forecast.cities]

        return data[forecast.index]
    }, [forecast.present, forecast.cities, forecast.index])

    if (isPermissionDenied && location.isLoading) {
        return (
            <MainLayout location={forecast.location}>
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
                    <TouchableOpacity className="rounded-full bg-primary items-center p-3">
                        <Text className="text-white text-2xl">
                            Tải lại vị trí hiện tại
                        </Text>
                    </TouchableOpacity>
                </View>
            </MainLayout>
        )
    }

    if (forecast.isLoading) {
        return <MainLayout location={forecast.present.location}></MainLayout>
    }

    return (
        <MainLayout location={choseForecast.location}>
            <View className="mt-[-100px] flex-row gap-1 justify-center">
                <Entypo
                    name="direction"
                    size={14}
                    color={forecast.index === 0 ? 'white' : 'gray'}
                />
                {forecast.cities.map((value, index) => (
                    <Octicons
                        key={value.location.url}
                        name="dot-fill"
                        size={14}
                        color={forecast.index === index + 1 ? 'white' : 'gray'}
                    />
                ))}
            </View>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ gap: 32, padding: 16 }}
            >
                <Carousel
                    defaultIndex={forecast.index}
                    overscrollEnabled={false}
                    width={width - 16}
                    height={height - 125}
                    data={[forecast.present, ...forecast.cities]}
                    onSnapToItem={handleChangeIndex}
                    // onProgressChange={(o, a) => handleChangeIndex(a)}
                    renderItem={({ index, item }) => (
                        <View className="mr-4" key={item.location.url}>
                            <TopCurrentForecast data={item.current} />
                            <DayForecast
                                data={item.daily}
                                onPress={handleDailyPress}
                            />
                        </View>
                    )}
                />

                <HourForecast
                    data={{
                        hour: choseForecast.hourly,
                        location: choseForecast.location,
                    }}
                />
                <BottomCurrentForecast data={choseForecast.current} />
            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({})
