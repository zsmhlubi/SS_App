import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://tethys-engineering.pnnl.gov/sites/default/files/taxonomy-images/download_14.jpg'}}// Replace with the actual path to your image
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Student')}
      >
        <Text style={styles.outlineText}>Student</Text>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('CreateTopics')}
      >
        <Text style={styles.outlineText1}>User</Text>
        <Text style={styles.buttonText1}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust the width of the image
    height: 200, // Adjust the height of the image
    marginBottom: 20, // Space between image and buttons
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: '#FFD700', // Button background color
    justifyContent: 'center',
    alignItems: 'center',
  
    marginBottom: 20,
    borderColor: 'black', // Border color set to black
    borderWidth: 7, // Border width
    marginBottom: 20,  // Space between buttons
  },
  button1: {
    width: 200,
    height: 60,
    backgroundColor: '#000080', // Button background color
    justifyContent: 'center',
    alignItems: 'center',
   
    marginBottom: 20,
    borderColor: 'black', // Border color set to black
    borderWidth: 7, // Border width
    marginBottom: 20,  // Space between buttons
  },
  buttonText: {
    color: '#C0C0C0', // Text color
    fontSize: 25,
    fontFamily: 'serif', // Adjust the font family as needed
    // fontWeight: 'bold', // Text font size
  },
  buttonText1: {
    color: '#C0C0C0',
    fontSize: 25,
    fontFamily: 'serif', // Adjust the font family as needed
    // fontWeight: 'bold',  // Text font size
  },
  outlineText: {
    color: 'black', // Outline color set to black
    fontSize: 26,
    fontFamily: 'serif',
    fontWeight: 'bold',
    position: 'absolute',
  },
  outlineText1: {
    color: 'black', // Outline color set to black
    fontSize: 28,
    fontFamily: 'serif',
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default MainPage;
