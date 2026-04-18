<template>
    <div v-if="spaceSelectVisible || roleSelectVisible" class="qst-detail-select-space-role">
        <template v-if="spaceSelectVisible">

            <div class="qst-select-space-title">
                Выберите тему вопроса
            </div>

            <template v-if="props.target === 'editquestion'">
                <div class="qst-select-space">
                    <select-item
                      itemname="title"
                      uniqidname="id"
                      :data="questions.$state.availableSpaces"
                      :activeid="activeQuestion.$state.space_id.toString()"
                      @emitactiveitem="(activeItem)=>changeActiveSpace(activeItem)"
                      debugtarget="space"
                      :errorstyle="props.spaceErrorStyle"
                      @itemclick="emits('clickselect', 'space')"
                    />
                </div>
            </template>

            <template v-else-if="props.target === 'newquestion' || props.target === 'fastquestion'">
                <div class="qst-select-space">
                    <select-item
                      itemname="title"
                      uniqidname="id"
                      :data="questions.$state.availableSpaces"
                      :activeid="newQuestion.$state.space_id.toString()"
                      @emitactiveitem="(activeItem)=>changeActiveSpace(activeItem)"
                      debugtarget="space"
                      :errorstyle="props.spaceErrorStyle"
                      @itemclick="emits('clickselect', 'space')"
                    />
                </div>
            </template>

        </template>

        <template v-if="roleSelectVisible">

            <div class="qst-select-role-title">
                Укажите роль или должность, к которой относится вопрос:
            </div>

            <template v-if="props.target === 'editquestion'">
                <div class="qst-select-role">
                    <select-item
                      itemname="name"
                      uniqidname="id"
                      :data="roleList"
                      :activeid="activeQuestion.$state.order_unionrole_id.toString()"
                      @emitactiveitem="(activeItem)=>changeActiveRole(activeItem)"
                      debugtarget="role"
                      :errorstyle="props.roleErrorStyle"
                      @itemclick="emits('clickselect', 'role')"
                    />
                </div>
            </template>

            <template v-else-if="props.target === 'newquestion' || props.target === 'fastquestion'">

                <div class="qst-select-role">
                    <select-item
                      itemname="name"
                      uniqidname="id"
                      :data="roleList"
                      :activeid="newQuestion.$state.unionrole_id.toString()"
                      @emitactiveitem="(activeItem)=>changeActiveRole(activeItem)"
                      debugtarget="role"
                      :errorstyle="props.roleErrorStyle"
                      @itemclick="emits('clickselect', 'role')"
                    />
                </div>

            </template>

        </template>


    </div>
</template>

<script setup>
import { getRolesBySpace} from "@/questions/components/QuestionDetail/components/SelectSpaceRole/services/getrolesbyspace";
import {app_config} from "@/questions/config/setconfig";
import {setCompPermissions} from "@/questions/components/QuestionDetail/services/setcomppermissions";
import SelectItem from "@/questions/components/SelectItem/SelectItem.vue";
import {useUserStore} from "@/questions/store/user";
import {useQuestionsStore} from "@/questions/store/questions";
import {useActiveQuestionStore} from "@/questions/store/activequestion";
import {computed, onMounted, ref, watch} from "vue";
import {getRoleInfo} from "@/questions/services/getrole";
import { useNewQuestionStore } from "@/questions/store/newquestion";
import { useAppStore } from "@/questions/store/app";

// EMITS
const emits = defineEmits(['clickselect'])

let nullRole = {
    'id': app_config.NULLROLE.id,
    'name': app_config.NULLROLE.name,
    'emiasid': app_config.NULLROLE.emiasid
}

// PROPS
const props = defineProps({
    target:
      {
          type:String,
          default:'',
          required: true
      },
    spaceErrorStyle:
      {
          type: Boolean,
          default: false
      },
    roleErrorStyle:
      {
          type: Boolean,
          default: false
      }
})

// STORE
const userStore = useUserStore();
const questions = useQuestionsStore();
const activeQuestion = useActiveQuestionStore();
const newQuestion = useNewQuestionStore();
const appStore = useAppStore();


// DATA
const roleList = ref([]);

//METHODS

const changeActiveSpace = (item)=>{
    if(props.target === 'editquestion'){

      activeQuestion.space_id = Number(item['id']);
      activeQuestion.space_title = item['title'];
      activeQuestion.space_key = item['spacekey'];

    }
    else {

        // newquestion
        newQuestion.space_id = Number(item['id']);
        newQuestion.space_title = item['title'];
        newQuestion.space_key = item['spacekey'];
        console.log("newQuestion.$state: ", newQuestion.$state);

    }

}

const changeActiveRole = (item)=>{
    if(props.target === 'editquestion'){
        activeQuestion.order_unionrole_id = Number(item['id']);
        activeQuestion.order_unionrole_name = item['name'];
        activeQuestion.order_unionrole_emiasid = item['emiasid'];
    }
    else {
        // newquestion
        newQuestion.unionrole_id = Number(item['id']);
        newQuestion.unionrole_name = item['name'];
        newQuestion.unionrole_emiasid = item['emiasid'];
    }


}

const updateRolesList = async (spaceid)=>{
    // await console.log("updateRolesList");
    const roles = await getNewRolesList(spaceid);
    // await console.log("getNewRolesList roles: ", roles);
    const checkRoles = await checkExistRole(roles);
    const nullRoles = await checkNullRole(checkRoles);
    const sortRoles = await sortRoleList(nullRoles);
    await saveRoleListToStore(sortRoles);
    roleList.value = sortRoles;
}


