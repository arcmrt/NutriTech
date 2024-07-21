import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import Spacing from '@/constants/Spacing';

const VitalsFormScreen = () => {
  const items = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formGroup}>
        <ScrollView>
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: "Select an option", value: null }}
          />
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: "Select an option", value: null }}
          />
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: "Select an option", value: null }}
          />
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: "Select an option", value: null }}
          />
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing,
  },
  formGroup: {

  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',

  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default VitalsFormScreen;
