<template>
  <div class="hello">

    <div class="container">
      <h3>Futurice Github repositories # {{total}}</h3>

    <table class="table">
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
        <tr v-for="(rep,index) in reposData">
          <th scope="row">{{index+1}}</th>
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
  </div>
</template>

<script>

import RepoService from '@/services/RepoService'

export default {
  name: 'HelloWorld',
  data () {
    return {
      reposData: [],
      total: 0
    }
  },
  mounted() {
    this.getRepositories()
  },
  methods: {
      async getRepositories () {
          const response = await RepoService.getRepositories()
          this.reposData = response.data
          this.total = this.reposData.length
      },
      dateFormatter(date){
        return date.substring(0, 10);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color: red;

h2{
  color: $color;
}
.container {
  width:690px;
  float: left;
}


table {
  display: block;
  height: 500px;
  overflow-y: scroll;
  text-align: left;

  tr>td:nth-child(1),
  tr>th:nth-child(1)  {
    width: 5px;
  }

  tr>td, tr>th {
    width:120px;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
}

</style>
