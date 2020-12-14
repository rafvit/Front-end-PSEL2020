import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native'


import api from '../../service/api'

import ListItems from '../../componentes/listItens'

function UsersList({ navigation }) {
  const [usuario, setUsuario] = useState([])

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    handleDataUserList()
  }, [])

  async function handleDataUserList() {
    try {
      const response = await api.get('/usuarios')
      
      setUsuario(response.data)
      setRefresh(false)

    } catch (response) {
      Alert.alert(response.data.erro)
      setRefresh(false)
    }

  }

  function handleRefresh(){
    setRefresh(true)
    handleDataUserList()
  }

  return (
    <View style={styles.screen}>

      <View style={styles.divList}>
        <FlatList
          data={usuario}
          key={(item) => item._id}
          onRefresh = {() => handleRefresh()}
          refreshing = {refresh}   
          renderItem={({ item }) => (
            <ListItems data={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => (
            <View backgroundColor="#000" height={2} />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#353839',
  },
  textInformativo: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
    color: '#fff',
  },
  header: {
    marginTop: 10,
    maxHeight: 120,
  },
  buttonBack: {
    position: 'absolute',
    left: 1,
    top: 23,
    marginLeft: 10,
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divList: {
    flex: 1,
    width: '100%',
    top: 20
  },
})

export default UsersList