import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastrar/Cadastro'
import Listar from './pages/Listar/Listar'
import Atualizar from './pages/Atualizar/Atualizar'
import Atualiza from './pages/AtualizaUsuarios/Atualiza'

const appNavigation = createStackNavigator({
    Login: {
        screen: Login
    },
    Cadastro: {
        screen: Cadastro
    },
    Listar: {
        screen: Listar
    },
    Atualizar: {
        screen: Atualizar
    },
    Atualiza: {
        screen: Atualiza
    },
},

)

const Routes = createAppContainer(appNavigation)
export default Routes