<template>
  <div></div>
</template>

<script setup>
import {onMounted} from "vue";

const testRestApi = async ()=>{
  try{

    let localResp = await fetch('https://localhost');
    let answer = await localResp.json();
    console.log("localHostServiceAuth answer: ", answer);

  }
  catch (e) {
    console.log('error fetch https://localhost: ', e);
  }
}

// LIFECYCLE
onMounted(()=>{
  testRestApi()
})
</script>

<style scoped>

</style>