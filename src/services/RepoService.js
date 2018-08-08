import Api from '@/services/Api'
const link = "https://api.github.com"
import axios from 'axios'
const accessToken = '30c7a960b97aeba9a128679fce4268569c9d686e'
export default {

    getRepositories() {
        return Api().get('/orgs/futurice/repos'+'?access_token='+accessToken)
    },
    getContributors(repo_name){
        return Api().get('/repos/'+ repo_name + '/contributors'+'?access_token='+accessToken)
    } 
}