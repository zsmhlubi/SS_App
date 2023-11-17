import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles';

export default function CourseReviewForm({route, navigation}) {
  const [understandAbstraction, setUnderstandAbstraction] = useState(Array(5).fill(null));
  const [additionalComments, setAdditionalComments] = useState('');

  
  const handleSubmit = () => {
      if (understandAbstraction.includes(null)) {
          // alert('Please answer all questions before submitting.');
        } else {
            // You can perform further actions, such as sending the response to a server.
            alert(`You selected: ${understandAbstraction.map((value) => (value === true ? 'Yes' : 'No')).join(', ')}`);
            alert(`Additional Comments or Questions: ${additionalComments}`);
        }
        // Implement server communication if needed
    };
    
    // Array of question texts
    const [questions, setQuestions] = useState([]);

    const [comment, enteredComment] = useState('')

    const checkBox = (index) => {
        const updatedTextList = [...questions];
        updatedTextList[index].answer = !updatedTextList[index].answer; // used to enable and disable the visiblility of the outcomes visible to student 
        setQuestions(updatedTextList);
        // console.log(questions);
    };

    const sendAnswers = () => {
      const topi = [];
      for (let i = 0; i < questions.length; i++){
        console.log(questions);
        fetch(`http://10.203.196.83:5000/checklist/insertAnswer?outcome=${questions[i].answer ? 'yes' : 'no'}&&items=${questions[i].checkListItemID}&&comment=${comment}&&topic=${route.params.topic}&&studentNumber=${1234567}&&courseName=${route.params.course_name}`)
        .then(response => response.text())
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error('There was a problem with the request:', error);
        });
      }
      console.log(topi);
      navigation.navigate('Student', {course_name: route.params.course_name, topic : route.params.topic, questions: route.params.questions});
    };

  

    useEffect(() => {
      // console.log(route.params.questions[0]);
      for (let i = 0; i < route.params.questions.length; i++){
        const setQuestion = {
          question : 
            route.params.questions[i].question , 
          answer: 
            false, 
          checkListItemID: 
            route.params.questions[i].questionId
        };
        setQuestions([...questions, setQuestion]);
        questions.push(setQuestion);
      }
    }, []);
  return (
    <View style={styles.container}>
    <ScrollView style = {styles.scroll}>

      <Text style={styles.courseNameText}>{route.params.course_name}</Text>

      {/* Topic */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{route.params.topic}</Text>

      {/* Questions */}
      {questions.map((question, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text key = {index} style={{ marginRight: 10, width: 250 }}>{question.question}</Text>
            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                <TouchableOpacity onPress={() => checkBox(index)}>
                    <Image
                        style = {styles.tinyLogo}
                        source = {question.answer ? require('./../icons/checked.png') : require('./../icons/unchecked.png')}
                        alignSelf = "flex-end"
                    />
                </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Additional Comments */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Any additional comments or questions?</Text>
        {/* <View style = {styles.input_view}> */}
          <TextInput
            style = {styles.comment}
            onChangeText = {(value_) => enteredComment(value_)}
            value = {comment} // Set the input value to the outcome state
            placeholder = {comment ? '' : "e.g Matrices"}
            multiline
          />
        <TouchableOpacity
            style={styles.submit}
            onPress={handleSubmit}
        >
            <Text onPress={() => sendAnswers()}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      </ScrollView>
    </View>
  );
}
