<template>
  <div class="telegram-setcontent-uploadfiles-wr">
    <div class="telegram-setcontent-filezone">
      <file-zone
          :new-files="newDispatch.$state.upload_files"
          :deny-files="newDispatch.$state.deny_upload_files"
          :info-arr="newDispatch.$state.upload_infoarray"
          @deleteitem="(index)=>{deleteFileItem(index)}"
          @deletedenyitem="(index)=>{deleteDenyFileItem(index)}"
          @resetinfoarr="resetInfoAndDeny(false)"
      />
    </div>

    <div class="telegram-setcontent-upload">
      <upload-file
          :totalfilescount="1"
          :maxsimulcount="1"
          @uploadfiles="(uploadFilesObject)=>{onUpload(uploadFilesObject)}"
          @handledrop="resetInfoAndDeny(true)"
          @handlebutton="resetInfoAndDeny(true)"
          :initstore="{
                    new_files: newDispatch.$state.upload_files,
                    deny_files: newDispatch.$state.deny_upload_files,
                    info_array: newDispatch.$state.upload_infoarray
                }"
          :current-attachs="[]"
          :current-simul-attachs="newDispatch.$state.simul_files"
          @emitsimulattachs="(count)=>newDispatch.simul_files = count"
      />
    </div>
  </div>
</template>

<script setup>
import UploadFile from "@/common/ui/UploadFile/UploadFile.vue";
import FileZone from "@/common/ui/FileZone/FileZone.vue";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";

// STORE
const newDispatch = useNewDispatchStore();

// METHODS
const onUpload = (uploadFilesObject)=>{
  newDispatch.upload_files = uploadFilesObject.newFiles;
  newDispatch.deny_upload_files = uploadFilesObject.denyFiles;
  newDispatch.upload_infoarray = uploadFilesObject.infoTextArr;
}

const resetInfoAndDeny = (resetFiles=false) =>{
  newDispatch.upload_infoarray = [];
  if(resetFiles){
    newDispatch.deny_upload_files = [];
  }
}

const deleteFileItem = (index)=>{
  let copyNewDispatch = {...newDispatch.$state};
  copyNewDispatch.upload_files.splice(index, 1);
  if(copyNewDispatch.simul_files !==0 ){
    copyNewDispatch.simul_files = copyNewDispatch.simul_files - 1;
  }
  newDispatch.$patch(copyNewDispatch);
  resetInfoAndDeny(true);
}

const deleteDenyFileItem = (index)=>{
  let copyNewDispatch = {...newDispatch.$state};
  copyNewDispatch.deny_upload_files.splice(index, 1);
  copyNewDispatch.upload_infoarray = [];
  newDispatch.$patch(copyNewDispatch);
  resetInfoAndDeny(true);
}

</script>

<style scoped>

</style>