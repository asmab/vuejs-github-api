import Api from '@/services/Api'
const link = "https://api.github.com"
import axios from 'axios'
const accessToken = 'ba249487a627a968d58253d50b67378a618167a5'
export default {

    getRepositories() {
        return Api().get('/orgs/futurice/repos'+'?access_token='+accessToken)
    },
    getContributors(repo_name){
        console.log('/repos/'+ repo_name + '/contributors'+'?access_token='+accessToken)
        return Api().get('/repos/'+ repo_name + '/contributors'+'?access_token='+accessToken)
    } 
}