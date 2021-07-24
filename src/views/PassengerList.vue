<template>
  <h1>Passenger</h1>
  <div class="passengers">
    <PassengerCard
      v-for="passenger in passengers"
      :key="passenger.id"
      :passenger="passenger"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService.js'
import { watchEffect } from '@vue/runtime-core'
// import axios from 'axios'

export default {
  name: 'PassengerList',
  props: {
    page: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  components: {
    PassengerCard // register it as a child component
  },
  data() {
    return {
      passengers: null,
      totalPassengers: 0 // <--- Added this to store totalEvents
    }
  },
  created() {
    watchEffect(() => {
      PassengerService.getEvents(this.page, this.size)
        .then((response) => {
          this.passengers = response.data.data
          this.totalPassengers = response.headers['x-total-count'] // <--- Store it
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalPassengers / this.size) // 2 is events per page

      //Then check to see if the current page is less than the total pages.
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
