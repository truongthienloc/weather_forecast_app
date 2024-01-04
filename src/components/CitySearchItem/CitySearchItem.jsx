import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { MapPinIcon, PlusIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { citiesSelector } from '~/services/redux/selectors/cities.selector'
import { addCity } from '~/services/redux/slices/cities.slice'
import {
    fetchCitiesForecastThunk,
    forecastActions,
} from '~/services/redux/slices/forecast.slice'

const CitySearchItem = ({ location, borderClass }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const cities = useSelector(citiesSelector)
    const handleLocation = () => {
        navigation.navigate('daily-detail-screen', { location: location })
    }
    const addCityToList = () => {
        console.log('cities',cities);
        console.log('check',cities.indexOf(location.name));
        if (!location.name) return;
        if (cities.indexOf(location.name) !== -1) {
            Alert.alert(
                'Thêm thất bại',
                `${location.name} đã tồn tại trong danh sách của bạn`,
                [
                    {
                        text: 'Ở lại',
                        style: 'cancel',
                    },
                    {
                        text: 'Về trang quản lý',
                        onPress: () => navigation.navigate('cities-screen'),
                    },
                ],
            )
        return;}
        Alert.alert(
            'Thêm thành công',
            `Đã thêm ${location.name} vào danh sách của bạn`,
            [
                {
                    text: 'Ở lại',
                    style: 'cancel',
                },
                {
                    text: 'Về trang quản lý',
                    onPress: () => navigation.navigate('cities-screen'),
                },
            ],
        )
        dispatch(addCity(location?.name))
        dispatch(
            forecastActions.addCities({ location: { name: location.name } }),
        )
        dispatch(fetchCitiesForecastThunk([...cities, location.name]))
    }
    return (
        <View>
            <TouchableOpacity
                onPress={handleLocation}
                className={
                    'flex-row items-center border-0 p-3 px-4 mb-1' + borderClass
                }
            >
                <View className="flex flex-row items-center flex-1">
                    <MapPinIcon size="20" color="gray" />
                    <Text className="text-black text-lg ml-2 w-[80%]">
                        {location?.name}, {location?.country}
                    </Text>
                </View>
                <PlusIcon size="20" color="black" onPress={addCityToList} />
            </TouchableOpacity>
        </View>
    )
}

export default CitySearchItem
