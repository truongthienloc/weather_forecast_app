import { View, ImageBackground } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import bgImage from '@assets/images/bg.png'
import { weatherBackgroundImages } from '../../constants'
import { MainHead } from '~/components/MainHead'
import { useSelector } from 'react-redux'
import {
    forecastLocationSelector,
    forecastSelector,
} from '~/services/redux/selectors/forecast.selector'

export default function MainLayout({ children, location }) {
    // const location = useSelector(forecastLocationSelector)
    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <ImageBackground
                className="absolute w-full h-full"
                source={bgImage}
                // source={weatherBackgroundImages[location.condition?.text || 'other']}
                //Update background theo condition
                blurRadius={70}
            />
            <MainHead city={location?.name} />
            {children}
        </View>
    )
}
