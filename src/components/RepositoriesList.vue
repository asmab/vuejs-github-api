<template>
    <div class="row">        
        <div class="col table-wrapper">

            <table class="table reposTable table-hover"  >
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
                <tbody>
                    <tr v-for="(rep,index) in reposData" @click='onClickRow(rep,index)' >
                        <td scope="row">{{index+1}}</td>
                        <td>{{ rep.name}}</td>
                        <td> {{ dateFormatter(rep.created_at) }}</td>
                        <td> {{ rep.language}} </td>
                        <td>
                            <span v-if="rep.license"> {{ rep.license.name}}</span>
                            <span v-else> Not defined </span> 
                        </td>
                        <td> <a v-bind:href="rep.svn_url" target="_blank">Github</a> </td>
                    </tr>       
                </tbody>
            </table>

        </div>
        <div class="col">
            <repository-details :repositoryData="repositorySelected" />
            <!-- {{ repositorySelected}} -->
            
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
            isSelected: false,
            repositorySelected: {}
        }
    },
    methods: {
        dateFormatter(date){
            return date.substring(0, 10);
        },
        onClickRow(repository,index){
            this.isSelected= true
            this.repositorySelected = repository
        }
    }
}
</script>

<style lang="scss" scoped>

.table-wrapper {
    max-height: 300px;
    overflow-y: scroll;
}
.reposTable {
    height: 500px;
    overflow-y: scroll;
    text-align: left;
    font-size:12px;
    table-layout: fixed;
    white-space: nowrap;
    tr {
        cursor: pointer;
    }
    td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

}

.selected {
    background-color: red;
}
</style>