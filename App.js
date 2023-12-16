import { NavigationContainer } from '@react-navigation/native'
// import { Provider } from 'react-redux';
import { RootRoute } from '~/routes'
// import { store } from '~/services/redux';

export default function App() {
    return (
        // <Provider store={store}>
        <NavigationContainer>
            <RootRoute />
        </NavigationContainer>
        // </Provider>
    )
}
