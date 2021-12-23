import React from 'react';
import {useEffect,useState} from 'react';
import {Alert,Text,View,ScrollView,TouchableOpacity,Modal,Image} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style.js';

const db = openDatabase({name: 'hadith.db'});
function Save({navigation}){

 const [data,setData]= useState([]);
 const [mload,setMload]= useState(false)
 const [sd,setSd] = useState([]);
 const [dload,setDload] = useState(true);

 function fetch(){
 	db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hadith',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i)); }
            setData(temp);
            setDload(false);
        }
      );
    });
    repeat = setTimeout(fetch, 6000);
 }

 function view(){
    fetch();
 }

 function fetch2(a){
    setSd([])
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hadith where id = ?',
        [a],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
            setSd(temp);
          }
        }
      );
    });
  } 
 
 function del(a){
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE  FROM hadith where id = ?',
        [a]
      );
    });
    setData([])
    fetch();
    setMload(!mload)
 }

 useEffect(()=>{
 	fetch();
 },[])
 return(
 	<View style={styles.cont}>

    <Modal
          animationType="slide"
          transparent={false}
          visible={mload}
          onRequestClose={() => { 
            setMload(!mload);   
          }}
        >
      <View style={styles.mod}>
         {sd.map(item=>(
          <View key={item.id}>
           <View style={styles.nav}>
             <TouchableOpacity
              style={{marginLeft:20}}
              onPress={()=> setMload(!mload)}><Icon name="angle-left" size={40} color="white"/>
             </TouchableOpacity>

             <TouchableOpacity
              style={{position:'absolute',right:25,top:15}}
              onPress={()=> del(item.id)}>
               <Icon
                name="trash" size={25} color="white"/>
              </TouchableOpacity>

           </View>
           <ScrollView style={{padding:20}}>
            <View style={styles.el1}>
             <Text style={styles.txt}>{item.code} | {item.section}</Text>       
            </View>

            <View style={styles.el1}>
             <Text style={styles.txt}>{item.haditha}</Text>
            </View>
            <View style={styles.el1}>
             <Text style={styles.txt}>{item.hadith}</Text>
            </View>
            {item.footnote ?<View style={styles.el}>
             <Text style={styles.txt}>{item.footnote}</Text>
            </View> : <></>}
            <View style={styles.el2}>
             <TouchableOpacity onPress={()=> { var val=item.book; setMload(!mload); fetch3(val);}}>
             <Text style={styles.txt}>
               <Text style={{fontWeight:'bold'}}>Book : </Text>{item.book}
             </Text>
             </TouchableOpacity>
             <Text style={styles.txt}><Text style={{fontWeight:'bold'}}>Narater : </Text>{item.narater}</Text>
             <Text style={styles.txt}><Text style={{fontWeight:'bold'}}>Chapter : </Text>{item.chapter}</Text>
             <Text style={styles.txt}><Text style={{fontWeight:'bold'}}>Status : </Text>{item.status}</Text>
            </View>
           </ScrollView>
          </View>
         ))}
         </View>
    </Modal>
    <Text style={{fontSize:30,color:'white',padding:20,}}>Offline</Text>
    {dload ? <Image
      style={{width:150,height:150,alignSelf:'center',justifyContent:'center'}}
      source={require('../assets/loading.gif')}   
    /> : <></>}   
 	  {dload ? <></> :<ScrollView style={{padding:20}}>
			 {data.map(item=>(
			   <TouchableOpacity key={item.id} onPress={()=> {setMload(!mload); fetch2(item.id)}}>
			       <View style={styles.el1}>             
	            <Text style={styles.txt}>{item.book}</Text>
	            <Text style={styles.txt}>{item.hadith.substring(0,90)}...</Text>
	           </View>
	           </TouchableOpacity>
			 ))}
    <Text style={{marginBottom:50}}></Text>
		</ScrollView> }
 	</View>
 )
}



export default Save;