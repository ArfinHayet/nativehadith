import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {StyleSheet,Text,View,TouchableOpacity,Modal,TextInput,ScrollView} from 'react-native';
import {useState,useEffect} from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style.js';
const Tab = createMaterialTopTabNavigator();

import Listing from '../Screens/Listing';
import Book from '../Screens/Book';
import Narater from '../Screens/Narater';
import Search from '../Screens/Search';
import Sbox from '../Screens/Sbox';




function Hadith({route, navigation}){ 
	var val = route.params.type;
    
  function handley(a){
    var val = a;
  }

	return( 
  <>
    <Sbox fu={navigation}/>
	  <Tab.Navigator 
	  tabBarOptions={
          	{
          	style: {
          		backgroundColor:'#1c1c1c',
          	},
          	labelStyle:{color:'white'},
            indicatorStyle:{
            backgroundColor:'white'
          },
           showLabel: true ,
           showIcon: true
          }}
          >
      <Tab.Screen name="All"
      options={{ tabBarIcon : (focused) => <Icon name="list" size={24} color="#ddd" /> }}
      component={Listing}
      initialParams={{typ:val}}
      />
      <Tab.Screen name="Book"
      component={Book}
      initialParams={{typ:val}}
      options={{ tabBarIcon : (focused) => <Icon name="book" size={24} color="#ddd"/> }}
      />
      <Tab.Screen name="Naratter"
      component={Narater}
      initialParams={{typ:val}}
      options={{ tabBarIcon : (focused) => <Icon name="user" size={24} color="#ddd"/> }}
      />
      
    </Tab.Navigator>
    </>
  )
}

export default Hadith;  