<template>
  <transition
    name="slide"
    enter-active-class="slide-in"
    leave-active-class="slide-out"
  >
    <div class="set-time" v-show="displaySetTime">
      <h2>Set time</h2>
      <h5>Type in time</h5>
      <div class="inputs">
        <div class="time-input">
          <div>
            <input
              type="number"
              id="hour"
              v-model="hour"
              @input="validateHour"
            />
            <label for="hour">hour</label>
          </div>
          <div>
            <input
              type="number"
              id="minute"
              v-model="minute"
              @input="validateMinute"
            />
            <label for="minute">minute</label>
          </div>
        </div>
        <select v-model="format">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div class="buttons">
        <span>
          <i class="far fa-clock"></i>
        </span>
        <div>
          <button @click.prevent="closeSetTime">cancel</button>
          <button @click.prevent="timeFunc">ok</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useTimeValueStore } from '../stores/timeValue';
import { useChangeTimeWithIDStore } from '@/stores/changeTimeWithID';
export default {
  name: 'SetTime',
  props: ['displaySetTime'],
  computed: {
    ...mapWritableState(useTimeValueStore, ['hour', 'minute', 'format']),
    ...mapWritableState(useChangeTimeWithIDStore, ['id']),
  },
  data() {
    return {
      hourState: false,
    };
  },
  emits: ['add-time', 'close-time', 'change-time'],

  methods: {
    timeFunc() {
      if (this.id === null) {
        this.setTime();
      } else {
        this.changeTime();
      }
    },
    setTime() {
      if (this.inputsValidation()) {
        this.addZeroToMinutes();

        //emit add time to app
        this.$emit('add-time', this.hour, this.minute, this.format);

        //clear inputs
        this.clearInputs();

        return;
      }
      alert('Enter a valid time');
    },

    closeSetTime() {
      this.$emit('close-time');
      this.clearInputs();
      this.id = null;
    },

    changeTime() {
      if (this.inputsValidation()) {
        this.addZeroToMinutes();
        this.$emit('change-time');
        this.clearInputs();
      } else {
        alert('enter a valid time');
      }
    },

    addZeroToMinutes() {
      //check if minute has one value and zero to it
      this.minute =
        this.minute.toString().length === 1 ? '0' + this.minute : this.minute;
    },
    validateHour(event) {
      let value = event.target.value.toString();
      if (value.length > 2) {
        value = value.slice(0, value.length - 1);
      }
      this.hour = value;
    },
    validateMinute(event) {
      let value = event.target.value;
      if (value.length > 2) {
        value = value.slice(0, value.length - 1);
      }
      this.minute = value;
    },
    inputsValidation() {
      return (
        this.hour !== '' &&
        this.minute !== '' &&
        this.format !== '' &&
        this.hour <= 12 &&
        this.minute <= 59
      );
    },
    clearInputs() {
      this.hour = '';
      this.minute = '';
      this.format = '';
    },
  },
};
</script>
