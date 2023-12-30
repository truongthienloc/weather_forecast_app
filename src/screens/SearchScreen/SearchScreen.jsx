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

const SearchScreen = () => {
    const navigation = useNavigation()
    const location = useSelector(locationSelector)
    const [locations, setlocations] = useState([])
    const handleSearch = (search) => {
        if (search && search.length > 2)
            fetchLocations({ cityName: search }).then((data) => {
                setlocations(data)
            })
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
    useEffect(() => {
        navigation.setOptions({
            title: 'Tìm kiếm',
        })
    }, [navigation])
    return (
        <View>
            <StatusBar style="light" backgroundColor="black" />
            <View style={{ height: '100%' }} className="mx-4 mt-14 mb-10 ">
                <View
                    className="flex-row justify-end items-center rounded-md py-2 px-3 mb-5"
                    style={{ backgroundColor: theme.bgBlack(0.2) }}
                >
                    <MagnifyingGlassIcon size="25" color="black" />
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder="Tìm kiếm thành phố..."
                        placeholderTextColor={'black'}
                        className="pl-4 h-10 pb-1 flex-1 text-base text-black"
                        autoFocus={true}
                    />
                </View>
            </View>
            {/* SearchItem  */}
                {/* {locations.length > 0 && showSearch ? (
                        <View className="absolute w-full bg-gray-300 top-16 rounded-md ">
                            {locations.map((loc, index) => {
                                let showBorder = index + 1 != locations.length
                                let borderClass = showBorder
                                    ? ' border-b-2 border-b-gray-400'
                                    : ''
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleLocation(loc)}
                                        className={
                                            'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                                            borderClass
                                        }
                                    >
                                        <MapPinIcon size="20" color="gray" />
                                        <Text className="text-black text-lg ml-2">
                                            {loc?.name}, {loc?.country}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    ) : null} */}
        </View>
    )
}

export default SearchScreen
