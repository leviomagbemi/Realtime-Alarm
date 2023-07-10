<template>
  <transition name="fade" v-if="isPlaying">
    <div class="container">
      <div class="alert-container">
        <i class="fas fa-bell fa-pulse"></i>
        <h2>{{ currentTime }}</h2>
      </div>
      <button @click.prevent="stopAlarm">Dismiss</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlarmAlert',
  props: ['isPlaying', 'stopAlarm', 'alertTime'],
  data() {
    return {
      currentTime: null,
    };
  },
  created() {
    this.checkAlarm();
  },
  methods: {
    checkAlarm() {
      const date = new Date();

      const getCurrentDay = date.getDay();

      const currentDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

      if (this.isPlaying) {
        this.currentTime = `${currentDay[getCurrentDay]} ${this.alertTime.time}`;
      }

      requestAnimationFrame(this.checkAlarm);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
  background-color: #2f2f38;
  text-align: center;
  border-radius: 16px;
  position: fixed;
  width: 30%;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}
.alert-container {
  color: #fff;
  margin-bottom: 1rem;
}

button {
  width: 150px;
  height: 50px;
  margin: auto;
}

.fade-enter-active {
  opacity: 0;
}

.fade-leave-active {
  opacity: 0;
}
</style>
