import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import Spacing from '@/constants/Spacing';
import { fetchUserAttributes } from '@aws-amplify/auth';

const VitalsFormScreen = () => {
  const [userName, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [intolerances, setIntolerances] = useState([]);
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [diet, setDiet] = useState([]);
  
  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  useEffect(() => {
    // Convert weight and height to numerical values
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Check for valid inputs
    if (weightNum > 0 && heightNum > 0) {
      // Convert height from centimeters to meters
      const heightInMeters = heightNum / 100;

      // Calculate BMI
      const bmiValue = weightNum / (heightInMeters ** 2);

      // Round BMI to two decimal places and update state
      setBmi(bmiValue.toFixed(1));
    } else {
      setBmi(null);
    }
  }, [weight, height]);

  const currentAuthenticatedUser = async () => {
    try {
      const user = await fetchUserAttributes();
      const username = user.name;
      setUsername(username);
      console.log(`The username: ${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  const intoleranceItems = [
    { label: 'Egg', value: 'Egg' },
    { label: 'Soy', value: 'Soy' },
    { label: 'Gluten', value: 'Gluten' },
    { label: 'Wheat', value: 'Wheat' },
    { label: 'Sesame', value: 'Sesame' },
  ];

  const dietItems = [
    { label: 'Gluten Free', value: 'Gluten Free' },
    { label: 'Ketogenic', value: 'Ketogenic' },
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
    { label: 'Pescetarian', value: 'Pescetarian' },
  ];

  const chronicDiseasesItems = [
    { label: 'Asthma', value: 'Asthma' },
    { label: 'Hypertension', value: 'Hypertension' },
  ];

  const handleAddIntolerance = (value: any) => {
    if (value && !intolerances.includes(value)) {
      setIntolerances([...intolerances, value]);
    }
  };

  const handleRemoveIntolerance = (value: never) => {
    setIntolerances(intolerances.filter(item => item !== value));
  };

  const handleAddChronicDisease = (value: any) => {
    if (value && !chronicDiseases.includes(value)) {
      setChronicDiseases([...chronicDiseases, value]);
    }
  };

  const handleRemoveChronicDisease = (value: never) => {
    setChronicDiseases(chronicDiseases.filter(item => item !== value));
  };

  const handleAddDiet = (value: any) => {
    if (value && !diet.includes(value)) {
      setDiet([...diet, value]);
    }
  };

  const handleRemoveDiet = (value: never) => {
    setDiet(diet.filter(item => item !== value));
  };

  const handleSubmit = async () => {
    const payload = {
      userName,
      weight,
      height,
      bmi,
      intolerances,
      chronicDiseases,
      diet,
    };

    try {
      const response = await fetch('https://uvz80evw9b.execute-api.eu-west-1.amazonaws.com/prod/vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Success', 'User vitals processed successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Failed to process user vitals: ${errorData.message}`);
      }
    } catch (error:any) {
      Alert.alert('Error', `Failed to process user vitals: ${error.message}`);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.selectedItem}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => handleRemoveIntolerance(item)}>
        <Text style={styles.removeItem}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight in kilograms"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Enter your height in centimeters"
          keyboardType="numeric"
        />

        <Text style={styles.label}>BMI: {bmi ? (<Text style={styles.label}>{bmi}</Text>) : (<Text>Please enter valid weight and height.</Text>)}</Text>

        <Text style={styles.label}>Intolerances</Text>
        <RNPickerSelect
          onValueChange={handleAddIntolerance}
          items={intoleranceItems}
          style={pickerSelectStyles}
          placeholder={{ label: "Select an option", value: null }}
        />
        <FlatList
          data={intolerances}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={styles.label}>Chronic Diseases</Text>
        <RNPickerSelect
          onValueChange={handleAddChronicDisease}
          items={chronicDiseasesItems}
          style={pickerSelectStyles}
          placeholder={{ label: "Select an option", value: null }}
        />
        <FlatList
          data={chronicDiseases}
          renderItem={({ item }) => (
            <View style={styles.selectedItem}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveChronicDisease(item)}>
                <Text style={styles.removeItem}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={styles.label}>Diet</Text>
        <RNPickerSelect
          onValueChange={handleAddDiet}
          items={dietItems}
          style={pickerSelectStyles}
          placeholder={{ label: "Select an option", value: null }}
        />
        <FlatList
          data={diet}
          renderItem={({ item }) => (
            <View style={styles.selectedItem}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveDiet(item)}>
                <Text style={styles.removeItem}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />
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
    marginBottom: 125,
  },
  label: {
    fontSize: 21,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 12,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  removeItem: {
    color: 'red',
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
    marginBottom: 15,
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
    marginBottom: 15,
  },
});

export default VitalsFormScreen;
