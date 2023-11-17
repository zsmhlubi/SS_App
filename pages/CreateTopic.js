import React, { useState, useEffect } from 'react';
import styles from '../styles';
import DatePicker from 'react-native-modern-datepicker';
import {getDate, getFormatedDate} from 'react-native-modern-datepicker';
import { TouchableOpacity, SafeAreaView, Text, StatusBar, View, Image, TextInput, Button, ScrollView, Alert, Modal} from 'react-native';


export default function CreateTopic({route, navigation}) {

  const Separator = () => <View style={styles.separator} />;
  const ButtonSeparation = () => <View style={styles.button_separation} />;
  const IconSeparation = () => <View style={styles.icon_separation} />;

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

  const [isOpen, setState] = useState(false);
  const [viewCalender, setViewCalenderState] = useState(false);
  const [closingDate, setClosingDate] = useState('2023/12/12');
  const [courseName, setCourseName] = useState('');

  const [topic, enteredTopic] = useState(""); // used to capture entered text in the input text                                   
  const [topicList, setTopic] = useState([]); // array that stores all the outcomes that the user has entered

  const enable = (topicIndex) => { // function to change the text on the button to enable visibility
    const updatedTextList = [...topicList];
    visibilty(updatedTextList[topicIndex].addtopic, updatedTextList[topicIndex].enabled ? 'no' : 'yes')
    updatedTextList[topicIndex].enabled = !updatedTextList[topicIndex].enabled; // used to enable and disable the visiblility of the outcomes visible to student 
    setTopic(updatedTextList);
  };

  const visibilty = (topic,visibility) => {
    console.log(visibility);
    fetch(`http://10.203.196.83:5000/checklist/visibility?courseName=${courseName}&&topic=${topic}&&visibility=${visibility}`)
    .then(response => response.text())
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const optionChoosen = () => {
    setViewCalenderState(!viewCalender);
    setState(!isOpen);
  };

  const changeDate = (date) => {
    setClosingDate(date);
    console.log(closingDate);
  };

  const getTopic = () => {
    return fetch(`http://10.203.196.83:5000/checklist/retrieve?courseName=${route.params.course}`)
    .then(response => response.text())
    .then(json => {
      setCourseName(route.params.course);
      // console.log(json.text);
      for (let i = 0; i < JSON.parse(json).length; i++){
          const newTopic = {outcome: '', addtopic: JSON.parse(json)[i].topic, enabled: JSON.parse(json)[i].visibility === 'yes'};
          setTopic([...topicList, newTopic]);
          topicList.push(newTopic);
        
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  
  const deleteTopicDatabase = (topic) => {
    fetch(`http://10.203.196.83:5000/checklist/delete?courseName=${courseName}&&topic=${topic}`)
    .then(response => response.text())
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const addTopic = (topic) => { // fuction that adds the text to be reviewed and also adds the buttons to delete, enable or disable the outcome to students
    if (topic !== ""){
      const newTopic = {outcome: '', addtopic: topic, enabled: false};
      setTopic([...topicList, newTopic]);
      enteredTopic("");
    }
    enteredTopic("");
    Alert.alert(
      'Closing Date',
      `Please choose closing date for "${topic}" on calendar`,
      [{ text: 'OK' }]
    );
  };

  const deleteTopic = (topicIndex) => {
    const prevTextList = [...topicList];
    deleteTopicDatabase(prevTextList[topicIndex].addtopic);
    
    prevTextList.splice(topicIndex, 1);
    setTopic(prevTextList);
  };
  
  useEffect(() => {
    getTopic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style = {styles.scroll}>

        <Text style = {styles.courseNameText}>{route.params.course}</Text>

        {topicList.map((topic, topicIndex) => (
          <TouchableOpacity onPress={() => navigation.navigate('CreateOutcomes', {choosenTopic: topic.addtopic, deadLine : closingDate, course_name : courseName, visibility : topic.enabled })} key={topicIndex}>
            <View style = {styles.new_topic} key={topicIndex}>
              <View style = {styles.topic_view}>

                <IconSeparation/>

                <TouchableOpacity onPress= {() => deleteTopic(topicIndex)}>
                  <Image
                    style = {styles.tinyLogo}
                    source = {require('./../icons/delete.png')}
                  />
                </TouchableOpacity>

                <IconSeparation/>

                <TouchableOpacity onPress= {() => optionChoosen(topicIndex)}>
                  <Image
                    style = {styles.tinyLogo}
                    source = {require('./../icons/calendar.png')}
                  />
                </TouchableOpacity>

                <IconSeparation/>

                <TouchableOpacity onPress= {() => enable(topicIndex)}>
                  <Image
                    style = {styles.tinyLogo}
                    source = {topic.enabled ? require('./../icons/see.png') : require('./../icons/hide.png')}
                    alignSelf = "flex-end"
                  />
                </TouchableOpacity>

                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={viewCalender}
                >
                <View style = {styles.centeredView}>
                    <View style = {styles.modelView}>
                        <DatePicker
                            mode = 'calendar'
                            minimumDate = {startDate}
                            selected = {closingDate}
                            onDateChange = {changeDate}
                        />

                        <TouchableOpacity>
                            <Text onPress= {() => setViewCalenderState(!viewCalender)}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
                </Modal>

                <Text style = {styles.added_text}>{topic.addtopic}</Text>
                <Image
                  style = {styles.wits_logo}
                  source={{uri: 'https://www.jet.org.za/news/assets/wits-logo.png/@@images/b62515db-7457-4047-9054-2165b40d9881.png'}}
                />
                <IconSeparation/>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Separator/>

        <View style = {styles.input_view}>
          <TextInput
            style = {styles.input_style}
            onChangeText = {(value_) => enteredTopic(value_)}
            value = {topic} // Set the input value to the outcome state
            placeholder = {topic ? '' : "e.g Matrices"}
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

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
