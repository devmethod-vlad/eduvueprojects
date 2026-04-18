<template>
    <div class="em-render-qr-wr">

        <PortalAuth
                :api-url="apiUrl"
                :portal-url="portalUrl"
                :local-host-auth="true"
                :auth-by-link="false"
                :auth-by-storage-token="true"
                :auth-by-edu="true"
                :manual-auth="false"
                :show-login-form="false"
                :is-verbal="false"
                loading-text="Подготавливаем данные....."
                @setuserinfo="(userobject) => getUserInfo(userobject)"
                @unsuccesslogin = "workSpaceVisible = true"
        />

        <div v-if="workSpaceVisible" class="em-render-qr-showzone">
            <qr-code :text="qrText" size="250"></qr-code>
				</div>

    </div>
</template>

<script>
import PortalAuth from "@/common/auth/PortalAuth/PortalAuth.vue";
import {user_object} from "@/objects/user";

export default {
    name: "RenderQr",

    components: {
        PortalAuth
		},

    data(){
        return{

            qrText: 'https://t.me/EMIASkBot',
            workSpaceVisible: false,
            isUserAuth: false,
            userObject: user_object,

        }
    },

    methods:{

        getUserInfo(userObject){
            this.workSpaceVisible = true;

            console.log("getUserInfo userObject: ", userObject);

            if (userObject.auth){
                this.userObject = userObject;
                this.isUserAuth = true;

                if (this.isUserAuth && (this.userObject.authSource === 'wiki' || this.userObject.authSource === 'localhostservice' || this.userObject.authSource === 'localtoken')){
                    this.qrText='https://t.me/EMIASkBot?start='+this.userObject.token;
                }
            }
        }
    },

    computed: {

        apiUrl: function () {
            return this.globalApiUrl;
        },

        portalUrl: function (){
            return this.globalPortalUrl;

        }
    }
}
</script>

<style scoped>
.em-render-qr-showzone {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
}
</style>