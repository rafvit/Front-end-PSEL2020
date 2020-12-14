import React, { useState, useEffect } from 'react'
import { TextInputMask } from 'react-native-masked-text'
import {
    KeyboardAvoidingView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,

} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../../service/api'

export default function Atualiza({ navigation }) {

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nivel, setNivel] = useState('')
    const [cpfField, setCpfField] = useState('')

    useEffect(() => {
        handleChangeData()

    }, [])

    async function handleChangeData() {
        try {
            const id = await AsyncStorage.getItem('id')
            const response = await api.get(`/usuario/${id}`)
            console.log(response.data)

            const { name, cpf, email, nivel } = response.data
            setName(name)
            setEmail(email)
            setCpf(cpf),
            setNivel(nivel)
        }
        catch (response) {
            Alert.alert(response.data.error)
        }

    }

    async function handleSubmit() {

        try {
            const id = await AsyncStorage.getItem('id')
            if (senha != '') {
                const response = await api.put(`/usuario/${id}`, {
                    name,
                    cpf,
                    email,
                    senha,
                    nivel

                })
            }
            else{
                const response = await api.put(`/usuario/${id}`, {
                    name,
                    cpf,
                    email,
                    nivel

                })
            }
            
            Alert.alert('Sucesso', 'Cadastro atualizado')
            Alert.alert(response.data.message)
        } catch (response) {
            Alert.alert(response.data.error)
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    placeholder="Nome"
                    style={styles.input}
                    onChangeText={(value) => setName(value)}
                    value={name}
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
                    placeholder="email"
                    style={styles.input}
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                />
                <TextInput
                    placeholder="senha"
                    style={styles.input}
                    onChangeText={(value) => setSenha(value)}
                    value={senha}
                    secureTextEntry = {true}

                />
                <TouchableOpacity style={styles.btnCadastrar} onPress={handleSubmit}>
                    <Text style={styles.btnTextCadastrar}>Atualizar</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divLogo: {
        minWidth: '100%',
        alignItems: 'center',
        minHeight: 150,
        justifyContent: 'center',
        padding: 6,
        marginTop: 20,
    },
    form: {
        flex: 1,
        backgroundColor: '#353839',
        alignItems: 'center',
        justifyContent: 'center',
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
    btnCadastrar: {
        backgroundColor: '#ff0000',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderBottomWidth: 3,
        marginBottom: 10
    },
    btnTextCadastrar: {
        color: '#fff',
        fontSize: 20,
    },
    btnTextVoltar: {
        color: '#fff',
        fontSize: 20,
    },
})