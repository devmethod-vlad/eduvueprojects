<template>
  <div class="info-app-mail-space">

    <div
        v-if="mails.$state.runtime.length > 0"
        class="mail-space-items-container"
    >
      <transition-group :key="1" name="fade">
      <template v-for="[index, item] in mails.$state.runtime.entries()" :key="index">
        <mail-item
            :id="item.id.toString()"
            :index="Number(index)"
        />
      </template>
      </transition-group>

    </div>

    <div
        @click.stop.prevent="addItem('mail', mails)"
        class="mail-space-items-add-wr"
        :class="{'item-disabled':!addItemVisible}"
    >
      <div class="mail-space-items-add">
        <div class="mail-space-items-add-icon">
          <app-icon
              name="plus"
              :size="12"
              color="#269999"
          />
        </div>

        <div
            class="mail-space-items-add-text"
        >
          Добавить email
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import MailItem from "@/updateinfo/components/MailItem.vue";
import {useMailStore} from "@/updateinfo/store/mails";
import {addItem} from "@/updateinfo/services/addeleteitem";
import {computed} from "vue";
import {accessCreateNewItem} from "@/updateinfo/services/accesscreateitem";


// STORE
const mails = useMailStore();

//COMPUTED
const addItemVisible = computed(()=>{
  return accessCreateNewItem(mails);
})


</script>

<style scoped>

.item-disabled {
  pointer-events: none;
  opacity: 0.4;
}

.mail-space-items-add-wr {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;
}

.mail-space-items-add{
  display: flex;
}

.mail-space-items-add:hover {
  background-color: #D7F0F0;
}
.mail-space-items-add:hover .mail-space-items-add-text{
  color: #1D8585;
}

.mail-space-items-add:active {
  background-color: #C2E8E8;
}

.mail-space-items-add:active .mail-space-items-add-text{
  color: #157171;
}

.mail-space-items-container {
  margin-bottom: 16px;
}

.mail-space-items-add-text {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #269999;
}


.mail-space-items-add-icon {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>