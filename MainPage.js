import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from './styles';

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container2}>
      <Image
        source={{uri: 'https://tethys-engineering.pnnl.gov/sites/default/files/taxonomy-images/download_14.jpg'}}// Replace with the actual path to your image
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StudentCourses')}
      >
        <Text style={styles.outlineText}>Student</Text>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('Courses')}
      >
        <Text style={styles.outlineText1}>User</Text>
        <Text style={styles.buttonText1}>User</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.user_manual} onPress={() => navigation.navigate('Manual')}>
        <Text>user manual</Text>
      </TouchableOpacity>
    </View>
  );
};


export default MainPage;
