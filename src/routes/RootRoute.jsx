import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CitiesScreen } from '~/screens/CitiesScreen'
import { MainScreen } from '~/screens/MainScreen'
import { SettingScreen } from '~/screens/SettingScreen'
import { DailyDetailScreen } from '~/screens/DailyDetailScreen'

const Stack = createNativeStackNavigator()

export default function RootRoute() {
    return (
        <Stack.Navigator>
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
                }}
            />
            <Stack.Screen name="setting-screen" component={SettingScreen} />
            <Stack.Screen name="cities-screen" component={CitiesScreen} />
        </Stack.Navigator>
    )
}
