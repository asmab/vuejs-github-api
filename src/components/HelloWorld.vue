<template>
  <div class="container">

    <h3>Futurice Github repositories # {{total}}</h3>

    <div class="row">
        <div class="col chart-wrapper">
          <chart-component :reposData="reposData"/>
      </div>
    </div>

    <div class="row">
        <repositories-list :reposData="reposData"/>
    </div>

  </div>

</template>

<script>

import RepoService from '@/services/RepoService'
import ChartComponent from '@/components/ChartComponent'
import RepositoriesList from '@/components/RepositoriesList'

import { Chart } from 'chart.js'
import 'chart.piecelabel.js'


export default {
  name: 'HelloWorld',
  components: { ChartComponent, RepositoriesList },
  data () {
    return {
      total: 0,
      reposData: []
    }
  },
  created() {
    this.getRepositories()
  },
  methods: {
      async getRepositories () {
        const response = await RepoService.getRepositories()
        this.reposData = response.data
        this.total = this.reposData.length
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color: red;

h3 {
  color: $color;
  margin-bottom: 20px;
}

.row {
  margin-bottom: 20px;
}

.chart-wrapper {
    width: 100%;
    text-align: center;
}
</style>
