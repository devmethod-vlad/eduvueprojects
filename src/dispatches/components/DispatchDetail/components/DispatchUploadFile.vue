<template>
  <div class="telegram-setcontent-uploadfiles-wr">
    <div class="telegram-setcontent-filezone">
      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <file-zone
            :new-files="newDispatch.$state.upload_files"
            :deny-files="newDispatch.$state.deny_upload_files"
            :info-arr="newDispatch.$state.upload_infoarray"
            @deleteitem="(index)=>{deleteFileItem(index, newDispatch)}"
            @deletedenyitem="(index)=>{deleteDenyFileItem(index, newDispatch)}"
            @resetinfoarr="resetInfoAndDeny(newDispatch, false)"
        />
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <file-zone
            :new-files="redactDispatch.$state.upload_files"
            :deny-files="redactDispatch.$state.deny_upload_files"
            :info-arr="redactDispatch.$state.upload_infoarray"
            @deleteitem="(index)=>{deleteFileItem(index, redactDispatch)}"
            @deletedenyitem="(index)=>{deleteDenyFileItem(index, redactDispatch)}"
            @resetinfoarr="resetInfoAndDeny(redactDispatch, false)"
        />
      </template>

    </div>

    <div class="telegram-setcontent-upload">

      <template v-if="appStore.$state.activeComponent === 'newdispatch'">
        <div
            :class="{'dispatch-upload-inactive': newDispatch.$state.upload_files.length >=1 }"
        >
          <upload-file
              :totalfilescount="1"
              :maxsimulcount="1"
              @uploadfiles="(uploadFilesObject)=>{onUpload(uploadFilesObject, newDispatch)}"
              @handledrop="resetInfoAndDeny(newDispatch, true)"
              @handlebutton="resetInfoAndDeny(newDispatch,true)"
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
      </template>

      <template v-if="appStore.$state.activeComponent === 'modifydispatch'">
        <div
            :class="{'dispatch-upload-inactive': redactDispatch.$state.upload_files.length >=1 }"
        >
          <upload-file
              :totalfilescount="1"
              :maxsimulcount="1"
              @uploadfiles="(uploadFilesObject)=>{onUpload(uploadFilesObject, redactDispatch)}"
              @handledrop="resetInfoAndDeny(redactDispatch, true)"
              @handlebutton="resetInfoAndDeny(redactDispatch, true)"
              :initstore="{
                    new_files: redactDispatch.$state.upload_files,
                    deny_files: redactDispatch.$state.deny_upload_files,
                    info_array: redactDispatch.$state.upload_infoarray
                }"
              :current-attachs="[]"
              :current-simul-attachs="redactDispatch.$state.simul_files"
              @emitsimulattachs="(count)=>redactDispatch.simul_files = count"
          />
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import UploadFile from "@/common/ui/UploadFile/UploadFile.vue";
import FileZone from "@/common/ui/FileZone/FileZone.vue";
import {useNewDispatchStore} from "@/dispatches/store/newdispatch";
import {useAppStore} from "@/dispatches/store/app";
import {useRedactDispatchStore} from "@/dispatches/store/redactdispatch";

// STORE
const newDispatch = useNewDispatchStore();
const appStore = useAppStore();
const redactDispatch = useRedactDispatchStore();

// METHODS
const onUpload = (uploadFilesObject, dispatchStore)=>{
  dispatchStore.upload_files = uploadFilesObject.newFiles;
  dispatchStore.deny_upload_files = uploadFilesObject.denyFiles;
  dispatchStore.upload_infoarray = uploadFilesObject.infoTextArr;
}

const resetInfoAndDeny = (dispatchStore, resetFiles=false) =>{
  dispatchStore.upload_infoarray = [];
  if(resetFiles){
    dispatchStore.deny_upload_files = [];
  }
}

const deleteFileItem = (index, dispatchStore)=>{
  let copyDispatch = {...dispatchStore.$state};
  copyDispatch.upload_files.splice(index, 1);
  if(copyDispatch.simul_files !==0 ){
    copyDispatch.simul_files = copyDispatch.simul_files - 1;
  }
  dispatchStore.$patch(copyDispatch);
  resetInfoAndDeny(dispatchStore, true);
}

const deleteDenyFileItem = (index, dispatchStore)=>{
  let copyDispatch = {...dispatchStore.$state};
  copyDispatch.deny_upload_files.splice(index, 1);
  copyDispatch.upload_infoarray = [];
  dispatchStore.$patch(copyDispatch);
  resetInfoAndDeny(dispatchStore, true);
}

</script>

<style>
.telegram-setcontent-upload .qst-uploader-droparea-label-icon {
  width: auto !important;
}

.telegram-setcontent-upload .qst-uploader-droparea-label-text-wr {
  width: auto !important;
  color: #999999;
}

.telegram-setcontent-upload .qst-uploader-droparea-label-span {
  color: #1D8585 !important;
}

.telegram-setcontent-upload .qst-uploader-droparea-label-text-top {
  padding-bottom: 0 !important;
  display: flex !important;
  font-weight: 400 !important;
  font-size: 15px !important;
  line-height: 24px !important;
  align-items: center !important;
}

.telegram-setcontent-upload .qst-detail-upload-dpoparea-wr label{
  padding: 8px !important;
}
.telegram-setcontent-upload .qst-uploader-droparea-label-text-bottom {
  display: none;
}

.dispatch-upload-inactive .qst-detail-upload-dpoparea-wr label{
  background-color: #F2F2F2 !important;
  pointer-events: none;
}
.dispatch-upload-inactive .qst-uploader-droparea-label-icon {
  filter: grayscale(1) !important;
}

.dispatch-upload-inactive .qst-uploader-droparea-label-span {
  color: #999999 !important;
}

.dispatch-upload-inactive .qst-uploader-droparea-label-text-top {
  color: #999999 !important;
}

.dispatch-upload-inactive .qst-detail-upload-dpoparea-wr label {
  border: 1px #CCCCCC dashed !important;
}
</style>

<style scoped>

</style>