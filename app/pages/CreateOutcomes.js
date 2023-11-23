import React, { useState, useEffect } from 'react';
import styles from '../styles';
import { TouchableOpacity, SafeAreaView, Text, StatusBar, View, Image, TextInput, Button, ScrollView, Alert, Touchable} from 'react-native';

export default function CreateOutcomes({route, navigation}) {

  const Separator = () => <View style={styles.separator} />;
  const ButtonSeparation = () => <View style={styles.button_separation} />;
  const IconSeparation = () => <View style={styles.icon_separation} />;
  const SeparatorV = () => <View style= {styles.separateV}/>

  const [topic, enteredTopic] = useState(""); // used to capture entered text in the input text                                   
  const [topicList, setTopic] = useState([]); // array that stores all the outcomes that the user has entered
  const [completed, setcompleted] = useState([]);
  const [exist, setExist] = useState(false);
  
  const isTopicCompleted = (topic) => {
    return completed.some((topicName) => topicName === topic);
  };

  const getTopic = () => {
    setExist(isTopicCompleted(route.params.choosenTopic));
    console.log(isTopicCompleted(route.params.choosenTopic));
    return fetch(`http://172.16.8.143:5000/checklist/retrieve?courseName=${route.params.course_name}`)
    .then(response => response.text())
    .then(json => {
      for (let i = 0; i < JSON.parse(json).length; i++){
        if (route.params.choosenTopic === JSON.parse(json)[i].topic){
          for (let j = 0; j < JSON.parse(json)[i].items.length; j++){
            const newTopic = {outcome: '', addtopic: JSON.parse(json)[i].items[j] };
            setTopic([...topicList, newTopic]);
            topicList.push(newTopic);
          }
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const sendTopic = () => {
    const topi = [];
    for (let i = 0; i < topicList.length; i++){
      topi.push(topicList[i].addtopic);
    }
    fetch('http://172.16.8.143:5000/checklist/insert?studentNumber=1234567', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic : route.params.choosenTopic,
        courseName : route.params.course_name,
        deadline : route.params.deadline,
        visibility : route.params.visibility ? 'yes' : 'no',
        items : topi,
      }),
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // console.log(response);
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the request:', error);
    });
    navigation.navigate('CreateTopics', {course: route.params.course_name});
  };

  const addTopic = (topic) => { // fuction that adds the text to be reviewed and also adds the buttons to delete, enable or disable the outcome to students
    if (topic !== ""){
      const newTopic = {outcome: '', addtopic: topic}
      setTopic([...topicList, newTopic]);
      enteredTopic("");
    }
    enteredTopic("");
  };

  const deleteTopic = (topicIndex) => {
    const prevTextList = [...topicList];
    prevTextList.splice(topicIndex, 1);
    setTopic(prevTextList);
  };

  const getTopicFirst = () => {
    return fetch(`http://172.16.8.143:5000/checklist/completed_lists?studentNumber=1234567`)
      .then(response => response.text())
      .then(json => {
        for (let i = 0; i < JSON.parse(json).response.length; i++){
          // console.log(JSON.parse(json).response[i].courseName);
          setcompleted([...completed, JSON.parse(json).response[i].topic]);
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
        <View style = {styles.new}>
          <IconSeparation/>

          <TouchableOpacity onPress= {() => navigation.navigate('Analysis', {courseName: route.params.course_name, topic: route.params.choosenTopic})}>
            <Image
              style = {styles.addingLogo}
              source = {require('./../icons/analysis.png')}
              alignSelf = "flex-end"
            />
          </TouchableOpacity>

          <Text style = {styles.courseNameText}>{route.params.choosenTopic}</Text>
    
        </View>

        {topicList.map((topic, topicIndex) => (
          // <TouchableOpacity onPress={() => alert("pressed")} key={topicIndex}>
            <View style = {styles.new_view} key={topicIndex}>
              
              <IconSeparation/>

              <TouchableOpacity onPress= {() => deleteTopic(topicIndex)}>
                <Image
                  style = {styles.tinyLogo}
                  source = {require('./../icons/delete.png')}
                  alignSelf = "flex-end"
                />
              </TouchableOpacity>

              <Text style = {styles.added_text}>{topic.addtopic}</Text>
            </View>
          // </TouchableOpacity>
        ))}
        
        <Separator/>

        {
          !exist && (
            <View>
              <View style = {styles.input_view}>
                <TextInput
                  style = {styles.input_style}
                  onChangeText = {(value_) => enteredTopic(value_)}
                  value = {topic} // Set the input value to the outcome state
                  placeholder = {topic ? '' : "e.g Understanding of matrix multiplication"}
                  multiline
                />

                <TouchableOpacity onPress= {() => addTopic(topic)}>
                  <Image
                    style = {styles.addingLogo}
                    source = {require('./../icons/add.png')}
                    alignSelf = "flex-end"
                  />
                </TouchableOpacity> 
              </View>

              <TouchableOpacity onPress= {() => sendTopic()} style={styles.button1}>
                <Text style = {{fontFamily : 'serif', fontSize : 20, fontWeight: 'bold'}}>Save</Text>
              </TouchableOpacity> 
            </View>
          )
        }

        {
          exist && 
          (
          <View style = {{alignSelf: 'center'}}>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Comments', {course: route.params.course_name , topic: route.params.choosenTopic})}>
              <Text style={styles.buttonText1}>Comments</Text>
            </TouchableOpacity>

          </View>
          )
        }

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
