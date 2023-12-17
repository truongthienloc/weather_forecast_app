import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

export default function MainHead({ city, onAddPress, onOptionPress }) {
    return (
        <View className="p-8 fixed flex-row items-center justify-between mt-1">
            <TouchableOpacity onPress={onAddPress}>
                <AntDesign name="plus" size={32} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl">{city}</Text>
            <TouchableOpacity onPress={onOptionPress}>
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={32}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    )
}
