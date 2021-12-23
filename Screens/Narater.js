import React from 'react'
import {Text} from 'react-native';
import {Button,View,StyleSheet,ScrollView,TouchableOpacity,Modal,Alert,Image} from 'react-native';
import axios from 'axios';
import {useState,useEffect} from 'react';
import styles from '../style.js';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {openDatabase} from 'react-native-sqlite-storage';


const db = openDatabase({name: 'hadith.db'});
function Narater(typ){  

  var val = typ.route.params.typ;
    const [i,setI] = useState(1);
    const [data,setData]= useState([])
    const [load,setLoad]= useState(false)
    const [mload,setMload]= useState(false)
    const [sd,setSd] = useState([])
    const [dload,setDload] = useState(true);
    const [btn,setBtn] = useState(false);

  function fetch(){
  axios.post('http://bonikapp.com/hadith/narater',{
    dat : val,
    page: i ,
  })
       .then(res=> {
        if(res.data.hadith.length == 100){
           setBtn(true);
        }
        setData(res.data.hadith); 
        setLoad(true); 
        setDload(false)})
       .catch(err=> console.log(err))        
   }

   function fetch2(a){
    setSd([])
      axios.post('http://bonikapp.com/hadith/val',{
        value : a,
      })
      .then(res=> {setSd(res.data.hadith);})
      .catch(err=> console.log(err))
    } 

    function fetch3(val){
    setData([])
  axios.post('http://bonikapp.com/hadith/fetch',{
    dat : val,
    page: i ,
  })
       .then(res=> {setData(res.data.hadith); setLoad(true);})
       .catch(err=> console.log(err))        
   }


   function create(){
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists hadith (id integer primary key not null,footnote longtext, haditha longtext, hadith longtext,code text, narater text, status text,section longtext, chapter longtext, book text);'
        );
      });
   }

   function dbs(text,chapter,section,status,narater,code,hadith,haditha,footnote){
    db.transaction(
        tx => {
          tx.executeSql('select * from hadith where code = ? ', [code], (_, { rows }) =>
            {
              if(rows.length == 0){
                  tx.executeSql('insert into hadith (book,chapter,section,status,narater,code,hadith,haditha,footnote) values (?,?,?,?,?,?,?,?,?)', [text,chapter,section,status,narater,code,hadith,haditha,footnote]);
                Alert.alert('Added offline')
              } else {
                Alert.alert('Already Added')
              }
            }
          );
        }
      );
   }


   function del(){
    db.transaction(tx => {
        tx.executeSql(
          'drop table hadith;'
        );
      });
      console.log('deleted')
   }


   const clos = ()=>{
    setMload(!mload);
   }

   function incre(){
    setI(i+1);
    setData([]);
    setDload(true);
    fetch();
   }


  useEffect(()=>{   
      fetch();
      create();
   },[]) 

  

  return(
     <View style={styles.cont}>
     <Modal
          animationType="slide"
          transparent={true}
          visible={mload}
          onRequestClose={() => { 
            setMload(!mload);   
          }}
        >
        <View style={styles.mod}>
         {sd.map(item=>(
          <View key={item.id}>
           <View style={styles.nav}>
             <TouchableOpacity onPress={()=> clos()}><Icon name="angle-left" size={40} color="white"/>
             </TouchableOpacity>

             <TouchableOpacity
              style={{position:'absolute',right:10,top:15}}
              onPress={()=> dbs(item.book,item.chapter,item.section,item.status,item.narater,item.code,item.hadith,item.haditha,item.footnote)}><Icon name="save" size={30} color="white"/>
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
            {item.footnote ?<View style={styles.el1}>
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
      <>{btn ? <Button onPress={()=> incre()} style={{color:'white'}} title="load More">Load More</Button> : <></>}</>
      <View style={styles.li1}> 
         {dload ? <Image
            style={{width:150,height:150,alignSelf:'center',justifyContent:'center'}}
            source={require('../assets/loading.gif')}   
          /> : <></>}
         {dload ? <></> : <ScrollView style={{padding:20}}>
       {data.map(item=>(
         <TouchableOpacity key={item.id} onPress={()=> {clos(); fetch2(item.id)}}>
         <View style={styles.el1}>
              <Text style={styles.txt}>{item.book}</Text>
              <Text style={styles.txt}>{item.hadith.substring(0,90)}...</Text>
             </View>
             </TouchableOpacity>
       ))}
       <Text style={{marginBottom:50}}></Text>
       </ScrollView>}
       </View>
    </View>
    )
}


export default Narater;