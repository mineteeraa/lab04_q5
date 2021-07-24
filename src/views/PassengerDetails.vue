<template>
  <div v-if="passenger">
    <p><b>Name:</b> {{ passenger.name }}</p>
    <p><b>Trips:</b> {{ passenger.trips }}</p>
    <img :src="passenger.airline.logo" />
    <img
      v-for="airline in passenger.airline"
      :key="airline.id"
      :src="airline.logo"
    />
    <p>
      <b>
        {{ passenger.airline.name }}
        <span v-for="airline in passenger.airline" :key="airline.id">
          {{ airline.name }}
        </span>
      </b>
      Airline of
      <b>
        {{ passenger.airline.country }}
        <span v-for="airline in passenger.airline" :key="airline.id">
          {{ airline.country }}
        </span>
      </b>
    </p>
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
    //fetch event (by id) and set local event data
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

<style scoped>
img {
  width: 200px;
  height: auto;
}
</style>