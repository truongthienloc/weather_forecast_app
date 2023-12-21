import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { SearchBar } from '@rneui/themed'
import { CityItem } from '~/components/CityItem'
import { StatusBar } from 'expo-status-bar'

const CitiesScreen = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState()
    const updateSearch = (search) => {
        setSearch(search)
    }

    useEffect(() => {
        navigation.setOptions({
            title: 'Quản lý thành phố',
        })
    }, [navigation])
    return (
        <>
            <StatusBar style="light" backgroundColor="black" />
            <View>
                <SearchBar
                    lightTheme="true"
                    placeholder="Tìm kiếm thành phố..."
                    onChangeText={updateSearch}
                    value={search}
                />
                <ScrollView style={styles.itemContainer}>
                  <CityItem location={'Quận 9'} condition={'sunny'}/>
                  <CityItem location={'Hà Nội'} condition={'rainy'}/>
                  <CityItem location={'London'} condition={'snowy'}/>
                  <CityItem location={'New York'} condition={'cloudy'}/>
                  <CityItem location={'Sydney'} condition={'hot'}/>
                  <CityItem location={'Quận 9'} condition={'sunny'}/>
                  <CityItem location={'Hà Nội'} condition={'rainy'}/>
                  <CityItem location={'London'} condition={'snowy'}/>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }
})

export default CitiesScreen
