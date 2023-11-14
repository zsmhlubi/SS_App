import {Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal : 20,
      paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  
    input_style : {
      // flex: 1,
      paddingStart: 10,
      height: 50,
      width: "90%",
      alignSelf: "flex-start",
      // textAlign: "center",
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
      // padding: 5,
      borderWidth: 1,
      backgroundColor: "white",
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
  
  })

  export default styles;