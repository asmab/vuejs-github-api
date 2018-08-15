import Api from '@/services/Api'
import axios from 'axios'

//const accessToken = '4951cdd1649d7a05a97c35116e334f6e99bce013'

export default {
    //'?access_token='+accessToken
    getOrgInfo(companyName) {
        return Api().get('/orgs/' + companyName)
    },
    getOrgMembers(companyName) {
        return Api().get('/orgs/' + companyName + '/public_members')
    },
    getRepositories() {
        return Api().get('/orgs/futurice/repos')
    },
    getContributors(repo_name){
        return Api().get('/repos/' + repo_name + '/contributors')
    } 
}