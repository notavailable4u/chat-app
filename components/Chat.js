import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({route, navigation}) => {
    const {name, background} = route.params;

    useEffect(() => {
        navigation.setOptions({title: name});
    }, []);

     /* Render a View component with dynamic background color */
    return (
<View style={{backgroundColor: background, flex: 1}} />
    );
}



export default Chat;