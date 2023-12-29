import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { MapPin } from 'lucide-react-native'
import cloudy from '../../../assets/backgrounds/citiItem/cloudy.jpg'
import hot from '../../../assets/backgrounds/citiItem/hot.jpg'
import rainy from '../../../assets/backgrounds/citiItem/rainy.jpg'
import snowy from '../../../assets/backgrounds/citiItem/snowy.png'
import sunny from '../../../assets/backgrounds/citiItem/sunny.jpg'
import { api } from '~/services/axios'
import { getItemForCurrent } from '~/helpers/forecast'

const imgCondition = {
    cloudy, hot, rainy, snowy, sunny
}
const CityItem = ({location, condition}) => {
    const [Condition, setCondition] = useState('');
    const [data, setData] = useState({});
    // const city = {
    //     name: '',
    //     curTemperature: '',
    //     lowestTemperature: '',
    //     highestTemperature: '',
    //     AQI: '',
    // }
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/forecast.json', {
                params: {
                    q: location,
                    day: 1
                }
            })

            res.data
            setData(getItemForCurrent(res.data))
        }
        fetchData()
    }, []);
    // console.log('data',data);
    return (
        <View style={styles.container}>
            <ImageBackground  source={imgCondition[condition]} blurRadius={3}>
                <View className="w-full flex flex-row items-center justify-between px-5 py-5">
                    <View className="w-[50%]">
                        <View className="flex flex-row items-center">
                            <Text className="text-4xl pr-1">{location}</Text>
                            <MapPin size={'30px'} color="black" />
                        </View>
                        <View className="flex flex-row gap-5">
                            <Text>AQI 31</Text>
                            <View className="flex flex-row items-center">
                                <Text>{data.maxtemp_c}°</Text>
                                <Text>/</Text>
                                <Text>{data.mintemp_c}°</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text className="font-bold text-4xl text-white">{data.temp_c}°C</Text>
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}

export default CityItem

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 16,
        overflow: 'hidden',
    },
})
