// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SoundPlay from './SoundPlay';
import { Button } from '@react-navigation/elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux_db/store';


function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen Test </Text>
      <Text onPress={() => navigation.navigate("Details")}>Go TO Details</Text>
      <Button onPressIn={()=>{ navigation.navigate('soundplay')}}>
        Go To Play Sound
      </Button>
    </View>
  );
}


function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text onPress={() => navigation.goBack()}>Go Back</Text>
      <Button onPressIn={()=>{ navigation.navigate('soundplay')}}>
        Go To Play Sound
      </Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="soundplay" component={SoundPlay} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}