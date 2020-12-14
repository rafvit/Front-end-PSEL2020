import axios from 'axios'

const api = axios.create({
    baseURL:'http://192.168.1.106:5001'

})

api.interceptors.response.use((response) =>{

    if(response.data.error){
        throw response
    }else{
        return response
    }
})

export default api