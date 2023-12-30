import { useNavigation } from '@react-navigation/native'
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from 'lodash'
import { theme } from '../../theme'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import {
    fetchLocations,
    fetchWeatherForecast,
} from '../../services/axios/weather'
import { SearchBar } from '@rneui/themed'
import { CityItem } from '~/components/CityItem'
import { StatusBar } from 'expo-status-bar'
import { locationSelector } from '~/services/redux/selectors/location.selector'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import citiesSlice, { initValue } from '~/services/redux/slices/cities.slice'

const CitiesScreen = () => {
    const navigation = useNavigation()
    const location = useSelector(locationSelector)
    const [locations, setlocations] = useState([])
    const [search, setSearch] = useState()
    const dispatch = useDispatch()
    const Cities = useSelector(state => state.citiesSlice.citiesList)
    const navigateSearch = () => {
        navigation.navigate('search-screen')
    }
    useEffect(() => {
        const getCitiesListFromAsyncStorage = async () => {
            try {
                const storedCitiesList =
                    await AsyncStorage.getItem('citiesList')
                if (storedCitiesList !== null) {
                    console.log('stcl',storedCitiesList);
                    dispatch(initValue((JSON.parse(storedCitiesList))))
                }
            } catch (error) {
                console.error(
                    'Error retrieving citiesList from AsyncStorage:',
                    error,
                )
            }
        }
        getCitiesListFromAsyncStorage()
    }, [])
    console.log('city', Cities)
    return (
        <>
            <StatusBar style="light" backgroundColor="black" />
            <View>
                <View
                    style={{ height: '7%' }}
                    className="mx-4 relative z-50 my-5 "
                >
                    <View
                        className="flex-row justify-end items-center rounded-md py-2 pr-2 mb-5"
                        style={{ backgroundColor: theme.bgBlack(0.2) }}
                    >
                        <TextInput
                            onFocus={navigateSearch}
                            placeholder="Tìm kiếm thành phố..."
                            placeholderTextColor={'black'}
                            className="pl-6 h-10 pb-1 flex-1 text-base text-black"
                            // editable={false}
                        />
                        <TouchableOpacity
                            // onPress={() => toggleSearch(!rshowSearch)}
                            onPress={navigateSearch}
                            className="rounded-full p-3 m-1"
                            style={{ backgroundColor: theme.bgBlack(0.3) }}
                        >
                            <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="m-[8px]">
                    <View>
                        <CityItem
                            location={`${location.lat},${location.lon}`}
                        />
                        <FlatList
                            data={Cities}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <CityItem location={item} />
                            )}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

export default CitiesScreen
