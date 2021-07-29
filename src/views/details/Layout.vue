<template>
  <div v-if="GStore.passenger">
    <div id="nav">
      <router-link :to="{ name: 'PassengerDetails', params: { id } }">
        Passenger Details
      </router-link>
      |
      <router-link :to="{ name: 'AirlineDetails', params: { id } }">
        Airline Details
      </router-link>
      |
      <router-link :to="{ name: 'EditPassengerDetails' }">Edit</router-link>
    </div>
    <router-view :passenger="GStore.passenger" />
  </div>
</template>

<script>
export default {
  inject: ['GStore']
}
</script>