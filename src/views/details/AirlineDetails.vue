<template>
  <div v-if="passenger">
    <img :src="passenger.airline.logo" />
    <img
      v-for="airline in passenger.airline"
      :key="airline.id"
      :src="airline.logo"
    />
    <p>
      <!-- Name -->
      <b>Airline:</b>
      {{ passenger.airline.name }}
      <span v-for="airline in passenger.airline" :key="airline.id">
        {{ airline.name }}
      </span>
      <!-- Website -->
      (
      {{ passenger.airline.website }}
      <span v-for="airline in passenger.airline" :key="airline.id">
        {{ airline.website }}
      </span>
      )
    </p>
    <p>
      <b>Slogan:</b>
      {{ passenger.airline.slogan }}
      <span v-for="airline in passenger.airline" :key="airline.id">
        {{ airline.slogan }}
      </span>
    </p>
    <p>
      <b>Country:</b>
      {{ passenger.airline.country }}
      <span v-for="airline in passenger.airline" :key="airline.id">
        {{ airline.country }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['passenger']
}
</script>

<style scoped>
img {
  width: 250px;
  height: auto;
}
</style>