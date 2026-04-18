<template>
  <div class="filter-machine-type-badges">
    <div class="filter-machine-type-badges-title">
      Выберите способ(-ы) отправки
    </div>

    <div class="filter-machine-type-badges-container">
      <div class="machine-type-badge-item">

        <badge-component-v2
            :check-list="filter.$state.methods"
            badge-id="telegram"
            :badge-text="telegramUsersCountText"
            badge-color="#0000000D"
            active-badge-color="#FFE766"
            @clickonbadge="clickOnMethodBadge('telegram')"

        />
      </div>

      <div class="machine-type-badge-item">
        <badge-component
            badge-text="Почта 0"
            :show-mode="true"
            badge-color="#0000000D"
            active-badge-color="#0000000D"
            font-color="#999999"
            :hover-active="false"
        />
      </div>

      <div class="machine-type-badge-item">
        <badge-component
            badge-text="АРМ 0"
            :show-mode="true"
            badge-color="#0000000D"
            active-badge-color="#0000000D"
            font-color="#999999"
            :hover-active="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BadgeComponentV2 from "@/common/ui/BadgeComponentV2/BadgeComponentV2.vue";
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import {useFilterStore} from "@/filtermachine/store/filter";
import {useUsersStore} from "@/filtermachine/store/users";
import {useResultStore} from "@/filtermachine/store/result";
import {computed} from "vue";

// EMITS
const emits = defineEmits(['refreshstate']);


// STORE
const filter = useFilterStore();
const users = useUsersStore();
const result = useResultStore();

// METHODS
const clickOnMethodBadge = (method)=>{
  let copyFilter = JSON.parse(JSON.stringify(filter.$state));
  copyFilter.page_number = 1;
  if(!copyFilter.methods.includes(method)){
    copyFilter.methods.push(method)
  }
  else{
    copyFilter.methods = copyFilter.methods.filter(item=>item!==method);
  }
  filter.$patch(copyFilter);
  emits('refreshstate');
}


// COMPUTED
const telegramUsersCountText = computed(()=>{
  let count = 0;

  if(filter.$state.methods.includes("telegram")){
    if (users.$state.prefill === 1){
      count = result.$state.total - users.$state.checkListReverse.length;
    }
    else {
      count = users.$state.checkList.length;
    }
  }

  return 'Tелеграм '+count.toString()
});


</script>

<style scoped>
.machine-type-badge-item {
  margin-right: 8px;
}

.filter-machine-type-badges-title {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 16px;
}

.filter-machine-type-badges-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.filter-machine-type-badges {
  padding-top: 16px;
  padding-bottom: 26px;
  display: flex;
  flex-direction: column;
  background-color: #F2F2F2;
}
</style>