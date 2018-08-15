<template>
  <div class="container">
    <div class="title-wrapper">
      <p> <span class="title">Dashboard :</span> Overview and latest statistics </p>       
      <hr>
    </div>

    <!-- Top section : General statistics -->
    <div class="row">
      <top-statistic-component :reposData="reposData"/>
    </div>

    <!-- Second section : Donut and bar charts -->
    <div class="row">
        <div class="chart-wrapper">
            <chart-component :reposData="reposData"/>
        </div>
    </div>

    <!-- Bottom section : Repositories List -->
    <div class="row">
        <repositories-list :reposData="reposData"/>
    </div>

  </div>

</template>

<script>

import RepoService from '@/services/RepoService'
import ChartComponent from '@/components/ChartComponent'
import RepositoriesList from '@/components/RepositoriesList'
import TopStatisticComponent from '@/components/TopStatisticComponent'

import { Chart } from 'chart.js'
import 'chart.piecelabel.js'

export default {
  components: { ChartComponent, RepositoriesList , TopStatisticComponent},
  data () {
    return {
      reposData: []
    }
  },
  created() {
    this.getRepositories()
  },
  methods: {
    getRepositories () {
       // Organisation's repositories
        RepoService.getRepositories()
        .then((response) => {
            this.reposData = response.data
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


.title-wrapper {
  text-align: left;
  margin-bottom: 0px;

  .title {
    font-weight: bold;
    font-size: 20px;
  }
}

.row {
  margin-bottom: 20px;
}

.top-wrapper{
  background-color: #fcf8f7;
  border-radius: 5px;
}

.chart-wrapper {
  width: 100%;
  text-align: center;
}

</style>
