<template>
  <h1>Passenger</h1>
  <div class="passengers">
    <PassengerCard
      v-for="passenger in passengers"
      :key="passenger.id"
      :passenger="passenger"
    />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'PassengerList', query: { page: page - 1, size } }"
        rel="prev"
        v-if="page != 0"
      >
        Prev Page</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'PassengerList', query: { page: page + 1, size } }"
        rel="next"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService.js'

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
  beforeRouteEnter(routeTo, routeFrom, next) {
    PassengerService.getEvents(
      parseInt(routeTo.query.page) || 0,
      parseInt(routeTo.query.size) || 5
    )
      .then((response) => {
        next((comp) => {
          comp.passengers = response.data.data
          comp.totalPassengers = response.headers['x-total-count'] // <--- Store it
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    PassengerService.getEvents(
      parseInt(routeTo.query.page) || 0,
      parseInt(routeTo.query.size) || 5
    )
      .then((response) => {
        this.passengers = response.data.data
        this.totalPassengers = response.headers['x-total-count'] // <--- Store it
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalPassengers / this.size)

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

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>