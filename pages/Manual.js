import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '../styles';

const MainPage = ({ navigation }) => {
    const Separator = () => <View style={styles.separator} />;
    const TopicSeparator = () => <View style={styles.button_separation} />;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style = {styles.scroll}>
                <View style = {{padding: 20}}>
                    {/* describe the app */}
                    <Text style = {styles.aboutText}>
                        About
                    </Text>
                    <TopicSeparator/>
                    <Text>
                        The app is designed to assess and evaluate students' understanding of specific topics within a course.
                        It facilitates feedback and the answering of checklist questions by students
                    </Text>
                    <Separator/>
                    <Text style = {styles.aboutText}>
                        Administrative Functionality
                    </Text>
                    <TopicSeparator/>
                    <Text>
                        Admins have the ability to create checklist questions associated with specific courses.
                        Admins can analyze students' answers to gain insights into teaching effectiveness.
                        Analysis and Improvement:
                        The primary focus is on analyzing student responses to identify areas for improvement in teaching strategies.
                        The app serves as a tool for continuous improvement in the teaching process.
                    </Text>
                    <Separator/>
                    <Text style = {styles.aboutText}>
                        The student interface
                    </Text>
                    <TopicSeparator/>
                    <View>
                        <Text>
                            checklist answering
                        </Text>
                        <Text>
                            View courses with available checklist questions, displaying the completion status.
                            Access an answering page for incomplete checklists.
                            Encounter checklist questions on the answering page.
                            Provide answers by checking checkboxes for "yes" or leaving them unchecked for "no."
                            They can also comment for any additional questions, this is optional.
                        </Text>
                    </View>
                    
                    <Separator/>
                    <Text style = {styles.aboutText}>
                        Admin interface
                    </Text>
                    <TopicSeparator/>
                    <Text>
                        The Admin can manage checklist questions by creating, updating, and deleting them.
                        Creation involves specifying course details, topic, due date, and visibility to students. 
                        Updates allow modifications to these details, and deletion removes checklist questions as needed.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainPage;
