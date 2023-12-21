import { View, ImageBackground } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import bgImage from '@assets/images/bg.png'
import { MainHead } from '~/components/MainHead'
import { useSelector } from 'react-redux'
import { forecastLocationSelector } from '~/services/redux/selectors/forecast.selector'

export default function MainLayout({ children }) {
    const location = useSelector(forecastLocationSelector)

    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <ImageBackground
                className="absolute w-full h-full"
                source={bgImage}
                blurRadius={70}
            />
            <MainHead city={location.name} />
            {children}
        </View>
    )
}
