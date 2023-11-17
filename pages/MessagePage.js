import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  StyleSheet,
} from 'react-native';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const addMessage = () => {
    if (currentMessage) {
      const newMessage = {
        text: currentMessage,
        rating: null,
        isAnonymous,
        userName: 'JohnDoe', // Replace with the actual username or user info
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
    }
  };

  const rateMessage = (index, rating) => {
    const updatedMessages = [...messages];
    updatedMessages[index].rating = rating;
    setMessages(updatedMessages);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.individualMessage}>
            <Text style={styles.messageText}>
              {message.isAnonymous ? 'Anonymous' : message.userName}: {message.text}
            </Text>
            <View style={styles.ratingContainer}>
              <Text>Rate this message: </Text>
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <Button key={rating} title={rating.toString()} onPress={() => rateMessage(index, rating)} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentMessage}
          onChangeText={(text) => setCurrentMessage(text)}
          placeholder="Type your message here"
          multiline
          numberOfLines={3}
        />
        <View style={styles.anonymousContainer}>
          <Text>Anonymous</Text>
          <Switch
            value={isAnonymous}
            onValueChange={() => setIsAnonymous(!isAnonymous)}
          />
        </View>
        <Button title="Send" onPress={addMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  anonymousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  individualMessage: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MessagePage;