<template>
<div class="chart-container">
    <div class="row">
        <div class="col">
            <div class="canvas-wrapper">
                <canvas class="donutChart" style="display: inline-block" ref="repositoriesByLanguageChart"></canvas>
            </div>
        </div>
        <div class="col">
            <div class="canvas-wrapper">
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
    name: 'StatisticsComponent',
    props:{
        reposData: {
            required: true
        }
    },
    data () {
        return {
            total: 0,
            colors: {
                red: '#ff3333',
                orange: 'rgb(255, 159, 64)',
                yellow: '#FDC02F',
                green: 'rgb(75, 192, 192)',
                blue: '#288AE2',
                purple: 'rgb(153, 102, 255)',
                lightgrey: '#ECEFF1',
                darkgrey: '#404040'
            },
            donutChartData: [],
            barChartData:[]
        }
    },
    watch: {
        reposData: function (val) {


           // Data for Donut Chart
            var sum = 0
            languages.forEach(language => {
                const total = this.getProjectsByLanguage(val,language)
                sum+= total
                this.donutChartData.push(total)
            })
            
            const rest = val.length - sum
            this.donutChartData.push(rest)

            // Data for Bar Chart
            years.forEach(year => {
                const total = this.getProjectsByDate(val,year)
                this.barChartData.push(total)
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
            var barChartContext = document.getElementById("bar-chart")
            var barChartConfig = this.commonBarConfig()
            var secondChart = new Chart(barChartContext, barChartConfig);
        },
        prepData () {

            return {
                // Note that the ordering of entries acrosss data, backgroundColor 
                // and labels must correspond.                 
                datasets: [{
                    data: this.donutChartData,
                    backgroundColor: [
                        this.colors.red,
                        this.colors.yellow,
                        this.colors.blue,
                        this.colors.green
                    ],
                    label: 'Projects/language',
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
                    responsive: true,
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontSize: 11
                        }
                    },
                    title: {
                        display: true,
                        text: 'Number of Projects per Language'
                    },
                    animation: {
                        animateScale: false,
                        animateRotate: true
                    }
                }
            }
        },
        commonBarConfig (){
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
                            data: this.barChartData
                        }
                    ]                   
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'NUmber of Projects created per year'
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

    .canvas-wrapper{
        background-color: #fcf8f7;
        border-radius: 5px;
    }

</style>