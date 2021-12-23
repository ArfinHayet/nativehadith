import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,TextInput,ScrollView} from 'react-native';
import {useState,useEffect} from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../Screens/Search';
import axios from 'axios';
function Sbox({fu}){
	return(
	<View style={styles.se}>
    <TouchableOpacity onPress={()=> { fu.navigate('Search'); } }><Icon name="search" size={20} color="white"/>
    </TouchableOpacity>   
  </View>
  )
}

const styles = StyleSheet.create({

  se:{
    backgroundColor:'#1c1c1c',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    paddingRight:30,
    paddingTop:15,
    paddingBottom:5,
  },
  
  
  
});

export default Sbox