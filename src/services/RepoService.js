import Api from '@/services/Api'
const link = "https://api.github.com"
import axios from 'axios'
const accessToken = '4951cdd1649d7a05a97c35116e334f6e99bce013'
export default {

    getRepositories() {
        return Api().get('/orgs/futurice/repos'+'?access_token='+accessToken)
    },
    getContributors(repo_name){
        console.log('/repos/'+ repo_name + '/contributors'+'?access_token='+accessToken)
        return Api().get('/repos/'+ repo_name + '/contributors'+'?access_token='+accessToken)
    } 
}