import React, { Component } from 'react'
import { Text, View, FlatList,Image,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartContext} from '../component/cartContext'

 
export default class CartItem extends Component {

  constructor(props){
    super(props)
    this.state = {refreshList:false, isCartEmpty:true, totalPay:{total:0, subTotal:0, GST:0}}
    this.cartTotal = this.cartTotal.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if(this.context.cartItem.length===0)
        this.setState({refreshList:!this.state.refreshList,isCartEmpty:true})
      else
      { let cartTotal = this.cartTotal()
        this.setState({refreshList:!this.state.refreshList,isCartEmpty:false, totalPay:cartTotal})
        }
    });
 
  }

  componentWillUnmount(){
    this._unsubscribe();
  }
  
  cartTotal(){
    let tempCartItem = this.context.cartItem
    let subtotal=0;
    if(tempCartItem.length ===0)
     { this.setState({isCartEmpty:true})
      return}

    tempCartItem.forEach(element => {
      subtotal += (parseInt(element.price)*parseInt(element.count))
    });
    //GST calculation
    let GST =  subtotal*5/100    
    return  {total:subtotal + GST, subTotal:subtotal, GST:GST}
  }


  removeItem(item){

    let tempCartItem = this.context.cartItem
    for(var i=0; i<tempCartItem.length; i++){
      if(tempCartItem[i].index === item.index){
        if(item.count>1){
          tempCartItem[i].count -= 1
          this.context.addToCart(tempCartItem)
          let totalpay = this.cartTotal()
          this.setState({totalPay:totalpay,refreshList:!this.state.refreshList})
          return 
        }
        
          tempCartItem.splice(i,1)
          this.context.addToCart(tempCartItem)
          let totalpay = this.cartTotal()
          this.setState({totalPay:totalpay,refreshList:!this.state.refreshList})
          return
        
      }
    }

  }

  addItem(item){

    let tempCartItem = this.context.cartItem
    for(var i=0; i<tempCartItem.length; i++){
      if(tempCartItem[i].index === item.index){
          tempCartItem[i].count += 1
          this.context.addToCart(tempCartItem)
          let totalpay = this.cartTotal()
          this.setState({totalPay:totalpay,refreshList:!this.state.refreshList})
          return 
        }
    }
  }


    Item=({item})=>{
       
        return(
          <View style={styles.listItem}>
           <View style={{flex:1, flexDirection:'row'}}>
             <Image
                style={styles.tinyLogo}
                source={{uri:item.image}}
              />
              <View>
                <Text style={[styles.textView,{fontWeight:'bold'}]}>{item.name}</Text>
                <Text style={styles.textView}>Rs {item.price}</Text>
              </View>
           </View>

           <View style={{ flexDirection:'row', alignItems:'center'}}>
               <TouchableOpacity onPress={()=>{this.addItem(item)}}>
                <AntDesign name="pluscircleo" size={24} color="black" />
             </TouchableOpacity>

                <Text style={styles.textView}>{item.count}</Text>

             <TouchableOpacity  onPress={()=>{this.removeItem(item)}}>
                <AntDesign name="minuscircleo" size={24} color="black" />
             </TouchableOpacity>
           </View>
          </View>
       
      )}


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:2}}>
                <FlatList
                    data={this.context.cartItem}
                    renderItem={({item})=>(<this.Item item={item}/>)}
                    keyExtractor={(item) => item.index}
                    extraData={this.state.refreshList}
                />
                </View>
                <View style={styles.priceDetail}>
                  {this.state.isCartEmpty &&
                  <View style={{position:'absolute', alignSelf:'center'}}>
                      <Text style={{fontWeight:'bold', fontSize:22}}>No item in your Cart</Text>
                    </View>}
                   { !this.state.isCartEmpty && 
                   <><View style={{flexDirection:'row',marginBottom:15}}>
                    <View style={{flex:4}}/>
                        <View style={{flex:2}}>
                        <Text>Sub total</Text>
                        <Text>GST 5%</Text>
                        </View>
                        <View style={{flex:2}}>
                        <Text style={styles.alignRigntText}>{this.state.totalPay.subTotal}</Text>
                        <Text style={styles.alignRigntText}>{this.state.totalPay.GST}</Text>
                        </View>
                    </View>
                    <View style={styles.border}/>
                   
                   
                        <View style={{flexDirection:'row', marginVertical:15}}>
                        <View style={{flex:4}}/>

                        <View style={{flex:2}}>
                        <Text>Total</Text>
                        </View>

                        <View style={{flex:2}}>
                        <Text style={styles.alignRigntText}>{this.state.totalPay.total}</Text>   
                        </View>
                    
                   
                    </View>
                    <View style={styles.border}/>
                    </>}
                   

                    </View>
                <View/>

            </View>
        )
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
    textView:{paddingHorizontal:5},
    border:{
        height:1,
        width:'70%',
        backgroundColor:'black'
    },
    priceDetail:{  alignItems:"flex-end",
    flex:1,
    marginEnd:22,
    marginTop:25},

    alignRigntText:{
      textAlign:'right'
    }
    
  });

CartItem.contextType = CartContext