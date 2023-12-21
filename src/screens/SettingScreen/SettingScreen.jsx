import { useNavigation } from '@react-navigation/native'
import { React, useEffect } from 'react'
import { Text, View } from 'react-native'

const SettingScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: 'Cài đặt',
    })
  }, [navigation]);
  return (
    <View>
      <Text>Setting Screen</Text>
    </View>
  )
}

export default SettingScreen