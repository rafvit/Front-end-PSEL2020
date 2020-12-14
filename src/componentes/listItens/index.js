import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import api from '../../service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

function ListItem({ data, navigation }) {

    
    async function desativar() {

        try {
            Alert.alert('Alerta', 'Deseja desativar esse usuário?', [
                { text: 'Não', style: 'cancelar' },
                {
                    text: 'Sim', onPress: async () => {
                        await api.put(`/usuario/${data._id}`, {

                            nivel:0
                        })


                    }
                },
            ])
        } catch (response) {
            Alert.alert(response.data.error)
        }
    }

    async function handlerNavigationUpdate(){

        await AsyncStorage.setItem('id',data._id)
        navigation.navigate('Atualizar')

    }

    function rightActions() {
        return (

            <View>
                <TouchableOpacity style={styles.buttonDesativar} onPress={() => desativar(data._id)}>
                    <Text style={styles.textButton}>Desativar</Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <Swipeable renderRightActions={rightActions}>
            <TouchableOpacity style={styles.container} onPress={ ()=> handlerNavigationUpdate()}>
                
                <View style={styles.divInfo}>
                    <Text style={styles.text}>Nome: {data.name}</Text>
                    <Text style={styles.text}>CPF: {data.cpf}</Text>
                    <Text style={styles.text}>email: {data.email}</Text>
                    <Text style={styles.text}>nivel: {data.nivel}</Text>
                       
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        height: 100,
        backgroundColor:'#fff',
        marginBottom: 15
    },
    text: {
        fontSize: 17,
    },
    textDesativado: {
        fontSize: 17,
        color: '#ff0000',
    },
    
    divInfo: {
        flex: 1,
        width: '70%',
        justifyContent: 'center',
    },

    buttonDesativar: {
        backgroundColor: '#ff0000',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        color: '#fff',
        fontSize: 18,
    },
})

export default ListItem