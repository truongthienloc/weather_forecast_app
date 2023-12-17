import { View, ImageBackground } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import bgImage from '@assets/images/bg.png'
import { MainHead } from '~/components/MainHead'
import { useSelector } from 'react-redux'
import { locationSelector } from '~/services/redux/selectors/location.selector'

export default function MainLayout({ children }) {
    const location = useSelector(locationSelector)

    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <ImageBackground
                className="absolute w-full h-full"
                source={bgImage}
                blurRadius={70}
            />
            <MainHead city={location.city} />
            {children}
        </View>
    )
}
