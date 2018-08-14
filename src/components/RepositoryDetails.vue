<template>
    <div v-if="repositoryData.name" class="main-container" >

        <div class="details-wrapper">
            Repository name : {{ repositoryData.name }} <br>
            Language : {{  repositoryData.language }} <br>
            {{ contributors.length }} developers contributed on this project 
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
    max-height: 300px;
    overflow-y: scroll;
}
.details-wrapper{
    text-align: left;
    margin-bottom: 20px;
}

.contributor-wrapper {
    float: left;
    width: 18%;
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