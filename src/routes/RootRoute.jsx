import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CitiesScreen } from '~/screens/CitiesScreen'
import { MainScreen } from '~/screens/MainScreen'
import { SettingScreen } from '~/screens/SettingScreen'

const Stack = createNativeStackNavigator()

export default function RootRoute() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="main-screen" component={MainScreen} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="setting-screen" component={SettingScreen} />
            <Stack.Screen name="cities-screen" component={CitiesScreen} />
        </Stack.Navigator>
    )
}
