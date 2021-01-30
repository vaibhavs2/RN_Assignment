/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
   View,
  StyleSheet,
  Button,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import Chats from "./screens/chatList";
import Conversation from "./screens/conversation";



function HomeScreen({ navigation }) {

  onPressLearnMore=()=>{
    console.log("clicking");
  }
  return (
    <View style={styles.body}>
    <StatusBar barStyle="default" />
    <Button
      onPress={() => navigation.navigate('Chats')}
      title="Add sections"
      color="#841584"
      accessibilityLabel="Navigate to Add sections "
    />
    <View style={{marginVertical:6}}></View>

      <Button
        onPress={() => navigation.navigate('Series')}
        title="Find number"
        color="#841584"
        accessibilityLabel="Navigate to Find number from series"
        />
      </View>
  );
}


const Stack = createStackNavigator();

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Chats" component={Chats}  options={{ title: 'Chats' }} />
    <Stack.Screen name="Conversation" component={Conversation}  options={{ title: "chat" }}/>
    <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};



const styles = StyleSheet.create({
   
  body: {
    backgroundColor: Colors.white,
    flex:1,
    justifyContent:'center',
    padding:8
  },
  buttons_:{
    margin:5
  }
  
});

export default App;
