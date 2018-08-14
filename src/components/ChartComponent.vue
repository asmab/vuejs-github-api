<template>
<div class="container">
    <div class="row">
        <div class="col">
            <div class="donut-canvas-wrapper">
                <canvas class="donutChart" style="display: inline-block" ref="repositoriesByLanguageChart"></canvas>
            </div>
        </div>
        <div class="col">
            <div class="bar-canvas-wrapper">
                <canvas id="bar-chart" style="display: inline-block"></canvas>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Chart } from 'chart.js'
import 'chart.piecelabel.js'

const languages = ['JavaScript', 'Ruby', 'Objective-C']
const years = ['2010','2011','2012','2013','2014']

export default {
    props:{
        reposData: {
            required: true
        }
    },
    data () {
        return {
            total: 0,
            colors: {
                red: 'rgb(251, 0, 6)',
                orange: 'rgb(255, 159, 64)',
                yellow: '#FDC02F',
                green: 'rgb(75, 192, 192)',
                blue: '#288AE2',
                purple: 'rgb(153, 102, 255)',
                lightgrey: '#ECEFF1',
                darkgrey: '#404040'
            },
            barChartData: [],
            secondChartData:[]
        }
    },
    watch: {
        reposData: function (val) {


           // Prepare for Donut Chart
            var sum = 0
            languages.forEach(language => {
                const total = this.getProjectsByLanguage(val,language)
                sum+= total
                this.barChartData.push(total)
            })
            
            const rest = val.length - sum
            this.barChartData.push(rest)

            // Prepare for Bar Chart
            years.forEach(year => {
                const total = this.getProjectsByDate(val,year)
                this.secondChartData.push(total)
            })


            this.prepRepositoriesByLanguageChart()
        }
    },

    methods:{
        prepRepositoriesByLanguageChart () {

            // Donut chart
            var context = this.$refs.repositoriesByLanguageChart.getContext('2d')
            var config = this.commonDoughnutConfig()
            config['data'] = this.prepData()
            var chart = new Chart(context, config)


            // Bar chart 
            var context2 = document.getElementById("bar-chart")
            var config2 = this.commonBarConfig2()
            var secondChart = new Chart(context2, config2);
        },
        prepData () {

            return {
                // Note that the ordering of entries acrosss data, backgroundColor 
                // and labels must correspond.                 
                datasets: [{
                    data: this.barChartData,
                    backgroundColor: [
                        this.colors.red,
                        this.colors.yellow,
                        this.colors.blue,
                        this.colors.green
                    ],
                    label: 'Projects by language',
                    borderWidth: [0, 0, 0],
                    strokeColor: "#FF0000"
                }],
                labels: languages.concat(['Other'])
            }      
        },
        getProjectsByLanguage(data,languageName){ 
            var total = []
            data.forEach(repo => {
                if (repo.language === languageName) total.push(repo)
            })
            return total.length
        },
        getProjectsByDate(data,year){
            var total = []
            data.forEach(repo => {
                const newdate= new Date(repo.created_at)
                if (newdate.getFullYear().toString() === year) {
                    total.push(repo)
                }
            })
            return total.length
        },
        commonDoughnutConfig () {
            return {
                type: 'doughnut',
                options: {
                    pieceLabel: {
                        render: 'value',
                        fontSize: 11,
                        position: 'outside'
                    },
                    //cutoutPercentage: 70,
                    responsive: true,
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontSize: 11
                        }
                    },
                    animation: {
                        animateScale: false,
                        animateRotate: true
                    }
                }
            }
        },
        commonBarConfig2 (){
            return {
                type:'bar',
                data: {
                    labels: years,
                    datasets: [ 
                        { 
                            label: 'projects/year',
                            backgroundColor:[
                                this.colors.red,
                                this.colors.yellow,
                                this.colors.blue,
                                this.colors.green,
                                this.colors.purple
                            ],
                            // ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                            data: this.secondChartData
                        }
                    ]                   
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Projects per year'
                    }
                }
            }
        },
        configureChartGlobals () {
            //Chart.defaults.global.defaultFontColor = '#333'
            //Chart.defaults.global.defaultFontFamily = 'Open Sans'
            //Chart.defaults.global.defaultFontSize = '16px'
            Chart.defaults.global.defaultFontStyle = 'bold'
        }
    }
}

</script>


<style lang="scss" scoped>

   .donutChart {
        width: 300px;
    }
    .donut-canvas-wrapper{
        background-color: #fcf8f7;
        //margin-bottom:20px;
    }
    .bar-canvas-wrapper{
        background-color: #fcf8f7;
    }
</style>