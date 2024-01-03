import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { FirstLoadProvider } from '~/components/FirstLoadProvider'
import { RootRoute } from '~/routes'
import { store } from '~/services/redux'

export default function App() {
    return (
        <Provider store={store}>
            <FirstLoadProvider>
                <NavigationContainer>
                    <RootRoute />
                </NavigationContainer>
            </FirstLoadProvider>
        </Provider>
    )
}
