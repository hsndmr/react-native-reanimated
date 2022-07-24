import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import HomeScreen from "./src/HomeScreen";
import IntroductionScreen from "./src/IntroductionScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
