<template>
  <div v-if="passenger">
    <div id="nav">
      <router-link :to="{ name: 'PassengerDetails', params: { id } }">
        Passenger Details
      </router-link>
      |
      <router-link :to="{ name: 'AirlineDetails', params: { id } }">
        Airline Details
      </router-link>
    </div>
    <router-view :passenger="passenger" />
  </div>
</template>

<script>
import PassengerService from '@/services/PassengerService.js'

export default {
  props: ['id'],
  data() {
    return {
      passenger: null
    }
  },
  created() {
    PassengerService.getEvent(this.id)
      .then((response) => {
        this.passenger = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>