<template>
  <div v-if="passenger">
    <p><b>ID:</b> {{ passenger._id }}</p>
    <p><b>Name:</b> {{ passenger.name }}</p>
    <p><b>Trips:</b> {{ passenger.trips }}</p>
  </div>
</template>

<script>
export default {
  props: ['passenger']
}
</script>

<style scoped>
img {
  width: 200px;
  height: auto;
}
</style>