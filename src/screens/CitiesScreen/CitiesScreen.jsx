import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from '@rneui/themed';


const CitiesScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState();

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Quản lý thành phố',
    })
  }, [navigation]);
  return (
    <View>
      <SearchBar 
          lightTheme='true' 
          placeholder="Tìm kiếm thành phố..."
          onChangeText={updateSearch}
          value={search}
      />
    </View>
  )
}

export default CitiesScreen
