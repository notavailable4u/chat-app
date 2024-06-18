import { LogBox, Alert } from 'react-native';
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

//import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Create Navigation
const Stack = createNativeStackNavigator();

const App = () => {
  // Web app's Firebase configuration
  const firebaseConfig = {
    //post no secrets
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name='Start'
          component={Start}>
        </Stack.Screen>

        <Stack.Screen
          name='Chat'>
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