const getNewRolesList = async(spaceid)=>{
    let rolesResp = await getRolesBySpace(spaceid, userStore.$state.userrole.id, userStore.userid);
    if(rolesResp.status === 'ok'){
        return  await rolesResp['info']['roles_list'];
    }
    else {
      return []
    }
}

const checkExistRole =  (checkroles)=>{
    let existFlag = false;
    let existRoleId;

    if(props.target === 'editquestion'){
        existRoleId = activeQuestion.$state.order_unionrole_id;
    }
    else {
        // newquestion
        existRoleId = newQuestion.$state.unionrole_id;
    }
    for (const item of checkroles){
        if (Number(item['id']) === Number(existRoleId)){
            existFlag = true;
        }
    }
    if(!existFlag){
        if(props.target === 'editquestion'){
          checkroles.push({
                'id': activeQuestion.order_unionrole_id,
                'name': activeQuestion.order_unionrole_name,
                'emiasid': activeQuestion.order_unionrole_emiasid
            });
        }
        else {
            // newquestion
          checkroles.push({
                'id': newQuestion.unionrole_id,
                'name': newQuestion.unionrole_name,
                'emiasid': newQuestion.unionrole_emiasid
            });
        }
    }

    return checkroles;
}

const checkNullRole = (nullroles)=>{

    let existNullRole = false;

    for (let item of nullroles){
        if (Number(item['id']) === Number(nullRole.id)){
            existNullRole = true;
        }
    }
    if(!existNullRole){
      nullroles.push(nullRole);
    }

  return nullroles;
}

const sortRoleList = (sortroles)=>{
    sortroles.sort((a, b) => {
        return a.name - b.name;
    });
    return sortroles;
}

const saveRoleListToStore = (roles)=>{
    if (props.target === 'newquestion' || props.target === 'fastquestion'){
      newQuestion.union_roles = roles;
    }
    else if (props.target === 'editquestion'){
      activeQuestion.order_union_roles = roles;
    }
}

const findSpaceId = (spacekey)=>{
    let space = null;
    for (let item of questions.$state.availableSpaces){
        if (item['spacekey'] === spacekey){
            space = item;
        }
    }
    return space;
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
})

const spaceSelectVisible = computed(()=>{
    if (props.target === 'editquestion'){
        let compPermissions = setCompPermissions('selectspace', activeQuestion.$state, '', userStore.$state);
        return compPermissions.edit && questions.$state.availableSpaces.length !== 0;
    }
    else {
        //newquestion
        return role.value === 'redactor' || role.value === 'admin';
    }

});

const roleSelectVisible = computed(()=>{
    if (props.target === 'editquestion'){
        let compPermissions = setCompPermissions('selectrole', activeQuestion.$state, '', userStore.$state);
        return compPermissions.edit && roleList.value.length !==0;
    }
    else {
        //newquestion
        return roleList.value.length !== 0;
    }
});


// LIFECYCLE
onMounted(()=>{

    let existSpaceKey = '';

    if (props.target === 'newquestion' || props.target === 'fastquestion'){
      if(appStore.$state.urlParams.urlspacekey !=='') {
        existSpaceKey = appStore.$state.urlParams.urlspacekey;
      }
      else {
        let storageSpaceKey = app_config.localStorage.eduQuestionSpaceKey.key;
        if (localStorage.getItem(storageSpaceKey)){
          let spaceLocalStore = JSON.parse(localStorage.getItem(storageSpaceKey));
          if (spaceLocalStore.spaceKey){
            if(spaceLocalStore.spaceKey !==''){
              existSpaceKey = spaceLocalStore.spaceKey;
            }
          }
        }

      }
    }

    if(existSpaceKey !==''){
        let space = findSpaceId(existSpaceKey);
        if (space !== null){
            if (props.target === 'newquestion' || props.target === 'fastquestion'){
                changeActiveSpace(space);
            }
            if (props.target === 'editquestion'){
                if (Number(activeQuestion.$state.space_id) === Number(app_config.NULLSPACE.id)){
                    changeActiveSpace(space);
                }
            }
        }
    }
})


// WATCH
watch(
    ()=>activeQuestion.space_id,
    async (newId) => {
        if(props.target === 'editquestion'){
            if( Number(newId) !== 0){
                await updateRolesList(newId);
            }
        }
    },
    {immediate: true}
);

watch(
  ()=>newQuestion.space_id,
  async (newId) => {
     if(props.target === 'newquestion' || props.target === 'fastquestion'){
          if( Number(newId) !== 0){
              await updateRolesList(newId);
          }
      }
  },
  {immediate: true}
);

</script>

<style scoped>
.qst-detail-select-space-role {
    margin-bottom: 30px;
}

.qst-select-space-title {
    font-weight: 400;
    margin-bottom: 10px;
}

.qst-select-role-title {
    font-weight: 400;
    margin-bottom: 10px;
}

.qst-select-space {
    margin-bottom: 30px;
}

.qst-select-role {
    margin-bottom: 20px;
}

@media (max-width: 576px) {


}
@media (min-width: 576px) {


}

@media (min-width: 768px) {

}

@media (min-width: 992px) {
    .qst-select-space-title {
        font-size: 20px;
    }

    .qst-select-role-title {
        font-size: 20px;
    }
}
@media (min-width: 1200px) {


}

</style>