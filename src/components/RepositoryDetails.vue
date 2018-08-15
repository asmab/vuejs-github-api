<template>
    <div class="main-container" >

        <div v-if="repositoryData.name" class="repo-details">

            <div class="details-wrapper">
                <span class="number">{{ contributors.length }}</span> 
                developers contributed on this project 
            </div>

            <div v-if="contributors.length > 0" class="contributors-wrapper">
                <div v-for="contributor in contributors">
                    <div class="contributor-wrapper">
                        <!--Contributor image -->
                        <div class="img-wrapper">
                            <ul>
                                <li><img v-bind:src='contributor.avatar_url' class="image-class"/></li>
                                <li>{{contributor.login}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <p style="text-align:center">  No Data </p>
        </div>
    </div>
</template>

<script>
import RepoService from '@/services/RepoService'

export default {
    data() {
        return {
            contributors: []
        }
    },
    props:{
        repositoryData: { required: true }
    },
    watch: {
        repositoryData: function (val) {
        // get contributors
            if (this.repositoryData) {
                RepoService.getContributors(this.repositoryData.full_name)
                .then((response) => this.contributors = response.data)
            }
        }        
    }
}
</script>

<style lang="scss" scoped>

.main-container {
    height: 100%;
    background-color: #fcf8f7;
    border-radius: 5px;
}

.details-wrapper{
    text-align: center;
    margin-bottom: 20px;
    span{
        font-size: 20px;
        font-weight: bold;
    }
}

.contributor-wrapper {
    float: left;
    width: 18%;
}

.contributors-wrapper{
    height: 310px;
    overflow-y: scroll;
}

.img-wrapper {
    display: inline;
    ul {
        list-style-type:none;
    }
}
.image-class {
    height:42px;
    width: 42px;
}
</style>