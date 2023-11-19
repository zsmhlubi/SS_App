import React, { useState, useEffect } from 'react';
import styles from '../styles';
import DatePicker from 'react-native-modern-datepicker';
import {getDate, getFormatedDate} from 'react-native-modern-datepicker';
import { TouchableOpacity, SafeAreaView, Text, StatusBar, View, Image, TextInput, Button, ScrollView, Alert, Modal} from 'react-native';


export default function Createcourse({navigation}) {

  const Separator = () => <View style={styles.separator} />;
  const ButtonSeparation = () => <View style={styles.button_separation} />;
  const IconSeparation = () => <View style={styles.icon_separation} />;

  const [courseList, setcourse] = useState([]); // array that stores all the outcomes that the user has entered

  const getcourse = () => {
    return fetch('http://172.16.8.143:5000/courses')
    .then(response => response.text())
    .then(json => {
      for (let i = 0; i < JSON.parse(json).length; i++){
        const course = {courseName: JSON.parse(json)[i]};
        setcourse([...courseList, course]);
        courseList.push(course);
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
  
  useEffect(() => {
    getcourse();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scroll}>

        <Text style = {styles.courseNameText}>Courses</Text>

        {courseList.map((course, courseIndex) => (
          <TouchableOpacity onPress={() => navigation.navigate('Student', {course: course.courseName})} key={courseIndex}>
            <View style = {styles.new_topic} key={courseIndex}>
              <View style = {styles.topic_view}>

                <Text style = {styles.added_text}>{course.courseName}</Text>
                <Image
                  style = {styles.wits_logo}
                  source={{uri: 'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png'}}
                />
                <IconSeparation/>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
