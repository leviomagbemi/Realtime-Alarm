<template>
  <div class="alarm">
    <div>
      <h1 @click="editTime">{{ time.time }}</h1>
      <span><i :class="status(time.on)" @click="time.on = !time.on"></i> </span>
    </div>

    <div>
      <div>
        <i class="fas fa-bell"></i>
        <select @click.prevent="selectSound()" v-model="selectedSound">
          <option :value="time.sound">{{ time.sound }}</option>
          <option v-for="sound in sounds" :value="sound">
            {{ sound }}
          </option>
        </select>
      </div>

      <span @click="deleteAlarm">
        <i class="fas fa-trash"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useSoundStore } from '@/stores/sounds';

export default {
  name: 'Alarm',
  props: ['time', 'index'],
  emits: ['edit-time', 'select-sound', 'delete-alarm'],
  computed: {
    ...mapWritableState(useSoundStore, ['sounds']),
  },
  data() {
    return {
      selectedSound: 'Common_Person',
    };
  },
  methods: {
    status(bol) {
      return bol ? 'fas fa-toggle-on on' : 'fas fa-toggle-off';
    },
    editTime() {
      this.$emit('edit-time', this.time.id);
    },
    selectSound() {
      this.$emit('select-sound', this.time.id, this.selectedSound);
    },
    deleteAlarm() {
      this.$emit('delete-alarm', this.time.id, this.index);
    },
  },
};
</script>
