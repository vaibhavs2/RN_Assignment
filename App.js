/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useMemo,useState}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from "./src/screens/productList";
import ProductDetail from "./src/screens/productDetail";
import CartItem from './src/screens/cartItem';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CartContext} from './src/component/cartContext'



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      labelStyle:{
        fontSize:18,
        marginBottom:12
      }
  }}>
      <Tab.Screen name="Product" component={ProductList}  options={{ tabBarLabel: "Products" }} />
      <Tab.Screen name="Cart" component={CartItem}  options={{ tabBarLabel: "Cart"}} />
    </Tab.Navigator>
    
  );
}


const App: () => React$Node = () => {

  const [getCartItem, setCartItem] = useState([])


  const contexValue = useMemo(
    () => ({
      addToCart: async (itemList) => {
        setCartItem(itemList)
      },
      cartItem:getCartItem
    }),
    []
  );



  return (
<CartContext.Provider value={contexValue}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product" component={HomeTabs}  options={{ title: 'Products' }} />
        <Stack.Screen name="Detail" component={ProductDetail}  options={{ title: "Detail" }} />
      </Stack.Navigator>
    </NavigationContainer>
</CartContext.Provider>
  );
};



export default App;
