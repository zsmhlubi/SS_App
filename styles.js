import {Platform, StatusBar, StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal : 20,
      paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container2: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    complete : {
      paddingHorizontal : 10, 
      paddingVertical: 10, 
      fontWeight: "bold" , 
      fontFamily: 'serif', 
      alignSelf : 'center',
      backgroundColor: 'lightblue'
    },
    incomplete : {
      paddingHorizontal : 10, 
      paddingVertical: 10, 
      fontWeight: "bold" , 
      fontFamily: 'serif', 
      alignSelf : 'center',
      backgroundColor: 'yellow'
    },
    courseNameText: {
      flex:1,
      fontSize : 25, 
      fontWeight: 'bold', 
      fontFamily: 'serif', 
      paddingLeft: 20,
      alignSelf : 'flex-start'
    },
    
    viewAnalysis: {
      fontSize : 25, 
      fontWeight: 'bold', 
      fontFamily: 'serif', 
      alignSelf:"flex-end",
      paddingHorizontal : 5,
      backgroundColor : 'gold',
      right : 20,
      bottom : 23,
      borderWidth : 1,
      borderRadius : 10,
    },
    image: {
      width: 200, // Adjust the width of the image
      height: 200, // Adjust the height of the image
      marginBottom: 20, // Space between image and buttons
    },
    button: {
      width: 200,
      height: 60,
      backgroundColor: '#FFD700', // Button background color
      justifyContent: 'center',
      alignItems: 'center',
    
      marginBottom: 20,
      borderColor: 'black', // Border color set to black
      borderWidth: 7, // Border width
      marginBottom: 20,  // Space between buttons
    },
    button1: {
      width: 200,
      height: 60,
      backgroundColor: '#000080', // Button background color
      justifyContent: 'center',
      alignItems: 'center',
     
      marginBottom: 20,
      borderColor: 'black', // Border color set to black
      borderWidth: 7, // Border width
      marginBottom: 20,  // Space between buttons
    },
    buttonText: {
      color: '#C0C0C0', // Text color
      fontSize: 25,
      fontFamily: 'serif', // Adjust the font family as needed
      // fontWeight: 'bold', // Text font size
    },
    buttonText1: {
      color: '#C0C0C0',
      fontSize: 25,
      fontFamily: 'serif', // Adjust the font family as needed
      // fontWeight: 'bold',  // Text font size
    },
    outlineText: {
      color: 'black', // Outline color set to black
      fontSize: 26,
      fontFamily: 'serif',
      fontWeight: 'bold',
      position: 'absolute',
    },
    outlineText1: {
      color: 'black', // Outline color set to black
      fontSize: 28,
      fontFamily: 'serif',
      fontWeight: 'bold',
      position: 'absolute',
    },

    user_manual : {
      borderBottomWidth : 2,
    },
  
    input_style : {
      // flex: 1,
      paddingStart: 10,
      height: 50,
      width: "90%",
      alignSelf: "flex-start",
      // textAlign: "center",
    },
    submit : {
      backgroundColor: 'lightblue',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 30,
      alignSelf : 'flex-end',
      
      bottom: 25,
      right: 6,
    },

    comment : {
      paddingStart: 10,
      height: 50,
      width: "100%",
      alignSelf: "flex-start",
      borderWidth : 2,
    },
  
    scroll : {
      flex: 1,
      color: "red",
      paddingBottom: 20,
      // alignSelf: "flex-end",
    },
    new_view: {
      flexDirection: "row-reverse",
      marginVertical: 5,
      borderWidth: 1,
      backgroundColor: "white",
    },
    new: {
      flexDirection: "row-reverse",
      marginVertical: 5,
    },
  
    topic_view: {
      flexDirection: "row-reverse",
      marginVertical: 5,
    },
    tinyLogo: {
      width: 20,
      height: 20,
      marginVertical : 15,
    },
  
    addingLogo: {
      // paddingVertical: 15,
      width: 30,
      height: 30,
    },
  
    new_topic: {
      flexDirection: "column",
      marginVertical: 5,
      flex : 1,
      padding: 5,
      backgroundColor: "white",
      borderWidth: 1,
    },
    
    added_text: {
      flex : 1,
      alignSelf : "flex-start",
      paddingLeft : 20,
      paddingVertical: 15,
      fontSize : 16,
      fontFamily : 'serif',
      fontWeight : "bold",
    },
    input_view : {
      flex : 1,
      flexDirection: 'row',
      backgroundColor : "gold",
      borderWidth: 4,
      alignItems: "center",
      borderColor: "black",
    },
    

    dropdownIcon :{
      // paddingVertical: 15,
      flexDirection: 'row',
    },

    dropdownText:{
      backgroundColor: "white",
      padding:5,
      margin:2,
    },
    centeredView : {
      flex:1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    wits_logo :{
      width : 50,
      height : 50,
    },
    modelView: {
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      paddingVertical : 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation:5,
    },

    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button_separation : {
      marginVertical: 4,
    },
    icon_separation : {
      marginHorizontal: 4,
    },
    separateV : {
      marginHorizontal: 24,
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
    aboutText: {
      fontFamily: 'serif',
      fontSize: 15,
      color: 'blue',
    },

    completeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
  });

  export default styles;