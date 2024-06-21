import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import CustomActions from "./CustomActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  // Create messages using State
  const [messages, setMessages] = useState([]);

  // useEffect hook to set messages options

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // Create a query to get the "messages" collection from the Firestore database
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Function will be called  using onSnapshot whenever there are changes in the collection.
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        // Initialize an empty array to store the new messages
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]); // isConnected as dependency to allow the component to callback useEffect whenever isConnected prop's value changes.

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function called if the isConnected prop is false
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (<Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#484848'
        },
        left: {
          backgroundColor: '#fff'
        },
      }} />
    );
  };

  //Prevent InputToolbar render while offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  //CustomActions and CustomViews - location -images
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        onSend={onSend}
        storage={storage}
        userID={userID}
        {...props}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  /* Render a View component with dynamic background color */
  return (
    <View style={{ backgroundColor: background, flex: 1 }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {/* Fix Android Keyboard Issue */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {/* Fix iOS Keyboard Issue */}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );

}

export default Chat;