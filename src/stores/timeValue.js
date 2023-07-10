import { defineStore } from 'pinia';

export const useTimeValueStore = defineStore('timeValue', {
  time: () => ({
    hour: '',
    minute: '',
    format: '',
  }),
});
