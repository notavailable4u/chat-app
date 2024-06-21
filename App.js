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
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";


//Create Navigation
const Stack = createNativeStackNavigator();

const App = () => {
  // State for network connectivity status
  const connectionStatus = useNetInfo();

  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBf0TEFZTi4XsOFAztCqA27QG4YnRDHlJ4",
    authDomain: "chat-app2-d8821.firebaseapp.com",
    projectId: "chat-app2-d8821",
    storageBucket: "chat-app2-d8821.appspot.com",
    messagingSenderId: "447781891384",
    appId: "1:447781891384:web:29b6e3c76c9b074c4965cd"
  };

  // Alert popup if no internet connection
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Firebase Storage handler
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start}>
        </Stack.Screen>

        <Stack.Screen name='Chat'>
          {(props) => (<Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
