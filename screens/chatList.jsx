import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ToastAndroid,
  Button,
  Modal,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Chats extends Component {

    constructor(props){
        super(props)
        this.state = {username:null,error:'',progress:false, chatList:[],modalVisible:false, addChatText:null, visibleAddChat:false  };
        this.addChat = this.addChat.bind(this)
        this.showToastWithGravity = this.showToastWithGravity.bind(this)
        this.storeUser = this.storeUser.bind(this)
        this.getUserData=this.getUserData.bind(this)
        this.Item =this.Item.bind(this)
    }

    componentDidMount(){
      this.getUserData()
    }

    showToastWithGravity(text){
        ToastAndroid.showWithGravity(
        text,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    };

    async addChat(){
      let newUserChat = this.state.addChatText

      if(this.state.visibleAddChat){
        if(newUserChat){
          let tempChat = this.state.chatList
        for (var i=0; i < tempChat.length; i++) {
          if (tempChat[i].username === newUserChat) {
            alert("Chat already existing, try other username")
              return 
            }
        }

        this.setState({progress:true})
        await firestore()
            .collection('users')
            .doc(newUserChat)
            .get()
            .then(documentSnapshot => {
            if (documentSnapshot.exists) {
             
            }
            else{
              newUserChat = null
              Alert.alert("No user exists to chat, enter correct Username")
              this.setState({progress:false})
            }
          });
          
            if(newUserChat){
            let collectionName = Math.random().toString(36).substring(2,12);
            
            this.setState({
              addChatText:null,
              visibleAddChat:false,
              progress:false,
              chatList:[{username:newUserChat,collectionId:collectionName},...this.state.chatList]
            })
          await firestore()
            .collection('users')
            .doc(this.state.username)
            .set({
              [newUserChat]: collectionName
            },{merge:true})

          await  firestore()
            .collection('users')
            .doc(newUserChat)
            .set({
              [this.state.username]: collectionName
            },{merge:true});
         
          }

        }else
          this.setState({visibleAddChat:false})
      }
      else{
        this.setState({visibleAddChat:true})
      }

    }

 async storeUser(){
   let username  = this.state.username
   if(username === null)
      return

   this.setState({progress:true})
   try{
  await firestore()
        .collection('users')
        .doc(username)
        .get()
        .then(documentSnapshot => {
        if (documentSnapshot.exists) {
        this.setState({error:"username exists, try another"})
        username = null;
        }
      });
      if(username)
      {   await firestore()
                .collection('users')
                .doc(username)
                .set({})
          await AsyncStorage.setItem('username', username)
          this.setState({modalVisible:false, username:username})
          this.props.navigation.setOptions({ title: username})
      }
    }
    catch (e) {
      alert(e.toString())  
      this.setState({progress:false})
    }

      this.setState({progress:false})
}

 
    async getUserData() {
      try {
        let value = await AsyncStorage.getItem('username')
        if(value !== null) {
              this.setState({username:value})
              this.props.navigation.setOptions({ title: value })
        // await  firestore()
        //       .collection('users')
        //       .doc(value)
        //       .get().then((doc) => {
        //         if (!doc.exists) return;
        //         let newJson = []
        //         Object.keys(doc.data()).forEach(function(key) {
        //           newJson=[{username:key,collectionId:doc.data()[key]},...newJson]
                 
        //       });
        //         this.setState({chatList:newJson})
        //       });

              firestore()
              .collection("users").doc(value)
              .onSnapshot(documentSnapshot => {

                console.log(`${value}: `, documentSnapshot.data());
                if(documentSnapshot.exists)
               {  
                let newJson = []
                    Object.keys(documentSnapshot.data()).forEach(function(key) {
                    newJson=[{username:key,collectionId:documentSnapshot.data()[key]}, ...newJson]
              });
              this.setState({chatList:newJson})}
            })
            
        }
        else
        { 
          this.setState({modalVisible:true})}

      } catch(e) {
       
        this.showToastWithGravity("Create a user Name")

      }

    }
 
    
      Item=({item})=>{
       
        return(
        <View style={styles.listElement}>
          <View style={styles.circle}/>
          <Text>{item.username}</Text>
          <TouchableOpacity style={styles.messageButton} onPress={()=>this.props.navigation.navigate("Conversation",{
            me:this.state.username,
            username: item.username,
            collectionId: item.collectionId,
          })}>
            <Text style={styles.whiteText}>Message</Text>
          </TouchableOpacity>
        </View>
      )}
 

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" animating={this.state.progress} style={{position:'absolute', alignSelf:"center",marginTop:'30%'}} />
        <FlatList
        data={this.state.chatList}
        renderItem={({item})=>(<this.Item item={item}/>)}
        keyExtractor={(item) =>(item.username)}
      />
      <View style={styles.floatView}>
      {this.state.visibleAddChat &&  
      <TextInput
        style={styles.addChatText}
        autoFocus={false}
        multiline={false}
        placeholder="Add username to chat"
        onChangeText={text => this.setState({addChatText:text})}
        value={this.state.addChatText}/>}
      <AntDesign name="pluscircle" onPress={this.addChat}  size={42} color="black" />
      </View>
    { this.state.modalVisible &&
        <Modal 
          animationType="fade"
         >
          <Text style={styles.modalHeading}>Create Username to Chat with others</Text>
          <ActivityIndicator size="large" color="#00ff00" animating={this.state.progress} style={{position:'absolute', alignSelf:"center",marginTop:'30%'}} />
          <TextInput style={styles.modelInput}
          autoFocus={true}
          multiline={false}
          onChangeText={text => this.setState({username:text})}
          value={this.state.username}
          />
          <Text style={styles.errorText}>{this.state.error}</Text>
          <Button
           onPress={this.storeUser}
          title="Create"
          color="#841584"
          accessibilityLabel="Create username"
        />
        </Modal>
      }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4
  },
  listElement:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding:8,
    borderBottomColor:'purple',
    borderBottomWidth:1,
    alignItems:'center'
  },
  circle:{
    width:42,
    height:42,
    borderRadius:23,
    borderColor:'black',
    borderWidth:2
    
  },
  messageButton:{
    borderRadius:20,
    backgroundColor:'purple'

  },
  whiteText:{
    color:'white',
    paddingHorizontal:10,
    paddingVertical:3
  },
 
  floatView:{
    flexDirection:"row",
    position:'absolute',
    right:0,
    bottom:0,
    marginBottom:18,
    marginRight:12,
  },
  addChatText:{
    borderWidth:1,
    borderRadius:10,
    padding:6,
    marginHorizontal:8,
  
  },
  modalHeading:{
    color:'brown',
    fontWeight:'bold',
    fontSize:18,
    textAlign:"center",
    marginTop:18
  },
  modelInput:{
    marginTop:'40%',
    borderBottomWidth:1,
    borderRadius:10,
    padding:6,
    marginHorizontal:8,

  },
  errorText:{
    textAlign:'center',
    marginBottom:18,
    color:'red'
  }
   
});

export default Chats;

