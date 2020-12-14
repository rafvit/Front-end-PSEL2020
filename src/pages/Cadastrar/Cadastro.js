import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

import api from '../../service/api'

export default function Cadastro({navigation}){

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpfField, setCpfField] = useState('')

    async function handleSubmit() {
        try{

        const response = await api.post('/usuario', {
            name: nome,
            cpf,
            email,
            senha,
            nivel:1

        })
        
        Alert.alert('Sucesso', 'Cadastrado com sucesso')
        navigation.navigate('Login')
      }
        
        catch(response){
            Alert.alert(response.data.error)
        }
    }
    return(
        <KeyboardAvoidingView style={styles.background}>
      <View>
        <Text style={styles.title}>
          CADASTRO
        </Text>
      </View>
      <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Nome"
          autoCorrect={false}
          onChangeText={(value) => setNome(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInputMask
         placeholder="CPF"
         type={'cpf'}
         value={cpf}
         style={styles.input}
         onChangeText={(text, ref = null) => setCpf(text)}
         ref={(ref) => {
             setCpfField(ref)
         }}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={(value) => setSenha(value)}
          secureTextEntry = {true}
        />
        <TouchableOpacity 
        style={styles.btnSalvar}
        onPress={handleSubmit}
        >
          <Text style={styles.txtSalvar}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#353839',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      paddingBottom: 150
    },
    input:{
      backgroundColor:'#fff',
      width:'90%',
      marginBottom:15,
      color:'#222',
      fontSize:17,
      borderRadius: 8,
      padding:10
    },
    title:{
      fontSize:20,
      margin:50,
      padding: 50,
      color:'#fff'
  
    },
    btnSalvar:{
      backgroundColor:'#ff0000',
      width:'90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderBottomWidth: 3,
  
    },
    txtSalvar:{
      color: '#fff',
      fontSize:18
    },
  });