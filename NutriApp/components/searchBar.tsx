import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Colors from '@/constants/colors/Colors'

interface SearchBarProps extends TextInputProps {
  onSearch: (query: string) => void;
  searchText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchText, ...otherProps }) => {

  const handleSearch = (query: string) => {
    onSearch(query);
  }

  return (
    <TextInput
      placeholder='Search'
      clearButtonMode='always'
      style={styles.searchBar}
      autoCapitalize='none'
      autoCorrect={false}
      value={searchText}
      onChangeText={handleSearch}
      {...otherProps}
    />
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchBar:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.lightgray,
    marginVertical: 10,
  }
})
