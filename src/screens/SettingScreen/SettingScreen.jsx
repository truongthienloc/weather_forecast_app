import { useNavigation } from '@react-navigation/native'
import { React, useEffect, useRef, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    TouchableOpacity,
    BackHandler,
    Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SelectDropdown from 'react-native-select-dropdown'
import { ChevronRight, ChevronsUpDown } from 'lucide-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingScreen = () => {
    const navigation = useNavigation()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isEnabled, setisEnabled] = useState(false)
    const [isSoundEnable, setIsSoundEnable] = useState(false)
    const toggleSwitchDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }
    const toggleSwitchSound = () => {
        setIsSoundEnable(!isSoundEnable)
    }
    useEffect(() => {
        navigation.setOptions({
            title: 'Cài đặt',
        })
    }, [navigation])

    const handleResetApp = async () => {
        await AsyncStorage.clear()
        BackHandler.exitApp()
    }

    const handleResetAppPress = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                { text: 'Yes', onPress: handleResetApp },
            ],
            { cancelable: false },
        )
    }

    return (
        <>
            <StatusBar style="light" backgroundColor="black" />

            <View style={styles.container}>
                <View style={styles.div}>
                    <Text style={styles.heading}>Đơn vị</Text>
                    <TouchableOpacity style={styles.flexrow}>
                        <Text style={styles.bold}>Đơn vị nhiệt độ</Text>
                        <SelectDropdown
                            style={styles.select}
                            buttonStyle={styles.select}
                            buttonTextStyle={styles.selectText}
                            data={['°C', '°F']}
                            defaultButtonText="°C"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexrow}>
                        <Text style={styles.bold}>Đơn vị tốc đô gió</Text>
                        <SelectDropdown
                            style={styles.select}
                            buttonStyle={styles.select}
                            buttonTextStyle={styles.selectText}
                            data={[
                                'Thang sức gió Beaufort',
                                'Kilômét mỗi giờ (km/h)',
                                'Mét mỗi giây (m/s)',
                                'Dặm mỗi giờ (mph)',
                                'Knot (kn)',
                            ]}
                            defaultButtonText="Kilômét mỗi giờ (km/h)"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexrow}>
                        <Text style={styles.bold}>
                            Đơn vị áp suất khí quyển
                        </Text>
                        <SelectDropdown
                            style={styles.select}
                            buttonStyle={styles.select}
                            buttonTextStyle={styles.selectText}
                            data={[
                                'Hectopascal (hPa)',
                                'Millibar (mbar)',
                                'Milimét thủy ngân (mmHg)',
                                'Inch thủy ngân (inHg)',
                                'Khí quyển tiêu chuẩn (atm)',
                            ]}
                            defaultButtonText="Millibar (mbar)"
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                <View style={styles.div}>
                    <Text style={styles.heading}>Cài đăt khác</Text>
                    <TouchableOpacity
                        onPress={toggleSwitchDarkMode}
                        style={styles.flexrow}
                    >
                        <Text style={styles.bold}>Chế đô tối</Text>
                        <Switch
                            trackColor={{ false: 'grey', true: '#279EFF' }}
                            thumbColor={isDarkMode ? 'white' : 'white'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchDarkMode}
                            value={isDarkMode}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleSwitchSound}
                        style={styles.flexrow}
                    >
                        <Text style={styles.bold}>Hiệu ứng âm thanh</Text>
                        <Switch
                            trackColor={{ false: 'grey', true: '#279EFF' }}
                            thumbColor={isSoundEnable ? 'white' : 'white'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchSound}
                            value={isSoundEnable}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.line}></View>
                <View style={styles.div}>
                    <Text style={styles.heading}>Giới thiệu thời tiết</Text>
                    <TouchableOpacity style={styles.flexrow}>
                        <Text style={styles.bold2}>Phản hồi</Text>
                        <ChevronRight color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexrow}>
                        <Text style={styles.bold2}>
                            Điều khoản và chính sách
                        </Text>
                        <ChevronRight color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flexrow}
                        onPress={handleResetAppPress}
                    >
                        <Text style={styles.bold2}>Reset app</Text>
                        <ChevronRight color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 2,
        backgroundColor: 'grey',
        marginVertical: 20,
    },
    container: {
        // backgroundColor: 'black',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexcol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bold2: {
        fontWeight: 'bold',
        fontSize: 22,
        marginVertical: 10,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 22,
        width: 200,
        // marginLeft: 10,
    },
    heading: {
        fontSize: 20,
        paddingBottom: 10,
    },
    select: {
        // backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
    },
    selectText: {
        color: 'black',
        // textAlign: 'right'
    },
    div: {
        display: 'flex',
        flexDirection: 'col',
    },
})

export default SettingScreen
