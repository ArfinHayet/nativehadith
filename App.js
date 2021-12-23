import React,{Component,useEffect,useState} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import styles from './style.js';
import Bottom from './routes/Bottom';
import Save from './Screens/Save';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import NetInfo from "@react-native-community/netinfo";
  
                   
function app(){  
    const [d,setD] = useState(false)
    function unsubscribe(){
       return  NetInfo.fetch().then(state => {     
          return state.isConnected;
        });
   
    }
    unsubscribe().then(res=>{
        setD(res);
    }); 
    useEffect(()=>{
       SplashScreen.hide()

    },[]) 
                 
  return (
   <>
   {d ? <NavigationContainer>
     <Bottom/>
   </NavigationContainer> : <Save/>}
   </>
  )
}


export default app;