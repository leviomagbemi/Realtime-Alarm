import { defineStore } from 'pinia';

export const useSoundStore = defineStore('sounds', {
  state: () => ({
    sounds: [
      'Piano-Elegant Logo',
      "Don't Let Me Be Misunderstood",
      "It's Plenty",
      'Last Last - Breakfast',
      'No one',
      'Common_Person',
    ],
  }),
});
