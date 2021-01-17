import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  TouchableOpacity
} from "react-native";

import Entypo from 'react-native-vector-icons/Entypo';



class AddSection extends Component {

    constructor(){
        super()
        this.state = {newSection:'',newLecture:'',showSectionInput:false, showLectureInput:false, DATA:[] };
        this.showLectureInputText = this.showLectureInputText.bind(this)
        this.showSectionInputText = this.showSectionInputText.bind(this)
    }

    showLectureInputText(section){
        let state_array = [...this.state.DATA]

        if(section.showLectureInput)
           {    if(this.state.newLecture!=='')
                    section['data']=[this.state.newLecture, ...section.data]
                section['showLectureInput']=false
            }
        else
            section['showLectureInput']=true

        state_array[state_array.length - section.index-1] = section
        this.setState({newLecture:'', DATA:state_array})
        
    }

    showSectionInputText(){
        if(this.state.showSectionInput)
        {   if(this.state.newSection==='')
                this.setState({showSectionInput:false})
            else
                {let new_dict = {title:this.state.newSection,showLectureInput:false,index:this.state.DATA.length, data:[]}
                this.setState({showSectionInput:false, newSection:'',DATA:[new_dict,...this.state.DATA]})}}
    else
        this.setState({showSectionInput:true})

    }
  
    Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    Header = ({section})=>{

        return(<>
            <View style={styles.headerView}>
                <Text style={styles.header}>{section.title}</Text>
                <TouchableOpacity style={styles.addLecture}onPress={()=>this.showLectureInputText(section)}>
                <Entypo name="circle-with-plus" size={28} color="black" />
                </TouchableOpacity>
            </View>
            { section.showLectureInput &&
                    <TextInput 
                        onChangeText={text => this.setState({newLecture:text})}
                        defaultValue=""
                        style={styles.lecture_input_style}
                        value={this.state.newLecture}
                        maxLine={1}
                        placeholder="Add lecture"/>
                         }
            </>)
    }
 

  render() {
    return (
      <View style={styles.container}>
        <SectionList
        keyboardShouldPersistTaps='handled'
          sections={this.state.DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <this.Item title={item}  />}
          renderSectionHeader={({ section }) => (
            <this.Header section={section}/>
          )}
        />
        <View style={styles.floatView}>
         { this.state.showSectionInput &&  <TextInput placeholder='Add new section'
            style={styles.section_input_style}
            onChangeText={text => this.setState({newSection:text})}
            defaultValue=""
            value={this.state.newSection}
            maxLine={1}/>}
          <TouchableOpacity onPress={this.showSectionInputText}> 
              <Entypo name="circle-with-plus" style={styles.entypo} size={24} color="white" />
          </TouchableOpacity> 
            </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4
  },
  item: {
    backgroundColor: "#f9c2ff",
    marginVertical: 2,
    borderRadius:5,
    padding:4,

    marginLeft:12
  },
  header: {
    fontSize: 24,
  },
  headerView:{
      marginVertical:5,
      flexDirection:'row',
      justifyContent: 'space-between',
  },
  floatView:{
      position:'absolute',
      bottom:0,
      right: 0,
      marginBottom:22,
      marginRight:4,
      borderRadius:10,
      backgroundColor:'green',
      alignSelf:'baseline',
      flexDirection:'row'
  },
  entypo:{padding:12,},

  section_input_style:{
    fontSize:18,
    color:'white',
    padding:6
  },
  lecture_input_style:{
    borderBottomWidth:1,
    marginLeft:12
  },
  addLecture:{padding:5,
    backgroundColor:"#49c2ff", 
    borderRadius:5}
});

export default AddSection;