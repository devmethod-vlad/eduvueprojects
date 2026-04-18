<template>
  <span
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="props.width"
        :height="props.height"
        :viewBox="'0 0 ' + props.width.toString()+' '+props.height.toString()"
        fill="none"
    >
      <rect
          width="32"
          height="24"
          rx="2"
          :fill="props.fillColor"
      />
      <path
          d="M17.1158 16.407L19.8475 18.5225C20.576 19.0867 21.0123 19.2277 21.2134 18.5225L23.9451 6.76953C24.1993 5.82927 23.5023 5.97834 23.2621 6.06435C22.6058 6.29938 13.9289 9.19848 9.60372 10.7656C8.49206 11.1683 9.17501 11.4707 9.60372 11.7058L13.0183 13.3512L13.9289 17.5823C14.111 18.1464 14.1831 18.5225 14.6118 18.2875L17.1158 16.407ZM17.1158 16.407L14.866 14.5265"
          :stroke="props.strokeColor"
      />
      <path
          d="M19.8741 9.82532L20.2145 10.1916C20.3976 10.0215 20.4269 9.74229 20.2832 9.53781C20.1395 9.33332 19.8668 9.26637 19.6447 9.38104L19.8741 9.82532ZM14.866 14.5265L14.5221 14.1636L14.3913 14.2875L14.3697 14.4664L14.866 14.5265ZM17.4706 12.0584L17.1303 11.6921L17.1267 11.6955L17.4706 12.0584ZM19.6447 9.38104L12.8155 12.9069L13.2743 13.7955L20.1035 10.2696L19.6447 9.38104ZM15.21 14.8895L17.8145 12.4213L17.1267 11.6955L14.5221 14.1636L15.21 14.8895ZM17.811 12.4247L20.2145 10.1916L19.5338 9.45902L17.1303 11.6921L17.811 12.4247ZM14.3697 14.4664L13.9144 18.2274L14.9071 18.3476L15.3624 14.5866L14.3697 14.4664Z"
          :fill="props.strokeColor"
      />
</svg>
  </span>
</template>

<script setup>

// PROPS
const props = defineProps({
  width:
      {
        type: Number,
        default: 32
      },
  height:
      {
        type: Number,
        default: 24
      },
  strokeColor:
      {
        type: String,
        default: '#333333'
      },

  fillColor:
      {
        type: String,
        default: '#C9EAF7'
      },
});

</script>

<style scoped>

</style>