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

const CityItem = ({ location, isMyLocation = false }) => {
    const [Condition, setCondition] = useState('')
    const [showDelete, setshowDelete] = useState(false)
    const [data, setData] = useState({})
    const handleLongPress = () => {
        setshowDelete(!showDelete)
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
    return (
        <TouchableOpacity
            style={styles.container}
            onLongPress={handleLongPress}
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
                </View>
            </ImageBackground>
            {showDelete ? (
                <TouchableOpacity>
                    <XMarkIcon size={'30'} color={'red'} />
                </TouchableOpacity>
            ) : null}
            {/* </View> */}
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
