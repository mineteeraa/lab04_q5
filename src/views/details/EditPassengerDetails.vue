<template>
  <div v-if="passenger">
    <p>Edit the passenger details here</p>
    <button @click="edit">Edit Me!</button>
  </div>
</template>

<script>
export default {
  props: ['passenger'],
  inject: ['GStore'],
  methods: {
    edit() {
      this.GStore.flashMessage = 'The update is in progress.'
      setTimeout(() => {
        //After 5 seconds remove it
        this.GStore.flashMessage = ''
      }, 5000)

      this.$router.push({
        name: 'PassengerList',
        params: { id: this.passenger.id }
      })
    }
  }
}
</script>