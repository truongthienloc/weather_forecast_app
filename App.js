import { NavigationContainer } from '@react-navigation/native'
// import { Provider } from 'react-redux';
import { RootRoute } from '~/routes'
// import { store } from '~/services/redux';
// import testImage from '@assets/icon.png'

export default function App() {
    return (
        // <Provider store={store}>
        <NavigationContainer>
            <RootRoute />
        </NavigationContainer>
        // </Provider>
    )
}
