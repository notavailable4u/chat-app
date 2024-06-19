import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    const { name, background, userID } = route.params;
    // Create messages using State
    const [messages, setMessages] = useState([]);

  // useEffect hook to set messages options
  // Create a query to get the "messages" collection from the Firestore database
    useEffect(() => {
        navigation.setOptions({ title: name });
    
          const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
          // Subscribe to changes in the "messages" collection using onSnapshot.
          // This function will be called whenever there are changes in the collection.
          const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            // Initialize an empty array to store the new messages
            let newMessages = [];
            // Iterate through each document in the snapshot
            documentsSnapshot.forEach((doc) => {
              newMessages.push({
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis()),
              })
            })
            setMessages(newMessages);
          });
        // Clean up code
        return () => {
          if (unsubMessages) unsubMessages();
        };
      }, []); 
    
      
    
      const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
      };

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#484848'
                },
                left: {
                    backgroundColor: '#fff'
                }
            }} />
    }

    /* Render a View component with dynamic background color */
    return (
        <View style={{ backgroundColor: background, flex: 1 }}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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