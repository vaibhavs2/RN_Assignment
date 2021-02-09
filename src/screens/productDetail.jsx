import React, { useState, useEffect,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
 
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {CartContext} from '../component/cartContext'



const ProductDetail = ({navigation,route}) => {

  const { addToCart, cartItem } = useContext(CartContext);
  const [getAdded, setAdded ] = useState(false)

  useEffect(
    ()=>{navigation.setOptions({ title: route.params.item.name })
  
      for(var i=0; i<cartItem.length; i++){
        if(cartItem[i].index === route.params.item.index){
           setAdded(true) 
           break;   
        }
    }
  }
  ,[])
   

  function addItem(item){

    let tempCartItem = cartItem
      item['count'] = 1
      tempCartItem.push(item)
      addToCart(tempCartItem)
      setAdded(true)
  }


  return (
    <View style={styles.container}>
      <Image source = {{uri:route.params.item.image}} style={styles.imgStyle}/>
      <View style={styles.heading}>
        <Text style={{fontWeight:'bold'}}>{route.params.item.name}</Text>
        <Text>Rs {route.params.item.price}</Text>
      </View>
      <Text style={styles.detail}>{route.params.item.desc}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={()=> addItem(route.params.item)}>
        {getAdded?<Text>Already Added</Text>:<Text>Add To Cart</Text>}
      </TouchableOpacity>

    </View>

  );
}



const styles = StyleSheet.create({
  container:{
    padding: 5,
    flex:1
     },
    imgStyle:{
      borderRadius:5,
      borderWidth:1,
      height:240,
      padding:5,
      marginBottom:6

     },
    heading:{
       flexDirection:'row',
       justifyContent:'space-between',
       paddingHorizontal:6
     },
     detail:{
       fontSize:22
     },
     cartButton:{
       alignSelf:'flex-end',
       padding:8,
       borderWidth:1,
       borderRadius:3,
      marginTop:22
     }
  

});

export default ProductDetail;