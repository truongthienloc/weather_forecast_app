import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { MapPin } from 'lucide-react-native'
import cloudy from '../../../assets/backgrounds/citiItem/cloudy.jpg'
import hot from '../../../assets/backgrounds/citiItem/hot.jpg'
import rainy from '../../../assets/backgrounds/citiItem/rainy.jpg'
import snowy from '../../../assets/backgrounds/citiItem/snowy.png'
import sunny from '../../../assets/backgrounds/citiItem/sunny.jpg'

const imgCondition = {
    cloudy, hot, rainy, snowy, sunny
}
const CityItem = ({location, condition}) => {
    const [Condition, setCondition] = useState('');
    const city = {
        name: '',
        curTemperature: '',
        lowestTemperature: '',
        highestTemperature: '',
        AQI: '',
    }
    // setCities([...Cities,city])
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={imgCondition[condition]} blurRadius={1}>
                <View style={styles.itemContainer}>

                    <View style={styles.left}>
                        <View style={styles.flexrow}>
                            <Text style={styles.location}>{location}</Text>
                            <MapPin color="black" />
                        </View>
                        <View style={styles.parameter}>
                            <Text>AQI 31</Text>
                            <View style={styles.flexrow}>
                                <Text>30°</Text>
                                <Text>/</Text>
                                <Text>24°</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.right}>
                        <Text style={styles.temperature}>26°C</Text>
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
    background: {
        opacity: 1,
    },
    itemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexcol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    parameter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    location: {
        fontSize: 36,
    },
    temperature: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
    },
})
