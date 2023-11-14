import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Dimensions,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';

const listTab = [
  {
    status: 'All',
  },
  {
    status: 'Complete',
  },
  {
    status: 'Incomplete',
  },
];

const data = [
  {
    name: 'Mathematics-Integration',
    status: 'Complete',
    feedbackQuestions: [
      { question: 'Was the lecture helpful?', answer: true },
      { question: 'Were the examples clear?', answer: false },
      { question: 'Did you understand the concepts?', answer: true },
    ],
  },
  {
    name: 'Mathematics-Lecture 1',
    status: 'Incomplete',
  },
  {
    name: 'Mathematics-Task 1',
    status: 'Incomplete',
    course: 'Science',
  },
  {
    name: 'Mathematics-Task 2',
    status: 'Complete',
    feedbackQuestions: [
      { question: 'Was the lecture helpful?', answer: true },
      { question: 'Were the examples clear?', answer: false },
      { question: 'Did you understand the concepts?', answer: true },
    ],
  },
  {
    name: 'Science-Task 5',
    status: 'Incomplete',
  },
  {
    name: 'Science-Task 4',
    status: 'Incomplete',
  },
  {
    name: 'Science-Task 3',
    status: 'Incomplete',
  },
  {
    name: 'Science-Evaluation',
    status: 'Incomplete',
  },
];


const dataBase = [];

const Student = ({ navigation }) => {
  const [status, setStatus] = useState('All');
  const [datalist, setDatalist] = useState(data);
  const [courseName, setCourseName] = useState('');

  const getTopic = () => {
    return fetch('http://172.17.0.1:5000/checklist/completed?studentNumber=1234567')
    .then(response => response.text())
    .then(json => {
      // setCourseName(JSON.parse(json)[0].course_name);
      console.log(json);
      // for (let i = 0; i < JSON.parse(json).length; i++){
        
      // }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const setStatusFilter = (status) => {
    if (status !== 'All') {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else {
      setDatalist(data);
    }
    setStatus(status);
  };

  const click = () => {
    console.log('clickeed');
  };
  const renderItem = ({ item, index }) => {
    const isComplete = item.status === 'Complete';

    const handleCompleteButtonPress = () => {
      if (isComplete && status === 'Complete') {
        navigation.navigate('Details', {
          feedbackQuestions: item.feedbackQuestions || [],
        });
      }
    };

    return (
      <View key={index} style={styles.itemContainer} >
        <View style={styles.itemLogo} >
          <Image
            style={styles.itemImage}
            source={{
              uri:
                'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png',
            }}
          />
        </View>
        <View style={styles.itemBody} >
          <Text style={styles.itemName} onPress={() => click()}>{item.name}</Text>
          {status === 'Complete' && (
            <View style={styles.feedbackQuestions} >
              {item.feedbackQuestions.map((question, i) => (
                <View key={i}>
                  <Text>{question.question}</Text>
                  <Text style={styles.answerText}>
                    {question.answer ? 'Yes' : 'No'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CourseReviewForm',  {})}>
        <View 
          style={[
            styles.itemStatus,
            { backgroundColor: item.status === 'Incomplete' ? '#000080' : (item.status === 'Complete' ? '#FFD700' : '#fff') },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getTopic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Text style = {{fontSize : 25, fontWeight: 'bold', fontFamily: 'serif' }}>{courseName}</Text>

      <View style={styles.listTab}>
        {listTab.map((e) => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={datalist} keyExtractor={(e, i) => i.toString()} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
  },
  btnTabActive: {
    backgroundColor: '#000080',
  },
  textTab: {
    color: '#000000',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  textTabActive: {
    color: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemStatus: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    justifyContent: 'center',
    marginTop:25,
    right: 12,
  },
  statusText: {
    color: '#fff',
    fontFamily: 'serif',
  },
  feedbackQuestions: {
    marginTop: 10,
  },
  answerText: {
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Student;
