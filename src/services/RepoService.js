import Api from '@/services/Api'
const link = "https://api.github.com"
import axios from 'axios'

export default {

    getRepo() {
        return Api().get('/orgs/futurice/repos').then(response => console.log(response.data))

    }
}