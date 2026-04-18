<template>
  <div
      class="dispatch-badges-wr"
      :class="{'em-disabled-style': activateDisableMain(dispatches)}"
  >

    <div
        class="dispatch-badges-group-item em-disabled-style"
    >
      <div class="dispatch-badges-group-title">
        Актуальность
      </div>
      <div class="dispatch-badges-group-badges">
        <div class="dispatch-badges-group-badge-wr">
          <badge-component
              badge-text="Актуальные"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
        <div class="dispatch-badges-group-badge-wr">
          <badge-component
              badge-text="Не актуальные"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
      </div>
    </div>

    <div
        class="dispatch-badges-group-item em-disabled-style"
    >
      <div class="dispatch-badges-group-title">
        Дата актуальности
      </div>
      <div class="dispatch-badges-group-badges">
        <div class="dispatch-badges-group-badge-wr">
          <badge-component
              badge-text="Задана"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
        <div class="dispatch-badges-group-badge-wr">
          <badge-component
              badge-text="Не задана"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
      </div>
    </div>

    <template v-if="dispatches.$state.availableStatus.length > 1">
      <div class="dispatch-badges-group-item">
        <div class="dispatch-badges-group-title">
          Выполнение
        </div>
        <div class="dispatch-badges-group-badges">

          <div
              v-for="badge in dispatches.$state.availableStatus"
              class="dispatch-badges-group-badge-wr"
              :key="badge.id"
          >
            <badge-component-v2
                :check-list="dispatches.$state.statusIncludes"
                :badge-id="badge.db_name"
                :badge-text="badge.name"
                badge-color="#0000000D"
                active-badge-color="#2699991A"
                font-color="#333333"
                font-color-active="#999999"
                @clickonbadge="processBadgeStatus(badge.db_name)"
            />
          </div>
        </div>
      </div>
    </template>


    <div class="dispatch-badges-group-item">
      <div class="dispatch-badges-group-title">
        Способ отправки
      </div>
      <div class="dispatch-badges-group-badges">
        <div class="dispatch-badges-group-badge-wr">
          <badge-component
              badge-text="Телеграм"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
              group-id="telegram"
              font-color="#333333"
              font-color-active="#999999"
              active-id-in-group="telegram"
              default-group-id="telegram"
              @badgeactive="dispatches.methodIncludes = ['telegram']"
              @badgeinactive="dispatches.methodIncludes = ['telegram']"
          />
        </div>
        <div
            class="dispatch-badges-group-badge-wr em-disabled-style"
        >
          <badge-component
              badge-text="АРМ"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
        <div
            class="dispatch-badges-group-badge-wr em-disabled-style"
        >
          <badge-component
              badge-text="Почта"
              badge-color="#0000000D"
              active-badge-color="#2699991A"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import BadgeComponentV2 from "@/common/ui/BadgeComponentV2/BadgeComponentV2.vue";
import BadgeComponent from "@/common/ui/BadgeComponent/BadgeComponent.vue";
import {useDispatchesStore} from "@/dispatches/store/dispatches";
import {dispatchesPartialReset} from "@/dispatches/services/partrset";
import {activateDisableMain} from "@/dispatches/services/activatedisable";


// EMITS
const emits = defineEmits(['refreshlist']);

// STORE
const dispatches = useDispatchesStore();


//METHODS
const processBadgeStatus = (exstatus)=>{
  let dispatchesCopy = {...dispatches.$state};

  if (dispatches.$state.statusIncludes.includes(exstatus)){

    let index = dispatchesCopy.statusIncludes.indexOf(exstatus);

    if(index !==-1){
      dispatchesCopy.statusIncludes.splice(index, 1);

    }
  }
  else {
    dispatchesCopy.statusIncludes.push(exstatus);
  }

  dispatches.$patch(dispatchesCopy);
  dispatchesPartialReset(dispatches);
  emits('refreshlist');
}

</script>

<style scoped>
.dispatch-badges-group-badge-wr {
  margin-right: 8px;
}

.dispatch-badges-group-title {
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  color: #333333;
  margin-bottom: 12px;
}

.dispatch-badges-group-item {
  margin-right: 24px;
  margin-bottom: 12px;
}

.dispatch-badges-group-badges {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.dispatch-badges-wr {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

</style>