<template>
<div class="info-container">
    <div v-if="loading" class="loading">
        ...Загружаем данные
    </div>
    <template v-else>
        <div v-if="info !==''" class="info-text" :class="{'warn-text': warn}">
            {{info}}
        </div>
        <template v-else >
            <template v-if="repos.length !==0">
                <div v-for="item in repos" :key="item.repo_name" class="repo-item">
                    <div class="repo-name">{{item.repo_name}}</div>
                    <div class="repo-stars">Звезд ({{item.stars.toString()}})</div>
                </div>
            </template>
        </template>
    </template>

</div>
</template>

<script>
import {getGithubInfo} from "@/service/GithubInfo/services/getinfo";

let updateTimer;

export default {
    name: "GithubInfo",

    data(){

        return{
            taskid: '',

            loading: true,

            warn: false,

            info: '',

            repos:[]
        }
    },
    methods: {

        async checkState(){
            let answer = await getGithubInfo(this.taskid);
            await console.log(answer);
            if (answer.status === 'ok'){
                if (answer.task_state === 'SUCCESS'){
                    this.loading = false;
                    this.repos = await answer.info.repos;
                    if(updateTimer){
                        window.clearInterval(updateTimer);
                    }
                }
                else if (answer.task_state === 'FAILURE'){
                    this.loading = false;
                    this.info = "В процессе выполнения запроса произошла ошибка. Попробуйте повторить еще раз.";
                    this.warn = true;
                    if(updateTimer){
                        window.clearInterval(updateTimer);
                    }
                }
            }
            else {
                this.loading = false;
                this.info = "В процессе выполнения запроса произошла ошибка. Попробуйте повторить еще раз.";
                this.warn = true;
                if(updateTimer){
                    window.clearInterval(updateTimer);
                }
            }

        }
    },

    async mounted() {
        const queryString = await window.location.search;
        const urlParams = await new URLSearchParams(queryString);
        if (urlParams.get('taskid')) {
            this.taskid = await urlParams.get('taskid');
            updateTimer = setInterval(this.checkState, 3000);
        }
        else {
            this.loading = false;
            this.info = "В процессе выполнения запроса произошла ошибка. Попробуйте повторить еще раз.";
            this.warn = true;
        }
    },

    unmounted() {
        if(updateTimer){
            window.clearInterval(updateTimer);
        }
    }
}
</script>

<style scoped>
.warn-text {
    color: red !important;
}

.info-container {
    display: flex;
    flex-direction: column;

}
.repo-stars {
    margin-left: 40px;
}

.repo-item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}
</style>