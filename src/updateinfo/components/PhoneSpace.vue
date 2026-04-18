<template>
  <div class="info-app-phone-space">
    <div
        class="phone-space-items-container"
        v-if="phones.$state.runtime.length > 0"
    >
      <transition-group :key="2" name="fade">
      <template v-for="[index, item] in phones.$state.runtime.entries()" :key="index">
        <phone-item
            :id="item.id.toString()"
            :index="Number(index)"
        />
      </template>
      </transition-group>

    </div>

    <div
        @click.stop.prevent="addItem('phone', phones)"
        class="phone-space-items-add-wr"
        :class="{'item-disabled':!addItemVisible}"
    >
      <div class="phone-space-items-add">
        <div class="phone-space-items-add-icon">
          <app-icon
              name="plus"
              :size="12"
              color="#269999"
          />
        </div>

        <div class="phone-space-items-add-text">
          Добавить телефон
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import PhoneItem from "@/updateinfo/components/PhoneItem.vue";
import {usePhoneStore} from "@/updateinfo/store/phones";
import {addItem} from "@/updateinfo/services/addeleteitem";
import {accessCreateNewItem} from "@/updateinfo/services/accesscreateitem";
import {computed} from "vue";

//STORE
const phones = usePhoneStore();

//COMPUTED
const addItemVisible = computed(()=>{
  return accessCreateNewItem(phones);
})

</script>

<style scoped>
.item-disabled {
  pointer-events: none;
  opacity: 0.4;
}

.phone-space-items-add {
  display: flex;
}

.phone-space-items-add:hover {
  background-color: #D7F0F0;
}
.phone-space-items-add:hover .phone-space-items-add-text{
  color: #1D8585;
}

.phone-space-items-add:active {
  background-color: #C2E8E8;
}

.phone-space-items-add:active .phone-space-items-add-text{
  color: #157171;
}


.phone-space-items-add-wr {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.phone-space-items-container {
  margin-bottom: 16px;
}

.phone-space-items-add-text {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #269999;
}

.phone-space-items-add-icon {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>