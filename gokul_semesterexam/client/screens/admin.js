import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Admin() {
  const navigation = useNavigation();

  const navigateToEngineerDetails = () => {
    // Navigate to the EngineerDetails screen
    navigation.navigate('Networkengineeregistration');
  };
  const navigateFaculty= () => {
    // Navigate to the EngineerDetails screen
    navigation.navigate('Register');
  };

  return (
  <>   
      <View style={styles.container}>
      <TouchableOpacity onPress={navigateToEngineerDetails}>
        <Text style={styles.button}>add Network Engineers</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateFaculty}>
        <Text style={styles.button}>add faculty </Text>
      </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10, // Adjust the margin as needed
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
   
  },
});
