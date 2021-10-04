<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="{ id, text, type } in notifications"
      :key="id"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>
