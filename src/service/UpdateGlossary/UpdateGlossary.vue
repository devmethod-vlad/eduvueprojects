<template>
    <div class="refresh-table-button-wr">
        <button @click="uploadFile" type="button" class="vue-btn vue-btn-normal" :class="{'button-disabled': uploadActive}">
            <template v-if="uploadActive">
                Идет обновление...
            </template>
            <template v-else>
                Обновить глоссарий
            </template>
        </button>
        <div v-if="uploadInfo !==''" class="refresh-table-info" :class="{'warn-text': warnActive}">
            {{uploadInfo}}
        </div>
    </div>
</template>

<script>
import updateGlossary from "@/UpdateGlossary/services/updateglossary";

// Параметры скрипта
const googleUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZQjqTQhcsdYWPOTRE4sUqn04CN8vMcVPJicBXvf8eK7fis1_h_OAuPsYfxusR-8CMXF38zYO3AkqC/pub?output=xlsx";

const fileName = 'GLOSS.xlsx';

const attachmentsUsrl = "https://edu.example.com/rest/api/content/24150637/child/attachment/";

const apiUrl = "https://edu.example.com/edu-rest-api/glossary/sync_update";

export default {
    name: "UpdateGlossary",

    data(){
        return {
            checkAttachmentSuccess: false,
            uploadAttachmentSucces: false,
            existAttachmentId: '0',
            uploadActive: false,
            uploadInfo: '',
            warnActive: false
        }
    },

    methods: {

        async checkAttachment(){

            try {
                const getResp = await fetch(attachmentsUsrl, {
                    method: "GET",
                    headers: {
                        "Authorization": "Basic " + btoa("iacbot:iacbot2021"),
                        "X-Atlassian-Token": "no-check",
                    }
                });

                let getRespAnswer = await getResp.json();

                await console.log(getRespAnswer);

                for (let item of getRespAnswer.results){
                    if (item.title === fileName){
                        this.existAttachmentId = item.id;
                    }
                }
                this.checkAttachmentSuccess = true;
            }
            catch (e) {
                await console.log(e)
                this.checkAttachmentSuccess = false;
                this.uploadActive = false;
                this.uploadInfo = "При проверке существующих вложений на странице произашла ошибка! Попробуйте перегрузить страницу или повторите попытку позже";
                this.warnActive = true;
            }



        },

        async uploadFile(){

            this.uploadInfo = '';
            this.warnActive = false;
            this.checkAttachmentSuccess = false;
            this.uploadAttachmentSucces = false;
            this.existAttachmentId = '0';

            this.uploadActive = true;

            await this.checkAttachment();

            if(this.checkAttachmentSuccess){
                let uploadUrl = "";
                if(this.existAttachmentId !== '0'){
                    uploadUrl = "https://edu.example.com/rest/api/content/24150637/child/attachment/"+this.existAttachmentId.toString()+"/data"
                }
                else {
                    uploadUrl = "https://edu.example.com/rest/api/content/24150637/child/attachment";
                }

                try{

                    const expResp = await fetch(googleUrl);

                    let file = await expResp.blob();

                    let thefile=await new File([file],fileName);

                    let fdata=new FormData();

                    fdata.append('file', thefile);

                    const uploadResp = await fetch(uploadUrl, {
                        method: "POST",
                        headers: {
                            "Authorization": "Basic " + btoa("iacbot:iacbot2021"),
                            "X-Atlassian-Token": "no-check",
                        },

                        body: fdata
                    });

                    let uploadAnswer = await uploadResp.json();

                    await console.log(uploadAnswer);

                    this.uploadAttachmentSucces = true;

                }
                catch(e) {

                    await console.log(e);

                    this.uploadAttachmentSucces = false;
                    this.uploadActive = false;
                    this.uploadInfo = "При попытке обновить файл на странице произошла ошибка! Попробуйте перегрузить страницу или повторите попытку позже";
                    this.warnActive = true;
                }
            }

            if (this.uploadAttachmentSucces){
                let answer = await updateGlossary(apiUrl);
                await console.log(answer);
                if (answer['status'] === 'ok'){
                    this.uploadActive = false;
                    this.uploadInfo = "Вы успешно обновили глоссарий!";
                }
                else {
                    await console.log(answer['error_mess']);
                    this.uploadActive = false;
                    this.uploadInfo = "При попытке обновить глоссарий произошла ошибка! Попробуйте перегрузить страницу или повторите попытку позже";
                    this.warnActive = true;
                }
            }

        }
    }
}

</script>
<style>
@import "@/css/form-v1.css";
</style>

<style scoped>
.refresh-table-info {
    margin-top: 30px;
    font-weight: bold;
    font-size: 1.2em;
    color: #1e8686;
}

.refresh-table-button-wr button {
    width: 30%;
}

.refresh-table-button-wr {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
.warn-text {
    color: red !important;
}

.button-disabled {

    pointer-events: none;
    opacity: 0.4;
}

</style>