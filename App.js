import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './MainPage'; // Import the MainPage component
import StudentScreen from './screens/Student';
// import UserScreen from './screens/User';
import CreateTopic from './pages/CreateTopic';
import CourseReviewForm from './pages/CourseReviewForm';
import CreateOutcomes from "./pages/CreateOutcomes";


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle : {
          backGroundColor : 'transparent',
        },
        headerTintColor : 'black',
        headerTransparent : true,
        headerTitle: '',
        headerLeftContainerStyle : {
          paddingLeft : 20,
        },
        initialRouteName : 'MainPage',
      }}>
        <Stack.Screen name="MainPage" component={MainPage} options={{ title: 'Main Page' }} />
        <Stack.Screen name="Student" component={StudentScreen} options={{ title: 'Student' }} />
        {/* <Stack.Screen name="User" component={UserScreen} options={{ title: 'User' }} /> */}
        <Stack.Screen name="CreateTopics" component={CreateTopic} />
        <Stack.Screen name="CreateOutcomes" component={CreateOutcomes}/>
        <Stack.Screen name="CourseReviewForm" component={CourseReviewForm}/>
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
