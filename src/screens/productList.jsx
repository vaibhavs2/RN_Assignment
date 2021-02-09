import React, { Component } from "react";
import {
  StyleSheet, 
  Text,
  View,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CartContext} from '../component/cartContext'

class ProductList extends Component {
   
    constructor(props){
        super(props)
        this.state = {productList:[], loading:true}
        this.addtoCart = this.addtoCart.bind(this)
        this.mounted = true
    }


     componentDidMount(){
       if(this.mounted)
        this.fetchProduct()
    }
    componentWillUnmount(){
      this.mounted = false
    }

    fetchProduct = async()=>{
      // fetch('https://next.json-generator.com/api/json/get/4kBVim32Y').then();
      fetch('https://next.json-generator.com/api/json/get/4kBVim32Y')
      .then((response) => response.json())
      .then((json) => {
        let tempList = []
        json.data.forEach((element , index) => {
          element['index'] = index.toString()
           tempList.push(element)
        });

        this.setState({productList:tempList, loading:false})

      })
        .catch((error) => {
          this.setState({loading:false})
          Alert.alert(`Got an Error while fetching products\nTry later`)
        });

    }

    showToastWithGravity(text){
        ToastAndroid.showWithGravity(
        text,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    };

    addtoCart(item){
      console.log(this.context.cartItem);
      let tempCartItem = this.context.cartItem
      for(var i=0;i<tempCartItem.length;i++ ){
        if(item.index === tempCartItem[i].index){
          ++tempCartItem[i].count
          this.context.addToCart(tempCartItem)
          return
        }
      }

      item['count'] = 1
      tempCartItem.push(item)
      this.context.addToCart(tempCartItem)
     
    }

  
      Item=({item})=>{
       
        return(
          <View style={styles.listItem}>
           <View style={{flex:1,}}>
             <TouchableOpacity style={{flexDirection:'row' }} onPress={()=> {this.props.navigation.navigate("Detail",{
                item:item
              })}}>
             <Image
                style={styles.tinyLogo}
                source={{uri:item.image}}
              />
              <View>
                <Text style={styles.textView}>{item.name}</Text>
                <Text style={styles.textView}>Rs {item.price}</Text>
              </View>
             </TouchableOpacity>
           </View>

           <View  style={{ flexDirection:'row',  }}>
             <TouchableOpacity onPress={()=>this.addtoCart(item)}>
             <FontAwesome style={{padding:8}} name="cart-plus" size={24} color="black" />
             </TouchableOpacity>
           </View>
          </View>
       
      )}
 
  render() {
    return (
      <View style={styles.container}>
        <View style={{position:'absolute',alignSelf:'center',top: 0,bottom: 0, justifyContent: 'center', }}>
        <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff" />
        </View>
       <FlatList
        data={this.state.productList}
        renderItem={({item})=>(<this.Item item={item}/>)}
        keyExtractor={(item) => item.index}
        // extraData={selectedId}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4
  },
  tinyLogo:{
    width:50,
    height:50,
    borderRadius:5,
  },
  listItem:{
    flexDirection:'row',  
    borderWidth:1,
    borderRadius:5,
    padding:3,
    marginVertical:2 
  },
  detailText:{
     backgroundColor:'red',
     marginHorizontal:10
  },
  textView:{paddingHorizontal:5}
});

ProductList.contextType = CartContext;
export default ProductList;

