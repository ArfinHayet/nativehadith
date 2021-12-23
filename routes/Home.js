import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet,View,Text,Alert} from 'react-native';
import Search from '../Screens/Search';
import Hadith from '../routes/Hadith';
import Save from '../Screens/Save';

const Stack = createStackNavigator();
 
function Home({navigation}){ 
 
	return(
	  
	  <Stack.Navigator
	     screenOptions={{
		    headerShown: false
		  }}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Hadith" component={Hadith} />
      </Stack.Navigator>
      
	)
}

const styles = StyleSheet.create({
  se:{
  	padding:50,
  	fontSize:80,
  }
});

export default Home