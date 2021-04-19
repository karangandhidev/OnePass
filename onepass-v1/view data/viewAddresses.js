import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import AppLoading  from "expo-app-loading";
export default function viewaddresses({navigation})
{    
 
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [editable,setEditable] = useState(true)
  const [deleteable,setdelete] = useState(true)

  const [data,setData]= useState(navigation.state.params.key)
 
 const handleInput = (e) =>{
    const {name,value} = e
    setData(values=>{
      return{
        ...values,
        [name]:value
      }
    })

  }
 
  const changeState = ()=>{
    setEditable(!editable)
    setdelete(!deleteable)
    if(!editable){
      navigation.navigate('Addresses')
    }
  }
  const del = () =>{
    axios.delete(`http://10.0.0.6:3000/address/${data._id}`,data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
      ).then(navigation.navigate('Homepage'))
  }
  const submit  = () =>{
    axios.put(`http://10.0.0.6:3000/address/${data._id}`,data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Homepage'))
  }
 
  if (!isLoaded) {
    return <AppLoading/>;
  } else { return (
    <View style={styles.background}>
    <View style={styles.header}>
      <Text style={styles.fakeheading}></Text>
    </View>
        
        
           
              {editable?(<View style={{position:'absolute',elevation:4,flexDirection:'row'}}>
                <Icons onPress={() => navigation.goBack()} 
                name={'arrow-back'} size={30} 
                color='#F0F5F9' style={styles.iconback}/>
                    <Text style={styles.heading}>Addresses</Text>
              <TouchableOpacity  style={styles.addbutton}
          onPress={changeState}><Text style={styles.addbuttontext}>Edit</Text></TouchableOpacity>
      </View>):(
            <View style={{position:'absolute',elevation:4,flexDirection:'row'}}>
            <TouchableOpacity style={styles.addbutton}
            onPress={changeState}
            ><Text style={styles.addbuttontext}>Cancel</Text></TouchableOpacity>
            <Text style={styles.heading}>Editing Mode</Text>
            <TouchableOpacity style={styles.addbutton}
            onPress={submit}><Text style={styles.addbuttontext}>Submit</Text></TouchableOpacity>
            </View>)}
            
        <ScrollView style={styles.scroll}>
        <View style={[styles.screenview],{alignItems:'flex-start'}}>
          <Text style={styles.fieldname}>{"\n"}Name</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"name"})}
          defaultValue = {data.name}
          disabled={editable}
          placeholder='Name' 
          placeholderTextColor= '#F0F5F9'
          />
        <Text style={styles.fieldname}>{"\n"}Apartment/Flat</Text>
        <TextInput style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"apartment"})}
        defaultValue = {data.apartment}
        disabled={editable}
        placeholder='Aparthment / Flat'
        placeholderTextColor= '#F0F5F9'
        />
        <Text style={styles.fieldname}>{"\n"}Street</Text>
        <TextInput  style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"street"})}
        defaultValue = {data.street}
        disabled={editable}
        placeholder='Street'
        placeholderTextColor= '#F0F5F9'
        />
        <Text style={styles.fieldname}>{"\n"}Landmark</Text>
        <TextInput  style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"landmark"})}
        defaultValue = {data.landmark}
        disabled={editable}
        placeholder='Landmark'
        placeholderTextColor= '#F0F5F9'
        />
        <Text style={styles.fieldname}>{"\n"}City</Text>
        <TextInput style={styles.fieldinput}
          defaultValue = {data.city}
          disabled={editable}
          onChangeText={text =>handleInput({value:text,name:"city"})}
          placeholder='City'
          placeholderTextColor= '#F0F5F9'
        />
        <Text style={styles.fieldname}>{"\n"}State</Text>
        <TextInput  style={styles.fieldinput}
        defaultValue = {data.state}
        disabled={editable}
        onChangeText={text =>handleInput({value:text,name:"state"})}
        placeholder='State'
        placeholderTextColor= '#F0F5F9'
        />
        <Text style={styles.fieldname}>{"\n"}Country</Text>
        <TextInput  style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"country"})}
        placeholder='Country'
        defaultValue = {data.country}
        disabled={editable}
        placeholderTextColor= '#F0F5F9'
        />
         <Text style={styles.fieldname}>{"\n"}Pin-Code</Text>
        <TextInput  style={styles.fieldinput}
          defaultValue = {data.pincode}
          disabled={editable}
        onChangeText={text =>handleInput({value:text,name:"pincode"})}
        placeholder='Pin-Code'
        placeholderTextColor= '#F0F5F9'
        />
         {deleteable?null:(
         <><TouchableOpacity style={styles.addbutton}
            onPress={del}><Text style={[styles.addbuttontext],{color:'black'}}>Delete</Text></TouchableOpacity>
            </>)}
            </View>
            </ScrollView>
          </View> 
    );
}}