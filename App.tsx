import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import HomeScreen from "./src/HomeScreen";
import InterpolateWithScrollViewScreen from "./src/InterpolateWithScrollViewScreen";
import IntroductionScreen from "./src/IntroductionScreen";
import PanGestureHandlerScreen from "./src/PanGestureHandlerScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen
          name="PanGestureHandler"
          component={PanGestureHandlerScreen}
        />
        <Stack.Screen
          name="InterpolateWithScrollView"
          component={InterpolateWithScrollViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
