import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function login({ navigation }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = async() => {
        console.log(email)
        console.log(senha)
        try{
            const resp = await api.post('/usuarios', {
                email,
                senha
            })
            console.log(resp.data)
            if(resp?.data?.usuario?.nivel == 1){
                console.log("1")
                await AsyncStorage.setItem('id',resp.data.usuario._id)
                navigation.navigate('Atualiza')

            }else if(resp?.data?.usuario?.nivel == 999){
                navigation.navigate('Listar')

            }else if(resp?.data?.usuario?.nivel == 0){
                Alert.alert("Erro","Usuário desativado!")
            }
            else{ 
                Alert.alert("Erro", resp.data.message)
            }
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View>
                <Text style={styles.title}>
                    LOGIN
        </Text>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    onChangeText={(e) => setEmail(e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    onChangeText={(s) => setSenha(s)}
                    secureTextEntry = {true}
                />
                <TouchableOpacity
                    style={styles.btnEntrar}
                    onPress={handleSubmit}
                >
                    <Text style={styles.txtEntrar}>
                        Entrar
          </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnCad}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={styles.txtCad}>
                        Registre-se
          </Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="light" />
        </KeyboardAvoidingView>
    );
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
        paddingBottom: 200
    },
    input: {
        backgroundColor: '#fff',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 8,
        padding: 10
    },
    title: {
        fontSize: 40,
        margin: 50,
        padding: 50,
        color: '#fff'

    },
    btnEntrar: {
        backgroundColor: '#ff0000',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderBottomWidth: 3,
        marginBottom:10

    },
    btnCad: {
        marginTop: 10,

    },
    txtEntrar: {
        color: '#fff',
        fontSize: 18
    },
    txtCad: {
        color: '#fff',
        fontSize: 18
    }
});
