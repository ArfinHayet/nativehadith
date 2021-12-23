import React from 'react'
import {Image,View,StyleSheet,TextInput,Text,FlatList,ScrollView,Button,Platform,Alert,TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style.js';
import Hadith from '../routes/Hadith';


function Search({navigation}){
  const [datas,setDatas]= useState([])  
  const [searc,setSearc]= useState('')
  const [load,setLoad]= useState(false)
  const [vis,setVis] = useState(false);
  

	function sea(){
       axios.post('http://bonikapp.com/hadith/live')
      .then(res=> {setDatas(res.data.message); setVis(true)})       
      .catch(err=> console.log(err))   
	 }

    

   function handleChange(text){
       setSearc(text)
       setLoad(true)  
   }

   function seer(){
     if(searc != null){
       navigation.navigate('Hadith',{type: searc})
     }
   }
   


  useEffect(()=>{   
    sea();

  },[])
	return(
	 <View style={styles.container}>   
     <View style={styles.inp}>  
      <TextInput 
      style={styles.in}
      placeholder="Search hadith by Keyword ,Book, Narater"
      placeholderTextColor="grey"
      onChangeText={text => handleChange(text)}/> 
      <TouchableOpacity onPress={seer}>
      <Icon name="search" size={20} color="#ddd" style={{marginTop:10}} />
      </TouchableOpacity>
     </View>

      {load? <View style={styles.li}>  
         <ScrollView> 
          {vis ? <></> : <Image
            style={{width:150,height:150,alignSelf:'center',justifyContent:'center'}}
            source={require('../assets/loading.gif')}   
          />}
          {datas.filter((item)=>{
             if(searc === ""){
                setLoad(false)
                return null;
              }             

             if(item.name.toLowerCase().includes(searc.toLowerCase())){
                return item;
              }
          }).map(item=>(
            <ListItem 
             containerStyle={{backgroundColor:'#333333'}}
             key={item.id}>
             <Text style={styles.el}
             onPress={()=> navigation.navigate('Hadith',{type: item.name})}
             >{item.name}</Text>
            </ListItem>
            ))}  
          </ScrollView>     
      </View>:<Text style={styles.hide}>Hey</Text>}

      <View style={{marginLeft:10}}>

      <View style={{flexDirection:'row',marginLeft:10}}>
        <Icon name="book" size={30} color="#ddd" style={{marginRight:10}} />
        <Text style={{color:'white',fontSize:20}}>Book</Text>
      </View>


      <ScrollView
      horizontal={true}
      > 
       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'সহীহ বুখারী'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/books.png')}   
          />
       <Text style={{color:'white'}}>সহীহ বুখারী (তাওহীদ পাবলিকেশন)</Text>
       </TouchableOpacity>
       </View>


       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'সহীহ মুসলিম'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/books.png')}   
          />
       <Text style={{color:'white'}}>সহীহ মুসলিম (হাদীস একাডেমী)</Text>
       </TouchableOpacity>
       </View>


       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'সূনান আবু দাউদ'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/books.png')}   
          />
       <Text style={{color:'white'}}>সূনান আবু দাউদ (ইসলামিক ফাউন্ডেশন)</Text>
       </TouchableOpacity>
       </View>
      </ScrollView>





      <View style={{flexDirection:'row',marginLeft:10,marginTop:20}}>
        <Icon name="user" size={30} color="#ddd" style={{marginRight:10}} />
        <Text style={{color:'white',fontSize:20}}>Narater</Text>
      </View>


      <ScrollView
      horizontal={true}
      > 
       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'আবূ হুরায়রা (রাঃ)'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/man.png')}   
          />
       <Text style={{color:'white'}}>আবূ হুরায়রা (রাঃ)</Text>
       </TouchableOpacity>
       </View>


       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'ফাতিমা (রাঃ)'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/man.png')}   
          />
       <Text style={{color:'white'}}>ফাতিমা (রাঃ)</Text>
       </TouchableOpacity>
       </View>


       <View style={styles.card}>
       <TouchableOpacity onPress={()=> navigation.navigate('Hadith',{type: 'হাফসাহ (রাঃ)'}) }>
       <Image
            style={{width:50,height:50,marginBottom:5}}
            source={require('../assets/man.png')}   
          />
       <Text style={{color:'white'}}>হাফসাহ (রাঃ)</Text>
       </TouchableOpacity>
       </View>
      </ScrollView>
      </View>


    </View>
		)  
}  


export default Search;