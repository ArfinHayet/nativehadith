import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../routes/Home';
import Save from '../Screens/Save';
import React from 'react';
import {StyleSheet,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style.js';
const Tab = createBottomTabNavigator();



function Bottom(){

  return(
  	<Tab.Navigator
          tabBarOptions={
          	{
          	style: {
          		backgroundColor:'#1c1c1c',
          		borderTopWidth: 0
          	},
          	showLabel: false 
          }}>   
  	  <Tab.Screen name="name" component={Home}
  	  options={{ tabBarIcon : ({focused}) => <Icon name="home" size={30} style={focused ? styles.icon : styles.ic} /> }}
  	  />
  	  <Tab.Screen name="save" component={Save}
  	  options={{ tabBarIcon : ({focused}) => <Icon name="book" size={30} style={focused ? styles.icon : styles.ic} /> }}/> 
  	</Tab.Navigator>
  )
}

export default Bottom;