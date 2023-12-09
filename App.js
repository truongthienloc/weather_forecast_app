import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '~/services/redux';

export default function App() {
    return (
        <Provider store={store}>

        </Provider>
    );
}


