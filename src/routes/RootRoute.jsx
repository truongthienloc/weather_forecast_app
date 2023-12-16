import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainScreen } from '~/screens/MainScreen'

const Stack = createNativeStackNavigator()

export default function RootRoute() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="main-screen" component={MainScreen} options={{
                headerShown: false
            }}/>
        </Stack.Navigator>
    )
}
