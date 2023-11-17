import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import {
  Text,
  Alert,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';

const listTab = [
  {
    status: 'All',
  },
  {
    status: 'Completed',
  },
  {
    status: 'Incomplete',
  },
];

// const data = [
//   {
//     name: 'Mathematics-Integration',
//     status: 'Complete',
//     feedbackQuestions: [
//       { question: 'Was the lecture helpful?', answer: true },
//       { question: 'Were the examples clear?', answer: false },
//       { question: 'Did you understand the concepts?', answer: true },
//     ],
//   },
//   {
//     name: 'Mathematics-Lecture 1',
//     status: 'Incomplete',
//   },
//   {
//     name: 'Mathematics-Task 1',
//     status: 'Incomplete',
//     course: 'Science',
//   },
//   {
//     name: 'Mathematics-Task 2',
//     status: 'Complete',
//     feedbackQuestions: [
//       { question: 'Was the lecture helpful?', answer: true },
//       { question: 'Were the examples clear?', answer: false },
//       { question: 'Did you understand the concepts?', answer: true },
//     ],
//   },
//   {
//     name: 'Science-Task 5',
//     status: 'Incomplete',
//   },
//   {
//     name: 'Science-Task 4',
//     status: 'Incomplete',
//   },
//   {
//     name: 'Science-Task 3',
//     status: 'Incomplete',
//   },
//   {
//     name: 'Science-Evaluation',
//     status: 'Incomplete',
//   },
// ];




const Student = ({route, navigation}) => {
  const [status, setStatus] = useState('All');
  const [courseName, setCourseName] = useState('');
  const [database, setDatabase] = useState([]);
  const [completed, setcompleted] = useState([]);
  
  const isTopicCompleted = (courseName) => {
    return completed.some((completedCourseName) => completedCourseName === courseName);
  };

  const checkIfTopicIsCompleted = (topic) => {
    const courseName = topic.course; // Replace with the actual property that holds the course name
    return isTopicCompleted(courseName);
  };

  const getTopic = () => {
    return fetch(`http://10.203.196.83:5000/checklist/getQuestions?studentNumber=1234567&&courseName=${route.params.course}`)
      .then(response => response.text())
      .then(json => {
        setCourseName(prevCourseName => {
          const newCourseName = route.params.course;
          // console.log(json);
          for (let i = 0; i < JSON.parse(json).length; i++) {
            // if (JSON.parse(json)[i].course_name === route.params.course) {
              const newTopic = { 
                name: 
                  JSON.parse(json)[i].topic, 
                status: isTopicCompleted(JSON.parse(json)[i].topic,) ? 'Completed' : 'Incomplete', 
                visible: 
                  JSON.parse(json)[i].visibility === 'yes' ? true : false,
                questions:
                  JSON.parse(json)[i].items
              };
              setDatabase(prevDatabase => [...prevDatabase, newTopic]);
            // }
          }
          return newCourseName;
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getTopicFirst = () => {
    return fetch(`http://10.203.196.83:5000/checklist/completed_lists?studentNumber=1234567`)
      .then(response => response.text())
      .then(json => {
        for (let i = 0; i < JSON.parse(json).response.length; i++){
          // console.log(JSON.parse(json).response[i].courseName);
          setcompleted([...completed, JSON.parse(json).response[i].courseName]);
          completed.push(JSON.parse(json).response[i].topic);
        }
        // console.log(JSON.parse(json).response);
        getTopic();
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  
  useEffect(() => {
    getTopicFirst();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scroll}>

      <Text style = {styles.courseNameText}>{courseName}</Text>

        <View style={styles.listTab}>
          {listTab.map((e, index) => (
            <TouchableOpacity
              style={[styles.btnTab, status === e.status && styles.btnTabActive]}
              onPress={() => setStatus(e.status)}
            >
              <Text key = {index} style={[styles.textTab, status === e.status && styles.textTabActive]}>
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {database.map((topic, topicIndex) => (
          <TouchableOpacity onPress={() => 
            navigation.navigate(
              topic.visible && topic.status === 'Incomplete'? 
                'CourseReviewForm' : 
                'Student', 
              topic.visible && topic.status === 'Incomplete'?
                {course_name: courseName, topic : topic.name, questions: topic.questions} :
                Alert.alert(topic.status === 'Completed' ? 'You have completed this checklist' : 'The checklist is not yet visible to students'))} 
                key={topicIndex}>
            {
              topic.status === status && 
              (<View style = {styles.new_topic} key={topicIndex}>
                <View style = {styles.topic_view}>
                  <Text style = {topic.status === 'Completed' ? styles.complete : styles.incomplete} >{topic.status}</Text>
                  <Text style = {styles.added_text}>{topic.name}</Text>
                  <Image
                    style = {styles.wits_logo}
                    source={{uri: 'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png'}}
                    />
                </View>
              </View>)
            }
            {
              status === 'All' && 
              (<View style = {styles.new_topic} key={topicIndex}>
                <View style = {styles.topic_view}>
                  <Text style = {topic.status === 'Completed' ? styles.complete : styles.incomplete} >{topic.status}</Text>
                  <Text style = {styles.added_text}>{topic.name}</Text>
                  <Image
                    style = {styles.wits_logo}
                    source={{uri: 'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png'}}
                    />
                </View>
              </View>)
            }
            </TouchableOpacity>
          ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Student;
