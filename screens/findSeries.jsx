import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableWithoutFeedback, 
  Keyboard
 
} from "react-native";
 

const FindSeries = () => {
  const [getText, setText] = useState('');
  const [getValue, setValue] = useState(0);

  function calculate(index){
    if(index==='')
        return 

    let square=Math.pow(parseInt(index) ,2)
    if(parseInt(index) %2===0)
        setValue(--square)
    else
        setValue(++square)
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <Text>Find number from Series</Text>
        <Text>2,3,10,15,26,35,50,63,?</Text>
      <TextInput
        style={styles.textInput_style}
        placeholder="Enter Index to find number"
        onChangeText={text => setText(text)}
        defaultValue={getText}
        keyboardType='numeric'
        caretHidden={true}
        maxLine={1}
      />

    <Button
        onPress={() => calculate(getText)}
        title="Submit"
        color="#841584"
        accessibilityLabel="Number submit"
        />

{getValue!==0 && <Text style={styles.text_view}>
        {getValue}
      </Text>}
  
    </View>
    </TouchableWithoutFeedback>

  );
}



const styles = StyleSheet.create({
  container:{
    padding: 10,
    flex:1},

  textInput_style:{
    height: 40,
    borderBottomWidth:1,
    fontSize:18,
    paddingHorizontal:10,
    marginVertical:20},

    text_view:{padding: 10, fontSize: 42, alignSelf:'center'}

});

export default FindSeries;