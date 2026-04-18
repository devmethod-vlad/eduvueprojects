<template>
  <div class="redact-actionname-wr">
    <div class="redact-actionname-input">
      <textarea @focus="processOnFocus()" class="vue-form-control"
                :class="{'vue-input-error': errorStyle}" rows="2"
                v-model="input"
      >

      </textarea>
    </div>
    <div class="redact-actionname-icons">
      <div @click="validate()" class="redact-actionname-saveicon">
        <app-icon name="save"
                  :size="20"
                  color="#1e8686"
        />
      </div>
      <div @click="emits('closeredact')" class="redact-actionname-closeicon">
        <app-icon name="multiply"
                  :size="20"
                  color="#1e8686"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from "@/common/icons/AppIcon/AppIcon.vue";
import {onMounted, ref} from "vue";

// EMITS
const emits = defineEmits(['emitname', 'closeredact']);

// PROPS
const props = defineProps({
  actionName: {
    type: String,
    default: ''
  }
});


// DATA
const input = ref('');
const errorStyle = ref(false);

// METHODS
const validate = ()=>{
  errorStyle.value = false;
  if (input.value === '' || input.value === 'Укажите название'){
    input.value = 'Укажите название';
    errorStyle.value = true;
  }
  else {
    saveName();
  }
};

const processOnFocus = ()=>{
  if(input.value === 'Укажите название') {
    input.value = '';
  }
  errorStyle.value = false;
};

const saveName = ()=>{
  emits('emitname', input.value);
}

// LIFECYCLE
onMounted(()=>{
  input.value = props.actionName;
})

</script>

<style scoped>
.vue-form-control {
  width: 100%;
}
.redact-actionname-input {
  display: flex;
  width: 100%;
}
.redact-actionname-saveicon {
  cursor: pointer;
  padding-right: 5px;
}

.redact-actionname-closeicon {
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}

.redact-actionname-icons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.redact-actionname-wr {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
</style>