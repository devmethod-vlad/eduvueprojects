<template>
  <div
      class="dispatch-detail-actuality-wr actuality-disable"
  >

    <div class="dispatch-detail-actuality-maintitle">
      Актуальность
    </div>

    <div class="dispatch-detail-actuality-choice">

      <div class="dispatch-detail-actuality-choice-item">
        Не задавать дату
      </div>

      <div
          class="dispatch-detail-actuality-choice-item left-border-none"
      >
        Задать дату
      </div>

    </div>


  </div>

</template>

<script setup>

</script>

<style scoped>
.left-border-none {
  border-left: none !important;
}

.dispatch-detail-actuality-choice-item {
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px #999999 solid;
}

.dispatch-detail-actuality-choice {
  display: flex;
  justify-content: flex-start;
}

.dispatch-detail-actuality-maintitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
}

.actuality-disable {
  pointer-events: none;
  background-color: #F2F2F2 !important;
  color: #999999 !important;
}

.dispatch-detail-actuality-wr {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  border: 1px #CCCCCC solid;
}

</style>