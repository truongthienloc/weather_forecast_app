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
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CitiesScreen = () => {
    const navigation = useNavigation()
    const location = useSelector(locationSelector)
    const [locations, setlocations] = useState([])
    const [search, setSearch] = useState()
    const [Cities, setCities] = useState([])
    const navigateSearch = () => {
        navigation.navigate('search-screen')
    }
    useEffect(() => {
        navigation.setOptions({
            title: 'Quản lý thành phố',
        })
    }, [navigation])
    useEffect(() => {
        const getData = async () => {
            try {
              const res = await AsyncStorage.getItem('cities');
              if (value !== null) {
                setCities(res)
              }
            } catch (e) {
              console.log('Error: ',e)
            }
          };
        getData()
    }, []);
    console.log('location', location)
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
                <ScrollView contentContainerStyle={{ gap: 8, padding: 4 }}>
                    {/* Sửa thành flastlist */}
                    <CityItem location={`${location.lat},${location.lon}`} />
                    <CityItem location={'Paris'} condition={'sunny'} />
                    <CityItem location={'London'} condition={'snowy'} />
                    <CityItem location={'New York'} condition={'cloudy'} />
                    <CityItem location={'Sydney'} condition={'hot'} />
                    <CityItem location={'Paris'} condition={'sunny'} />
                    <CityItem location={'London'} condition={'snowy'} />
                    <CityItem location={'New York'} condition={'cloudy'} />
                    <CityItem location={'Sydney'} condition={'hot'} />
                    <CityItem location={'Paris'} condition={'sunny'} />
                    <CityItem location={'London'} condition={'snowy'} />
                    <CityItem location={'New York'} condition={'cloudy'} />
                    <CityItem location={'Sydney'} condition={'hot'} />
                </ScrollView>
                {/* <View className="flex-1">
                    <FlatList
                        horizontal
                        data={Cities}
                        keyExtractor={(item) => item.location?.name}
                        renderItem={({ item }) => (
                            <CityItem
                                location={item.location?.name}
                                condition={item.current?.condition?.text}
                            />
                        )}
                    />
                </View> */}
                {/* Cần sửa phần này */}
            </View>
        </>
    )
}

export default CitiesScreen
