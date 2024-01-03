import { View, Text, TouchableOpacity } from 'react-native'
import { React } from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function MainHead({ city }) {
    const navigation = useNavigation()
    const onAddPress = () => {
        navigation.navigate('cities-screen')
    }
    const onOptionPress = () => {
        navigation.navigate('setting-screen')
    }
    return (
        <View className="p-8 pb-1 fixed flex-row items-center justify-between mt-5">
            <TouchableOpacity onPress={onAddPress}>
                <AntDesign name="plus" size={32} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">{city}</Text>
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
