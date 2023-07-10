<template>
  <div id="app-container">
    <AlarmAlert
      :isPlaying="isPlaying"
      :stopAlarm="stopAlarm"
      :alertTime="currentAlarm"
    />
    <div class="header">
      <h1>Realtime Alarm <i class="fas fa-bell"></i></h1>
    </div>

    <Alarm
      v-for="(time, index) in times"
      :time="time"
      :index="index"
      @edit-time="editTime"
      @select-sound="selectSound"
      @delete-alarm="deleteAlarm"
    />
    <SetTime
      :displaySetTime="displaySetTime"
      @add-time="addTime"
      @close-time="closeTime"
      @change-time="changeTime"
    />

    <button class="add-alarm" @click="displaySetTime = true">
      <i class="fas fa-plus-circle"></i>
    </button>
    <audio :src="audioSrc" ref="sound" @timeupdate="autoStopAlarm"></audio>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useTimeValueStore } from './stores/timeValue';
import { useChangeTimeWithIDStore } from '@/stores/changeTimeWithID';
import { useSoundStore } from '@/stores/sounds';

import Alarm from './components/Alarm.vue';
import SetTime from './components/SetTime.vue';
import AlarmAlert from './components/AlarmAlert.vue';
import audioFile from './assets/sounds/Common_Person.mp3';

export default {
  name: 'App',
  created() {
    this.checkTime();
  },
  components: {
    Alarm,
    SetTime,
    AlarmAlert,
  },
  computed: {
    ...mapWritableState(useTimeValueStore, ['hour', 'minute', 'format']),
    ...mapWritableState(useChangeTimeWithIDStore, ['id']),
    ...mapWritableState(useSoundStore, ['sounds']),
  },
  data() {
    return {
      currentAlarm: null,
      isPlaying: false,
      count: 0,
      audioSrc: audioFile,
      displaySetTime: false,
      times: [
        {
          time: '11:35 AM',
          on: true,
          sound: 'Common_Person',
          id: Math.random().toString(16).slice(2),
        },
        {
          time: '12:20 AM',
          on: true,
          sound: 'Common_Person',
          id: Math.random().toString(16).slice(2),
        },
      ],
    };
  },

  methods: {
    addTime(hour, minute, format) {
      this.times.push({
        time: `${hour}:${minute} ${format}`,
        on: true,
        sound: 'Common_Person',
        id: Math.random().toString(16).slice(2),
      });

      this.displaySetTime = false;
    },

    changeTime() {
      this.times.forEach((time) => {
        if (time.id === this.id) {
          time.time = `${this.hour}:${this.minute} ${this.format}`;

          time.on = true;
          this.displaySetTime = false;
          this.id = null;
        }
      });
    },

    closeTime() {
      this.displaySetTime = false;
    },

    editTime(id) {
      this.times.forEach((time) => {
        if (time.id === id) {
          this.id = id;
          const clickedTime = time.time.split(':');

          const hour = clickedTime[0];
          const minute = clickedTime[1].split(' ');

          this.hour = hour;

          this.minute = minute[0];

          this.format = minute[1];

          this.displaySetTime = true;
        }
      });
    },

    checkTime() {
      const currentDate = new Date();

      const formattedTime = currentDate
        .toLocaleString('en-NG', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'Africa/Lagos',
        })
        .toUpperCase();

      let currentTime = formattedTime;

      if (currentTime[0] == 0) {
        const time = currentTime.split(':');
        time[0] = 12;
        currentTime = `${time[0]}:${formattedTime.slice(2)}`;
      } else {
        currentTime = formattedTime;
      }

      this.times.forEach((time) => {
        if (time.on === true && time.time === currentTime) {
          this.audioSrc = `/src/assets/sounds/${time.sound}.mp3`;

          this.isPlaying = true;
          this.currentAlarm = time;

          if (this.isPlaying) {
            this.$refs.sound.play();
          } else {
            this.stopAlarm();
          }
        }
      });

      requestAnimationFrame(this.checkTime);
    },

    selectSound(id, selectedSound) {
      this.times.forEach((time) => {
        if (time.id === id) {
          time.sound = selectedSound;
        }
      });
    },

    autoStopAlarm() {
      if (Math.floor(this.$refs.sound.currentTime) === 60) {
        this.stopAlarm();
      } else if (Math.floor(this.$refs.sound.duration) < 60) {
        if (this.$refs.sound.currentTime === this.$refs.sound.duration) {
          this.count += 1;

          if (this.count === 6) {
            this.stopAlarm();
            this.count = 0;
          }
        }
      }
    },

    stopAlarm() {
      this.currentAlarm.on = false;
      this.isPlaying = false;
      this.$refs.sound.currentTime = this.$refs.sound.duration;
    },
    deleteAlarm(id, index) {
      this.times.forEach((time) => {
        if (time.id === id) {
          this.times.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style></style>
