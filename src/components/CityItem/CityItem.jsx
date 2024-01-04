import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native'
import { MapPin } from 'lucide-react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { citiItemImages } from '../../constants'
import { api } from '~/services/axios'
import { getItemForCurrent } from '~/helpers/forecast'
import { removeCity } from '~/services/redux/slices/cities.slice'
import { useDispatch, useSelector } from 'react-redux'
import { citiesSelector } from '~/services/redux/selectors/cities.selector'
import { fetchCitiesForecastThunk,forecastActions } from '~/services/redux/slices/forecast.slice'


const CityItem = ({ location, isMyLocation = false, onPress }) => {
    // const [Condition, setCondition] = useState('')
    const [showDelete, setshowDelete] = useState(false)
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const Cities = useSelector(citiesSelector)
    const handleLongPress = () => {
        setshowDelete(!showDelete)
    }
    const removeCityFromList = () => {
        dispatch(removeCity(location))
        dispatch(
            forecastActions.removeCities({ location: { name: location.name } }),
        )
        // dispatch(fetchCitiesForecastThunk([...Cities, location.name]))
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/forecast.json', {
                params: {
                    q: location,
                    day: 1,
                },
            })
            setData(getItemForCurrent(res.data))
        }
        fetchData()
    }, [])
    console.log('location',location);
    return (
        <TouchableOpacity
            style={styles.container}
            onLongPress={handleLongPress}
            onPress={onPress}
        >
            {/* <View className="flex flex-row gap-4"> */}
            <ImageBackground
                source={citiItemImages[data?.condition?.text || 'other']}
                blurRadius={100}
            >
                <View className="w-full flex flex-row items-center justify-between px-5 py-5">
                    <View className="w-[50%]">
                        <View className="flex flex-row items-center">
                            <Text className="text-2xl font-bold pr-1 text-white">
                                {data?.location_name || location}
                            </Text>
                            <MapPin size={'30px'} color="white" />
                        </View>
                        <View className="flex flex-row gap-5">
                            <Text className="text-white">AQI 31</Text>
                            <View className="flex flex-row items-center">
                                <Text className="text-white">
                                    {data.maxtemp_c}°
                                </Text>
                                <Text className="text-white">/</Text>
                                <Text className="text-white">
                                    {data.mintemp_c}°
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text className="font-bold text-4xl text-white">
                            {data.temp_c}°C
                        </Text>
                    </View>
                    {showDelete ? (
                        <TouchableOpacity
                            onPress={removeCityFromList}
                        >
                            <XMarkIcon size={'40'} color={'red'} />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default CityItem

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 16,
        overflow: 'hidden',
    },
})
