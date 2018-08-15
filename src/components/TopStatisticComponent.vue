<template>
<div class="chart-container">
    <div class="row">
        <div class="col">
            <div class="top-wrapper">
               <div class="content">
                    <span class="total"> {{ total }}</span> Github Repositories
               </div>
            </div>
        </div>
        <div class="col">
            <div class="top-wrapper">
                <div class="content">
                    <span class="total"> {{ publicRepos }}</span> Public Repositories
               </div>
            </div>
        </div>
        <div class="col">
            <div class="top-wrapper">
                <div class="content">
                    <span class="total"> {{ publicMembers }}</span> Public Members
               </div>
            </div>
        </div>
        <div class="col">
            <div class="top-wrapper">
                <div class="content">
                    <span class="total"> {{ publicGists }}</span> Public Gists
               </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import RepoService from '@/services/RepoService'

export default{

    props:{
       reposData: { required: true }
    },
    data(){
        return {
            total: 0,
            publicRepos: 0,
            publicMembers: 0,
            publicGists: 0
        }
    },
    watch:{
        reposData(val){
            // Total of repositories
            this.total = this.reposData.length
        }
    },
    mounted(){
        this.getOrgInfo('futurice')
        this.getOrgMembers('futurice')
    },
    methods: {
        getOrgInfo (companyName) {
            // Get repository's info (publicRepos, public gists, ...)
            RepoService.getOrgInfo(companyName)
            .then((response) => {
                this.publicRepos = response.data.public_repos
                this.publicGists = response.data.public_gists
            })          
        },
        getOrgMembers (companyName) {
            // Number of company public members
            RepoService.getOrgMembers(companyName)
            .then((response) => {
                this.publicMembers = response.data.length
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.top-wrapper{
    background-color: #fcf8f7;
    border-radius: 5px;
    display: inline-block;
    width: 262px;
    height: 100px;
}

.content{
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.total{
    font-size: 30px;
    font-weight: bold;
}

</style>
