import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CitiesScreen } from '~/screens/CitiesScreen'
import { MainScreen } from '~/screens/MainScreen'
import { SettingScreen } from '~/screens/SettingScreen'
import { DailyDetailScreen } from '~/screens/DailyDetailScreen'
import { IntroScreen } from '~/screens/IntroScreen'
import SearchScreen from '~/screens/SearchScreen/SearchScreen'

const Stack = createNativeStackNavigator()

export default function RootRoute() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="intro-screen"
                component={IntroScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="main-screen"
                component={MainScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="daily-detail-screen"
                component={DailyDetailScreen}
                options={{
                    headerTitle: 'Dự báo 5 ngày',
                    headerTitleAlign: 'center',
                    animation: 'fade_from_bottom'
                }}
            />
            <Stack.Screen
                name="setting-screen"
                component={SettingScreen}
                options={{
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="cities-screen"
                component={CitiesScreen}
                options={{
                    animation: 'slide_from_left',
                    headerTitle: 'Quản lý thành phố',
                }}
            />
            <Stack.Screen
                name="search-screen"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}
            />
        </Stack.Navigator>
    )
}
