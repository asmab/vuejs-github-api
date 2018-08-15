import Vue from 'vue'
import Router from 'vue-router'
import StatisticsComponent from '@/components/StatisticsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StatisticsComponent',
      component: StatisticsComponent
    }
  ]
})
