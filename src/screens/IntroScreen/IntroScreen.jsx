import React, { useState } from 'react'

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
} from 'react-native'

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider'

export default function IntroScreen({ navigation }) {
    const onDone = () => {
        navigation.replace('main-screen')
    }
    const onSkip = () => {
        navigation.replace('main-screen')
    }

    const RenderItem = ({ item }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingBottom: 100,
                    paddingHorizontal: 16,
                }}
            >
                <Text style={styles.introTitleStyle}>{item.title}</Text>
                <Image style={styles.introImageStyle} source={item.image} />
                <Text style={styles.introTextStyle}>{item.text}</Text>
            </View>
        )
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={RenderItem}
            onDone={onDone}
            showSkipButton={true}
            onSkip={onSkip}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    titleStyle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    paragraphStyle: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    introImageStyle: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    introTextStyle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 30,
    },
    introTitleStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
    },
})

const slides = [
    {
        key: '1',
        title: 'Welcome to WeatherApp',
        text: 'Stay ahead of the weather with accurate forecasts and real-time updates. Plan your day and stay prepared!',
        image: require('@assets/images/sun.png'),
        backgroundColor: '#3498db',
    },
    {
        key: '2',
        title: 'Localized Forecasts',
        text: 'Get detailed weather information for your location. From temperature and humidity to wind speed and UV index, we cover it all.',
        image: require('@assets/images/location.png'),
        backgroundColor: '#2ecc71',
    },
    {
        key: '3',
        title: 'Stay Informed Anywhere',
        text: "Whether you're at home or traveling, WeatherApp keeps you informed. Access worldwide weather forecasts with a simple tap.",
        image: require('@assets/images/world.png'),
        backgroundColor: '#e74c3c',
    },
]
