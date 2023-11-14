import React, { useState } from 'react';
import {
  Text,
  Dimensions,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const listTab = [
  {
    status: 'All',
  },
  {
    status: 'View',
  },
];

const data = [
  {
    name: 'Mathematics-Integration',
    status: 'View',
    feedbackQuestions: [
      { question: '1. Was the lecture helpful?', answer: true },
      { question: '2. Were the examples clear?', answer: false },
      { question: '3. Did you understand the concepts?', answer: true },
    ],
  },
  {
    name: 'Mathematics-Task 2',
    status: 'View',
    feedbackQuestions: [
      { question: '1. Was the lecture helpful?', answer: true },
      { question: '2. Were the examples clear?', answer: false },
      { question: '3. Did you understand the concepts?', answer: true },
    ],
  },
];

const User = ({ navigation }) => {
  const [status, setStatus] = useState('All');
  const [datalist, setDatalist] = useState(data);

  const setStatusFilter = (status) => {
    if (status !== 'All') {
      setDatalist([...data.filter((e) => e.status === status)]);
    } else {
      setDatalist(data);
    }
    setStatus(status);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={{
              uri:
                'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png',
            }}
          />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          {status === 'View' && (
            <View style={styles.feedbackQuestions}>
              {item.feedbackQuestions.map((question, i) => (
                <View key={i}>
                  <Text>{question.question}</Text>
                  <Text style={styles.answerText}>
                    {question.answer ? 'Yes / No' : 'Yes / No'}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
  feedbackQuestions: {
    marginTop: 10,
  },
  answerText: {
    marginTop: 5, // Add margin to create space
  },
});

export default User;
