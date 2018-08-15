<template>
    <div class="row" >    
        <div class="col">
            <div class="tbl-header">
                <!--Repositories List-->
                <table cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Language</th>
                            <th>License</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="tbl-content">
                <table class="table-hover" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                        <tr v-for="(rep,index) in reposData" @click='onClickRow(rep,index)'>
                            <td scope="row">{{index+1}}</td>
                            <td>{{ rep.name}}</td>
                            <td> {{ dateFormatter(rep.created_at) }}</td>
                            <td> {{ rep.language}} </td>
                            <td>
                                <span v-if="rep.license"> {{ rep.license.name}}</span>
                                <span v-else> Not defined </span> 
                            </td>
                            <td> <a v-bind:href="rep.svn_url" target="_blank">Github</a></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Repository's details (contributors, ..)-->
        <div class="col">
            <repository-details :repositoryData="repositorySelected" />            
        </div>

    </div>
</template>

<script>
import RepositoryDetails from '@/components/RepositoryDetails'

export default {
    components: { RepositoryDetails},
    props:{
        reposData: { required: true }
    },
    data () {
        return {
            repositorySelected: {}
        }
    },
    methods: {
        dateFormatter(date){
            return date.substring(0, 10);
        },
        onClickRow(repository,index){
            this.repositorySelected = repository
        }
    }
}  
</script>

<style lang="scss" scoped>

.row {
    margin-bottom: 20px;
}

table {
    width:100%;
    table-layout: fixed;  
}

.tbl-content {
    height:300px;
    overflow-x:auto;
    margin-top: 0px;
    border: 1px solid rgba(255,255,255,0.3);
}
th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: black;
    text-transform: uppercase;
    background-color: #ffcc80;
}

tr  {
    background-color: #fcf8f7;
    cursor: pointer;
}

td {
    padding: 15px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 12px;
    color: black;
    border-bottom: solid 1px rgba(255,255,255,0.1);
}

</style>