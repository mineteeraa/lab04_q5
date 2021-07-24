<template>
  <router-link
    class="passenger-link"
    :to="{ name: 'PassengerDetails', params: { id: passenger._id } }"
  >
    <div class="passenger-card">
      <h3>{{ passenger.name }}</h3>
      <p>Trips: {{ passenger.trips }}</p>
      <img :src="passenger.airline.logo" />
      <img
        v-for="airline in passenger.airline"
        :key="airline.id"
        :src="airline.logo"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PassengerCard',
  props: {
    passenger: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.passenger-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.passenger-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.passenger-link {
  color: #2c3e50;
  text-decoration: none;
}
img {
  width: 100px;
  height: auto;
}
</style>
