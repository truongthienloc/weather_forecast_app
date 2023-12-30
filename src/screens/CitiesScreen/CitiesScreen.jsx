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

const CitiesScreen = () => {
    const navigation = useNavigation()
    const [showSearch, toggleSearch] = useState(true)
    const location = useSelector(locationSelector)
    const [locations, setlocations] = useState([])
    const [search, setSearch] = useState()
    const [Cities, setCities] = useState([])
    const navigateSearch = () => {
        navigation.navigate('search-screen')
    }
    const handleSearch = (search) => {
        // console.log('value: ',search);
        if (search && search.length > 2)
            fetchLocations({ cityName: search }).then((data) => {
                // console.log('locations: ',data);
                setlocations(data)
            })
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
    // setCities([...Cities,city])
    useEffect(() => {
        navigation.setOptions({
            title: 'Quản lý thành phố',
        })
    }, [navigation])
    return (
        <>
            <StatusBar style="light" backgroundColor="black" />
            <View>
                {/* Maybe click vào searchbar nó nhảy qua searchScreen */}
                <View
                    style={{ height: '7%' }}
                    className="mx-4 relative z-50 my-5 "
                >
                    <View
                        className="flex-row justify-end items-center rounded-md py-2 pr-2 mb-5"
                        style={{ backgroundColor: theme.bgBlack(0.2) }}
                    >
                        <TextInput
                            onChangeText={handleTextDebounce}
                            onPressIn={navigateSearch}
                            placeholder="Tìm kiếm thành phố..."
                            placeholderTextColor={'black'}
                            className="pl-6 h-10 pb-1 flex-1 text-base text-black"
                            editable={false}
                        />
                        <TouchableOpacity
                            // onPress={() => toggleSearch(!showSearch)}
                            onPress={navigateSearch}
                            className="rounded-full p-3 m-1"
                            style={{ backgroundColor: theme.bgBlack(0.3) }}
                        >
                            <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                    {locations.length > 0 && showSearch ? (
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
                    ) : null}
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
