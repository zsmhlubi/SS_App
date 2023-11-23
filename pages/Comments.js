// import React, { useState, useEffect } from 'react';
// import styles from '../styles';
// import { TouchableOpacity, SafeAreaView, Text, StatusBar, View, Image, TextInput, Button, ScrollView} from 'react-native';

// const Comments = ({ route,navigation }) => {
//     const Separator = () => <View style={styles.separator} />;
//     const commentSeparator = () => <View style={styles.button_separation}/>;

//     const [commentList, setComment] = ([]);

//     const iscomment = (topic) => {
//         return commentList.some((topicName) => topicName.ID === topic);
//       };

    
    
//     const getComments = () => {
//         return fetch(`http://172.16.8.143:5000/comments?courseName=${route.params.course}&&topic=${route.params.topiv}`)
//         .then(response => response.text())
//         .then(json => {
//             let newComments = [];
//             for (let i = 0; i < JSON.parse(json).response.length; i++) {
//               if (!iscomment(JSON.parse(json).response[i].checkListID)) {
//                 const newcomment = {
//                   comment: JSON.parse(json).response[i].comment,
//                   ID: JSON.parse(json).response[i].checkListID
//                 };
//                 newComments.push(newcomment);
//               }
//             }
//             setComment(prevComments => [...prevComments, ...newComments]);
//             console.log(commentList);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     };
    
//     useEffect(() => {
//         getComments();
//     }, []);
    
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView style = {styles.scroll}>
//                 <Text>Hello</Text>

//             {commentList.map((topic, topicIndex) => (
//                     <View style = {styles.new_view} key={commentIndex}>
//                         <Text style = {styles.added_text}>{comment.comment}</Text>
//                         <Separator/>
//                     </View>
//                 ))}
                
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default Comments;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles';

export default function Comment({route, navigation}) {
    // Array of question texts
    const [questions, setQuestions] = useState([]);

    const [comment, enteredComment] = useState('')

    const checkBox = (index) => {
        const updatedTextList = [...questions];
        updatedTextList[index].answer = !updatedTextList[index].answer; // used to enable and disable the visiblility of the outcomes visible to student 
        setQuestions(updatedTextList);
        // console.log(questions);
    };

    const iscomment = (topic) => {
        return questions.some((topicName) => topicName.ID === topic);
    };


    const getComments = () => {
        return fetch(`http://172.16.8.143:5000/comments?courseName=${route.params.course}&&topic=${route.params.topic}`)
        .then(response => response.text())
        .then(json => {
            for (let i = 0; i < JSON.parse(json).response.length; i++){
                if(!iscomment(JSON.parse(json).response[i].checkListID)){
                    const newcomment = {
                        comment :
                            JSON.parse(json).response[i].comment, 
                        ID: 
                            JSON.parse(json).response[i].checkListID
                    };
                    setQuestions([...questions, newcomment]);
                    questions.push(newcomment);
                }
            }
          console.log(questions);
        })
        .catch(error => {
            console.error(error);
        });
    };
  

    useEffect(() => {
      getComments();
    }, []);
  return (
    <View style={styles.container}>
    <ScrollView style = {styles.scroll}>

      <Text style={styles.courseNameText}>{route.params.course}</Text>

      {/* Topic */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft : 10 , alignSelf: 'center'}}>{route.params.topic}</Text>

      {/* Questions */}
      {questions.map((question, index) => (
        <View key={index} style={{ marginBottom: 30, alignItems:'center' }}>
            <Text key = {index} style={{ marginRight: 10, width: 250, fontFamily: 'serif', alignSelf: 'flex-start' }}>{(index +  1) + ' . ' + question.comment}</Text>
        </View>
      ))}

      </ScrollView>
    </View>
  );
}

