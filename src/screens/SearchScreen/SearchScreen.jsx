import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'


const SearchScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: 'Tìm kiếm',
        })
    }, [navigation])
    return (
        <View>
            <StatusBar style="light" backgroundColor="black" />
            <Text>SearchScreen</Text>
        </View>
    )
}

export default SearchScreen
