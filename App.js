import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './MainPage'; // Import the MainPage component
import StudentScreen from './screens/Student';
// import UserScreen from './screens/User';
import CreateTopic from './pages/CreateTopic';
import CourseReviewForm from './pages/CourseReviewForm';
import CreateOutcomes from "./pages/CreateOutcomes";
import Courses from "./pages/Courses";
import StudentCourses from './pages/StudentCourses';
import Manual from './pages/Manual';
import Analysis from './pages/Analysis';
import MessagePage from './pages/MessagePage';


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
        <Stack.Screen name="Courses" component={Courses}/>
        <Stack.Screen name="StudentCourses" component={StudentCourses}/>
        <Stack.Screen name="Manual" component={Manual}/>
        <Stack.Screen name="Analysis" component={Analysis}/>
        <Stack.Screen name="MessagePage" component={MessagePage}/>
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
