import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{Component, useState,useEffect} from 'react';
import  AppLoading  from "expo-app-loading";
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {store} from '../Redux/globalReducer'
import { ScrollView } from 'react-native-gesture-handler';


export default function Password({navigation})
{    
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [editable,setEditable] = useState(true)
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
  const del = () =>{
    axios.delete(`http://10.0.0.6:3000/passwords/${data._id}`,data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Homepage'))
  }
  const changeState = ()=>{
    setEditable(!editable)
    if(!editable){
      navigation.navigate('Passwords')
    }
  }

  const submit  = () =>{
    axios.put(`http://10.0.0.6:3000/passwords/${data._id}`,data,
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
        <View style={{position:'absolute',elevation:4}}>
        <Icons onPress={() => navigation.goBack()} 
        name={'arrow-back'} size={30} 
        color='#F0F5F9' style={styles.iconback}/>
              <Text style={styles.heading}>Passwords</Text>
              <Icons onPress={() => navigation.goBack()} 
        name={'search'} size={30} 
        color='#F0F5F9' style={styles.iconsearch}/>
            </View>
        <ScrollView style={styles.scroll}>
        <View style={[styles.screenview],{alignItems:'flex-start'}}>
            <Text style={styles.fieldname}>{"\n"}Name</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"name"})}
            placeholder='Name'
            placeholderTextColor= '#F0F5F9'
            defaultValue = {data.name}
            disabled = {editable}
            />

            <Text style={styles.fieldname}>{"\n"}Category</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"category"})}
            placeholder='Category'
            defaultValue = {data.category}
            disabled = {editable}
            placeholderTextColor= '#F0F5F9'
            />

            <Text style={styles.fieldname}>{"\n"}URl</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"url"})}
            placeholder='URL'
            defaultValue = {data.url}
            disabled = {editable}
            placeholderTextColor= '#F0F5F9'
            />

            <Text style={styles.fieldname}>{"\n"}User Name</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"username"})}
            placeholder='User Name'
            defaultValue = {data.username}
            disabled = {editable}
            placeholderTextColor= '#F0F5F9'
            />

            <Text style={styles.fieldname}>{"\n"}Email</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"email"})}
            placeholder='Email'
            defaultValue = {data.email}
            disabled = {editable}
            placeholderTextColor= '#F0F5F9'
            />

            <Text style={styles.fieldname}>{"\n"}Password</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"password"})}
            placeholder='Password'
            // secureTextEntry = {true}
            defaultValue = {data.password}
            disabled = {editable}
            placeholderTextColor= '#F0F5F9'
            />

            <Text style={styles.fieldname}>{"\n"}Note</Text>
            <TextInput style={styles.fieldinput}
            onChangeText={text =>handleInput({value:text,name:"note"})}
            defaultValue = {data.note}
            disabled = {editable}
            placeholder='Note'
            placeholderTextColor= '#F0F5F9'
            />

            {editable?(<TouchableOpacity
              onPress={changeState}><Text>Edit</Text></TouchableOpacity>):(
                <>
                <TouchableOpacity
                onPress={changeState}><Text>Cancel</Text></TouchableOpacity>
                <TouchableOpacity
            onPress={del}><Text>Delete</Text></TouchableOpacity>
              <TouchableOpacity
                onPress={submit}><Text>Submit</Text></TouchableOpacity>
                </>)}
                </View>
            </ScrollView>
          </View> 
    );
}}