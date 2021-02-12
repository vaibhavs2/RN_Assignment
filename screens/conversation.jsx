import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
 
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from "react-native-gesture-handler";



const Conversation = ({navigation,route}) => {
  const [getText, setText] = useState(null);
  const [getChat, setChat] = useState([])

  useEffect(
    ()=>{navigation.setOptions({ title: route.params.username })}
  ,[])

  useEffect(() => {
    let chatArray = []
    const subscriber = firestore()
      .collection(`assignment/chats/${route.params.collectionId}`)
      .orderBy("time", "asc")
      .onSnapshot(function onResult(QuerySnapshot) {
       QuerySnapshot. forEach(function(doc,index) {
        doc.data()['index']= index.toString()
        chatArray.push(doc.data());
      });
      setChat(chatArray)
      chatArray=[]
      },
      function onError(error) {
        alert("Can't fetch your chats, try later")
      });
      
    return () => subscriber();
  }, []);

  async function sendMessage(){
    if(getText!==null)
   try{ await firestore()
          .collection(`assignment/chats/${route.params.collectionId}`)
          .add({
            message: getText,
            sentby: route.params.me,
            time:firestore.FieldValue.serverTimestamp()
          })
          setText(null)
        }catch(e){
          alert("Message not sent, May be slow network connection")
        }
    }


  const Item =({item}) =>{
    if(item.sentby===`${route.params.me}`)
    return(
      <View>
        <Text style={styles.chatMe}>{item.message }</Text>
      </View>
    )
    else
      return (<View>
      <Text style={styles.chatYou}>{item.message }</Text>
      </View>)
  }
   
  return (
    <View style={styles.container}>
      <FlatList
      data={getChat}
      renderItem={({item})=> <Item item={item}/>}
      keyExtractor={(item) =>   item.index}
      />
      <View style={styles.messageBox} >
        <View style={{flex:1}}>
        <TextInput
          multiline
          autoFocus={false}
          onChangeText={text => setText(text)}
          value={getText}
          style={styles.messageBoxText}
          placeholder="write you message"
        />
        </View>
        
        <TouchableOpacity style={styles.send_button} onPress={sendMessage}>
          <Feather name="send" size={32} color="black" />
        </TouchableOpacity>
      </View>

    </View>

  );
}



const styles = StyleSheet.create({
  container:{
    padding: 5,
    flex:1
     },

  textInput_style:{
    height: 40,
    borderBottomWidth:1,
    fontSize:18,
    paddingHorizontal:10,
    marginVertical:20},

    text_view:{padding: 10, fontSize: 42, alignSelf:'center'},
    listElement:{
      flexDirection:'row'
    },
    messageBox:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      
    },
    messageBoxText:{
      borderWidth:1,
      borderRadius:5,
      maxHeight:80
      
    
    },
    send_button:{
      marginLeft:5
    }
    ,
    chatYou:{
      backgroundColor:'purple',
      color:'white',
      marginVertical:2,
      borderTopRightRadius:8,
      borderTopLeftRadius:8,
      borderBottomRightRadius:8,
      padding:8,
      alignSelf:'flex-start'
    },
    chatMe:{
      backgroundColor:'#9932CC',
      color:'white',
      marginVertical:2,
      borderTopRightRadius:8,
      borderTopLeftRadius:8,
      borderBottomLeftRadius:8,
      padding:8,
      alignSelf:'flex-end'
     
    }


});

export default Conversation;