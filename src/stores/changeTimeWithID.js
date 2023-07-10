import { defineStore } from 'pinia';

export const useChangeTimeWithIDStore = defineStore('changeTimeWithId', {
  state: () => ({
    id: null,
  }),
});
