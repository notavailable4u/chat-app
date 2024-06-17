import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;
    // Create messages using State
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name })
        setMessages([
            {
                _id: 1,
                text: `Hello from ${name}`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placebear.com/140/140",
                },
            },
            {
                _id: 2,
                text: 'You have entered Chat.',
                createdAt: new Date(),
                system: true,
                background: 'FFF',
            },
        ]);
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

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
                    _id: 1
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