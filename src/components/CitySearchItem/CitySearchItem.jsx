import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MapPinIcon, PlusIcon } from 'react-native-heroicons/solid'

const CitySearchItem = ({ location, borderClass }) => {
    const handleLocation = (loc) => {
        navigation.navigate('daily-detail-screen')
    }
    return (
        <TouchableOpacity
            onPress={() => handleLocation(location)}
            className={
                'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass
            }
        >
            <MapPinIcon size="20" color="gray" />
            <Text className="text-black text-lg ml-2">
                {location?.name}, {location?.country}
            </Text>
            <PlusIcon size="20" color="black"/>
        </TouchableOpacity>
    )
}

export default CitySearchItem
