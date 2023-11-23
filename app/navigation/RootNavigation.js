import React from "react";
import CreateTopic from "../pages/CreateTopic";
import CreateOutcomes from "./../pages/CreateOutcomes";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
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
        initialRouteName : 'CreateTopics',
      }}>
        <Stack.Screen name="CreateTopics" component={CreateTopic} />
        <Stack.Screen name="CreateOutcomes" component={CreateOutcomes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;