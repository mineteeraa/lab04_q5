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
      |
      <router-link :to="{ name: 'EditPassengerDetails' }">Edit</router-link>
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
        if (response && response.status == 204) {
          this.$router.push({
            name: '404Resource',
            params: { resource: 'passenger' }
          })
        }
      })
      .catch((error) => {
        if (error.response && error.response.status != 204) {
          this.$router.push({ name: 'NetworkError' })
        }
      })
  }
}
</script>