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
          :width="props.width"
          :height="props.height"
          rx="2"
          :fill="props.fillColor"
      />
      <path
          d="M13.8627 17.9772C13.4881 17.9772 12.2597 17.9772 12.2597 19.1235V20H19.7403V19.1235C19.697 18.4608 19.5503 17.9772 18.1373 17.9772M13.8627 17.9772V16.2578M13.8627 17.9772H18.1373M18.1373 17.9772V16.2578M10.7288 10.5263H20.8809M10.7288 8.98261H12.3317M10.7288 12.4215H12.3317M10.7288 7.08735H14.469M24 8.23365V6.17031C24 5.18162 23.0623 3.99999 22.0859 4H9.60324C8.60247 4 7.97008 5.18162 8.00109 6.62884M24 9.37995V10.5263M24 11.5247V14.2856C23.9693 15.4073 23.5526 16.1961 22.4018 16.2578H10.511C8.94587 16.1961 8.00107 16.2578 8.00276 15.0745L8.00107 6.5142M9.58056 6.26417V13.9062C9.57795 14.6704 10.1123 14.6704 10.7826 14.6704H21.1999C21.8674 14.6704 22.4017 14.6704 22.4018 13.9062V6.26417C22.4017 5.49997 22.1614 5.49997 21.1999 5.49997H15.7909H10.3819C10.1148 5.49997 9.58056 5.65281 9.58056 6.26417Z"
          :stroke="props.strokeColor"
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
        default: '#C2E8E8'
      },
});

</script>

<style scoped>

</style>