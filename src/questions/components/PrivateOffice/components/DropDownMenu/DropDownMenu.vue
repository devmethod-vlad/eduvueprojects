<template>
	<drop-down-panel
          :top="35"
          @closepanel="emits('closemenu')"
	>
			<div
							class="qst-profile-menu"
			>
          <div class="qst-profile-menu-personal-info">
							<div class="qst-profile-menu-user-name">
									{{ userName }}
							</div>
              <div class="qst-profile-menu-user-role">
									{{ app_config['BASE_ROLE'][role]['show_name'] }}
              </div>
          </div>
					<template v-if="role === 'admin'">
              <div @click.stop.prevent="activateMenu('addadmin')" class="qst-profile-menu-item">
                  Назначить администратора
              </div>
              <div @click.stop.prevent="activateMenu('changepass')" class="qst-profile-menu-item">
                  Сменить пароль
              </div>
              <div @click.stop.prevent="activateMenu('appconfig')" class="qst-profile-menu-item">
                  Настройки приложения
              </div>
              <div @click.stop.prevent="activateMenu('botstat')" class="qst-profile-menu-item">
                  Статистика телеграм-бота
              </div>
              <div @click.stop.prevent="activateMenu('exitadmin')" class="qst-profile-menu-item">
                  Вернуться из интерфейса администратора
              </div>
					</template>

					<template v-if="role === 'redactor'">
              <div @click.stop.prevent="activateMenu('enteradmin')" class="qst-profile-menu-item">
                  Авторизоваться в качестве админа
              </div>
					</template>
			</div>
	</drop-down-panel>
</template>

<script setup>
import DropDownPanel from "@/questions/components/DropDownPanel/DropDownPanel.vue";
import {useUserStore} from "@/questions/store/user";
import {computed} from "vue";
import {getRoleInfo} from "@/questions/services/getrole";
import {app_config} from "@/questions/config/setconfig";

// EMITS
const emits = defineEmits(['closemenu', 'openadminmenu']);

// STORE
const userStore = useUserStore();


// METHODS
const activateMenu = (target)=>{
		emits('openadminmenu', target);
    emits('closemenu');
}


// COMPUTED
const role = computed(()=>{
    let roleInfo = getRoleInfo(userStore.$state.userrole.id);
    if (roleInfo !== null){
        return roleInfo[0];
    }
    else {
        return null;
    }
});

const userName = computed(()=>{
    let name = '';

    if(userStore.$state.lastname === '' && userStore.$state.firstname === '' && userStore.$state.secondname === ''){
        if (role.value === 'admin'){
            if(userStore.$state.adminlogin !==''){
                name = userStore.$state.adminlogin;
            }
        }
        if (role.value === 'redactor'){
            if(userStore.$state.wikilogin !==''){
                name = userStore.$state.wikilogin;
            }
        }
        if (role.value === 'personal'){
            if(userStore.$state.emiaslogin !==''){
                name = userStore.$state.emiaslogin;
            }
        }
    }
    else {
        name = userStore.$state.lastname+' '+userStore.$state.firstname+' '+ userStore.$state.secondname;
    }

    return name;
})

</script>

<style scoped>
.qst-profile-menu-item {
		font-size: 16px;
		font-weight: 400;
		margin-bottom: 20px;
}
.qst-profile-menu-item:hover {
		color: #1e8686;
}

.qst-profile-menu-personal-info {
		margin-bottom: 30px;
}

.qst-profile-menu-user-role {
    font-size: 16px;
    font-weight: 400;
}

.qst-profile-menu-user-name {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 5px;
}

.qst-profile-menu {
		width: 100%;
		padding: 15px;
		display: flex;
		flex-direction: column;
}

</style>