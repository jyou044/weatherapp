/**
 * Code written by Jason You
 */

import WelcomeScreen from './screens/WelcomeScreen';
import WeatherScreen from './screens/WeatherScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Weather Home"
        component={WelcomeScreen} />
        <Stack.Screen
        name="Weather App"
        component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
