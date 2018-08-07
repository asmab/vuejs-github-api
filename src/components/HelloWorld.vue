<template>
  <div class="hello">
    checkkkkk repos : {{ repos }}
  </div>
</template>

<script>

const axios = require('axios')
import RepoService from '@/services/RepoService'


export default {
  name: 'HelloWorld',
  data () {
    return {
      reposData: null
    }
  },
    computed: {
      repos () {
          //return this.$store.state.words.slice().reverse()

          return this.getRepo()
      }
  },
  methods: {
      async getRepo () {
          const response = await RepoService.getRepo()
          console.log('response', response)
          this.reposData = response

          return this.reposData
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
