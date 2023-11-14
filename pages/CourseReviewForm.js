import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles';

function CourseReviewForm() {
  const [understandAbstraction, setUnderstandAbstraction] = useState(Array(5).fill(null));
  const [additionalComments, setAdditionalComments] = useState('');

  const handleCheckboxChange = (index, value) => {
    const newUnderstandAbstraction = [...understandAbstraction];
    newUnderstandAbstraction[index] = value;
    setUnderstandAbstraction(newUnderstandAbstraction);
  };

  const handleAdditionalCommentsChange = (text) => {
    setAdditionalComments(text);
  };

  
  const handleSubmit = () => {
      if (understandAbstraction.includes(null)) {
          alert('Please answer all questions before submitting.');
        } else {
            // You can perform further actions, such as sending the response to a server.
            alert(`You selected: ${understandAbstraction.map((value) => (value === true ? 'Yes' : 'No')).join(', ')}`);
            alert(`Additional Comments or Questions: ${additionalComments}`);
        }
        // Implement server communication if needed
    };
    
    // Array of question texts
    const [questions, setQuestions] = useState([
        {question : 'I understand the concept of Abstraction', answer: true},
        {question : 'I understand the concept of Abstraction', answer: true},
        {question : 'I understand the concept of Abstraction', answer: true},
        {question : 'I understand the concept of Abstraction', answer: true}
    ]);

    const [comment, enteredComment] = useState('');
    

    const checkBox = (index) => {
        const updatedTextList = [...questions];
        updatedTextList[index].answer = !updatedTextList[index].answer; // used to enable and disable the visiblility of the outcomes visible to student 
        setQuestions(updatedTextList);
    };


return (
    <View style={styles.container}>
    <ScrollView style = {styles.scroll}>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>OPERATING SYSTEMS</Text>

      {/* Topic */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Topic: Abstraction</Text>

      {/* Questions */}
      {questions.map((question, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text key = {index} style={{ marginRight: 10, width: 250 }}>{question.question}:</Text>
            <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                <TouchableOpacity onPress={() => checkBox(index)}>
                    <Image
                        style = {styles.tinyLogo}
                        source = {question.answer ? require('./../icons/unchecked.png') : require('./../icons/checked.png')}
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
        {/* </View> */}
        <TouchableOpacity
            style={{
            backgroundColor: 'lightblue',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 30,
            alignSelf : 'flex-end',
            
            bottom: 25,
            right: 6,
            }}
            onPress={handleSubmit}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      </ScrollView>
    </View>
  );
}

export default CourseReviewForm;
